# Outfit Search and Generation MVP - Technical Specification (Updated)

## Summary
This MVP implements an outfit search and generation system using TypeScript, Firebase, Puppeteer for web scraping, and the GPT-4 Vision API for outfit compatibility checking. The system scrapes clothing items from e-commerce sites, stores them in Firebase, generates outfit combinations, checks their compatibility using AI, and stores compatible outfits.

## Types

```typescript
// types.ts

export interface UserSizes {
  bust: string;
  waist: string;
  hips: string;
  topSize?: string;
  bottomSize?: string;
  shoeSize?: string;
  height?: string;
  weight?: string;
}

export interface Event {
  id: number;
  name: string;
  description: string;
  vibe?: string;
}

export interface OutfitItem {
  name: string;
  price: number;
  imageUrl?: string;
  link?: string;
}

export interface Outfit {
  id: string;
  name: string;
  items: OutfitItem[];
  totalPrice: number;
  estimatedDelivery: string;
  store?: string;
}

export interface Store {
  id: string;
  name: string;
  url: string;
}

export interface SearchProgress {
  store: Store;
  progress: number;
  status: 'pending' | 'searching' | 'complete' | 'error';
}

// Additional types for our implementation
export interface ClothingItem extends OutfitItem {
  category: string;
  brand: string;
  color: string;
}

export type OutfitCombination = ClothingItem[];
Implementation
1. Firebase Configuration
typescript
Copy
// firebase.config.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  // Your Firebase config here
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
2. Outfit Combination Generator
typescript
Copy
// OutfitCombinationGenerator.ts
import { collection, query, where, limit, getDocs } from 'firebase/firestore';
import { db, ClothingItem, OutfitCombination } from './types';

export class OutfitCombinationGenerator {
  private async getItemsByCategory(category: string): Promise<ClothingItem[]> {
    const q = query(
      collection(db, 'clothingItems'),
      where('category', '==', category),
      limit(10) // Limit for MVP, adjust as needed
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data() as ClothingItem);
  }

  async generateCombinations(): Promise<OutfitCombination[]> {
    const tops = await this.getItemsByCategory('top');
    const bottoms = await this.getItemsByCategory('bottom');
    const shoes = await this.getItemsByCategory('shoes');

    const combinations: OutfitCombination[] = [];

    for (const top of tops) {
      for (const bottom of bottoms) {
        for (const shoe of shoes) {
          combinations.push([top, bottom, shoe]);
        }
      }
    }

    return combinations.slice(0, 20); // Limit to 20 combinations for MVP
  }
}
3. Visual Compatibility Check using GPT-4 Vision API
typescript
Copy
// OutfitCompatibilityChecker.ts
import axios, { AxiosResponse } from 'axios';
import { OutfitCombination } from './types';

interface VisionAPIResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

export class OutfitCompatibilityChecker {
  private apiKey: string;
  private apiUrl: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.apiUrl = 'https://api.openai.com/v1/chat/completions';
  }

  async checkCompatibility(outfit: OutfitCombination): Promise<boolean> {
    const imageUrls = outfit.map(item => item.imageUrl).filter(url => url !== undefined) as string[];
    const prompt = `Analyze these clothing items and determine if they form a visually appealing and cohesive outfit. Consider color coordination, style consistency, and overall aesthetic. Respond with only 'Compatible' or 'Incompatible'.`;

    try {
      const response: AxiosResponse<VisionAPIResponse> = await axios.post(
        this.apiUrl,
        {
          model: 'gpt-4-vision-preview',
          messages: [
            {
              role: 'user',
              content: [
                { type: 'text', text: prompt },
                ...imageUrls.map(url => ({ type: 'image_url', image_url: url }))
              ]
            }
          ],
          max_tokens: 1
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`
          }
        }
      );

      const result = response.data.choices[0].message.content.trim().toLowerCase();
      return result === 'compatible';
    } catch (error) {
      console.error('Error calling Vision API:', error);
      return false;
    }
  }
}
4. Puppeteer Scraper for fetching items
typescript
Copy
// ClothingItemScraper.ts
import puppeteer from 'puppeteer';
import { db, ClothingItem, Store } from './types';
import { collection, writeBatch, doc } from 'firebase/firestore';

