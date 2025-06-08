# Movie Search App with Redux & Tailwind CSS

A modern, responsive movie search application built with React, Redux Toolkit, and Tailwind CSS. Search for movies, view detailed information, and manage your favorite movies collection.

## 🚀 Live Demo

**[View Live Application](https://your-app-name.netlify.app)**


## Project Setup

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mini-project-3
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install required packages**
   ```bash
   npm install @reduxjs/toolkit react-redux axios
   ```

4. **Install Tailwind CSS**
   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

5. **Configure Tailwind CSS**
   
   Update `tailwind.config.js`:
   ```js
   module.exports = {
     content: [
       "./src/**/*.{js,jsx,ts,tsx}",
     ],
     theme: {
       extend: {},
     },
     plugins: [],
   }
   ```

   Add Tailwind directives to your `src/index.css`:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

6. **API Setup**
   - Get your free API key from [OMDB API](http://www.omdbapi.com/apikey.aspx)
   - Replace the API key in `src/features/moviesSlice.js`

## Build Commands

### Development
```bash
# Start development server
npm run dev

# Runs the app in development mode
# Open http://localhost:5173 to view in browser
```

### Production
```bash
# Create production build
npm run build

# Builds the app for production to the build folder
# Optimizes the build for best performance
```


### Deployment

**Deploy to Vercel:**
```bash
# Install Vercel CLI (if not already installed)
npm install -g vercel

# Deploy to Vercel
vercel --prod
```

## Project Functionalities

### Core Features

**🔍 Movie Search**
- Real-time movie search with debounced input (700ms delay)
- Search results fetched from OMDB API
- Pagination support with "Load More" functionality
- Error handling for API failures

**📱 Movie Details Modal**
- Click any movie card to view detailed information
- Displays comprehensive movie data including plot, genre, rating
- Modal overlay with responsive design
- Close functionality with backdrop click or close button

**❤️ Favorites Management**
- Add/remove movies from favorites collection
- Heart icon toggle for favorite status
- Dedicated favorites page to view saved movies
- Persistent favorites state using Redux

**🎨 User Interface**
- Modern, clean design with Tailwind CSS
- Responsive grid layout for all screen sizes
- Smooth hover effects and transitions
- Card-based movie display with poster images
- Loading states and error messaging

### Technical Implementation

**⚡ State Management**
- Redux Toolkit for efficient state management
- Separate slices for movies and favorites
- Async thunks for API calls with proper error handling
- Immutable state updates with Immer

**🎯 Performance Optimizations**
- Debounced search to prevent excessive API calls
- Efficient re-renders with React-Redux selectors
- Responsive images with fallback placeholders
- Optimized bundle size with tree shaking

**📱 Responsive Design**
- Mobile-first approach with Tailwind CSS
- Breakpoints: Mobile (< 640px), Tablet (640px-1024px), Desktop (> 1024px)
- Flexible grid layouts that adapt to screen size
- Touch-friendly interface for mobile devices

### Project Structure
```
src/
├── components/
│   ├── Favorites.js          # Favorites page component
│   ├── MovieDetails.js       # Movie details modal
│   ├── MoviesList.js         # Movie grid and pagination
│   └── SearchBar.js          # Search input with debounce
├── features/
│   ├── moviesSlice.js        # Movies state management
│   └── favoritesSlice.js     # Favorites state management
├── hook/
│   └── useDebounce.js        # Custom debounce hook
└── store.js                  # Redux store configuration
```

## Tech Stack
- **React** - Frontend framework
- **Redux Toolkit** - State management
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests
- **OMDB API** - Movie database API