# Quote App

A simple React application that displays inspirational quotes with theme switching and font size customization.

## Live Demo

[View Live App](https://quotesageadailyquotegenerator.vercel.app/)

## Features

- Random quotes display
- Dark/Light theme toggle
- Adjustable font sizes (Small, Medium, Large)
- Like/unlike quotes functionality
- Clean and responsive design

## Installation

1. Clone the repository
   ```bash
   git clone https://github.com/Susanta0/career-prep-cap.git
   cd mini-project-2
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm run dev
   ```

4. Open `http://localhost:5173` in your browser

## Dependencies

- React
- Axios

## Important Note

⚠️ **API Limitation**: The ZenQuotes API used in this app has usage limitations and may not work consistently due to rate limiting. You may need to replace it with an alternative quotes API or use mock data for development.

## Usage

- Click "Toggle Theme" to switch between light and dark modes
- Use the font size dropdown to change text size
- Click "New Quote" to fetch a new quote (if API is available)
- Click the heart button to like/unlike quotes