export class ClothingItemScraper {
  private async scrapePage(store: Store, category: string): Promise<ClothingItem[]> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(store.url);

    const items: ClothingItem[] = await page.evaluate(() => {
      // This selector will need to be adjusted based on the actual website structure
      const itemElements = document.querySelectorAll('.product-item');
      return Array.from(itemElements).map(element => ({
        name: (element.querySelector('.product-name') as HTMLElement).textContent || '',
        price: parseFloat((element.querySelector('.product-price') as HTMLElement).textContent || '0'),
        imageUrl: (element.querySelector('img') as HTMLImageElement).src,
        link: (element.querySelector('a') as HTMLAnchorElement).href,
        category: '', // To be filled in later
        brand: (element.querySelector('.brand') as HTMLElement).textContent || '',
        color: (element.querySelector('.color') as HTMLElement).textContent || '',
      }));
    });

    await browser.close();

    return items.map(item => ({ ...item, category }));
  }

  async scrapeAndStore(stores: Store[]): Promise<void> {
    const categories = ['top', 'bottom', 'shoes'];

    for (const store of stores) {
      for (const category of categories) {
        const items = await this.scrapePage(store, category);
        
        // Store items in Firebase
        const batch = writeBatch(db);
        items.forEach(item => {
          const docRef = doc(collection(db, 'clothingItems'));
          batch.set(docRef, { ...item, store: store.name });
        });
        await batch.commit();
      }
    }
  }
}
5. Main Function
typescript
Copy
// main.ts
import dotenv from 'dotenv';
import { OutfitCombinationGenerator } from './OutfitCombinationGenerator';
import { OutfitCompatibilityChecker } from './OutfitCompatibilityChecker';
import { ClothingItemScraper } from './ClothingItemScraper';
import { db, Outfit, Store } from './types';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

dotenv.config();

async function generateAndStoreOutfits(stores: Store[]): Promise<void> {
  // Step 1: Scrape and store clothing items
  const scraper = new ClothingItemScraper();
  await scraper.scrapeAndStore(stores);

  // Step 2: Generate outfit combinations
  const generator = new OutfitCombinationGenerator();
  const combinations = await generator.generateCombinations();

  // Step 3: Check compatibility using Vision API and store valid outfits
  const checker = new OutfitCompatibilityChecker(process.env.OPENAI_API_KEY!);
  
  for (const combination of combinations) {
    const isCompatible = await checker.checkCompatibility(combination);
    
    if (isCompatible) {
      const outfit: Outfit = {
        id: '', // Will be set by Firestore
        name: `Outfit ${new Date().toISOString()}`,
        items: combination,
        totalPrice: combination.reduce((sum, item) => sum + item.price, 0),
        estimatedDelivery: '7-10 business days', // Placeholder
        store: combination[0].store // Assuming all items are from the same store
      };

      // Store compatible outfit in Firebase
      await addDoc(collection(db, 'outfits'), {
        ...outfit,
        created_at: serverTimestamp()
      });
    }
  }

  console.log(`Generated and stored compatible outfits.`);
}

// Example usage
const stores: Store[] = [
  { id: '1', name: 'Example Store', url: 'https://example-store.com' }
];

// Run the main function
generateAndStoreOutfits(stores).catch(console.error);
Setup and Running Instructions
(Same as before)

Next Steps and Optimizations
Implement error handling and logging
Add rate limiting for API calls
Implement caching to reduce redundant API calls
Create a user interface for viewing and managing outfits
Implement user feedback system to improve outfit recommendations
Optimize database queries and indexing for better performance
Add more sophisticated outfit generation rules based on style, occasion, etc.
Implement a job queue system for asynchronous processing of outfit generation and checking
Integrate user sizes and event information into the outfit generation process
Implement a search progress tracker using the SearchProgress interface