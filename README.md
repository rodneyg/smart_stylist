# Smart Stylist

Smart Stylist is a web application that helps users find outfits for specific events based on their sizes and preferences. It simulates searching through various online stores to provide outfit recommendations.

## Project Setup

1. Clone the repository:
   ```
   git clone [repository-url]
   cd smart-stylist
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## Git Setup

If you're setting up this project from scratch:

1. Initialize the Git repository:
   ```
   git init
   ```

2. Add all files to the staging area:
   ```
   git add .
   ```

3. Make the initial commit:
   ```
   git commit -m "Initial commit: Set up Smart Stylist project structure"
   ```

## Project Structure

- `src/`: Contains the source code for the application
  - `components/`: React components
  - `types/`: TypeScript type definitions
  - `services/`: Firebase and other service configurations
- `public/`: Public assets and index.html
- `package.json`: Project dependencies and scripts
- `tsconfig.json`: TypeScript configuration
- `tailwind.config.js`: Tailwind CSS configuration

## Features

- User profile creation with size and measurement inputs
- Event selection for outfit recommendations
- Simulated outfit search process
- Display of outfit recommendations with pricing and delivery estimates

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- Firebase (for future backend integration)

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.