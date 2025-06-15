# 📝 Notes App

A modern, full-featured notes management application built with React.js that allows users to create, organize, search, and manage their notes with an intuitive interface.

## 🌐 Live Demo

🔗 **[View Live App](https://notesapp-flax-pi.vercel.app/)**
> Experience the full functionality of the Notes App with the live demonstration.

## ✨ Features

### 🔐 Authentication
- Secure user authentication with JWT tokens
- Protected routes and API calls
- User logout functionality

### 📋 Note Management
- **Create Notes**: Add new notes with title, description, categories, and images
- **Edit Notes**: Modify existing notes with inline editing
- **Delete Notes**: Remove notes with confirmation dialog
- **Image Upload**: Attach images to notes with drag-and-drop support
- **Categories**: Organize notes with custom categories (comma-separated)

### 🔍 Advanced Search & Filtering
- **Real-time Search**: Search notes by title with instant results
- **Category Filtering**: Filter notes by one or multiple categories
- **Combined Filtering**: Use search and category filters simultaneously
- **Smart Counters**: Display filtered results count
- **Clear Filters**: Reset all filters with one click

### 🎨 Modern UI/UX
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Card-based Layout**: Clean, organized note display
- **Interactive Elements**: Hover effects and smooth transitions
- **Visual Feedback**: Loading states and empty state messages
- **Accessible Design**: Proper contrast and keyboard navigation

## 🛠️ Tech Stack

### Frontend
- **React.js** - Component-based UI library
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **Lucide React** - Modern icon library
- **Tailwind CSS** - Utility-first CSS framework

### Backend (API)
- RESTful API with JWT authentication
- File upload support for images
- CRUD operations for notes



## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Backend API server running

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd notes-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   VITE_API_URL=http://localhost:5000/api/
   ```

4. **Start the development server**
   ```bash
   npm run start
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🔧 Configuration

### Environment Variables
- `VITE_API_URL` - Backend API base URL

### API Endpoints
The app expects the following API endpoints:

**Authentication:**
- `POST /auth/signup` - User registration
- `POST /auth/signin` - User login

**Notes:**
- `GET /notes` - Fetch all user notes
- `POST /notes` - Create a new note
- `PUT /notes/:id` - Update an existing note
- `DELETE /notes/:id` - Delete a note

### Authentication
All API requests include JWT token in headers:
```javascript
Authorization: Bearer <token>
```

## 💡 Usage

### Creating Notes
1. Click the "New Note" button
2. Fill in the title and description (required)
3. Add categories separated by commas (optional)
4. Upload an image (optional)
5. Click "Create Note"

### Searching & Filtering
1. **Search**: Type in the search box to find notes by title
2. **Category Filter**: Click "Categories" button to show filter options
3. **Apply Filters**: Click on category tags to filter notes
4. **Clear**: Use "Clear" button to reset all filters

### Managing Notes
- **Edit**: Click the edit icon on any note card
- **Delete**: Click the trash icon and confirm deletion
- **View**: All note details are displayed on the card

## 🎨 Customization

### Styling
The app uses Tailwind CSS for styling. You can customize:
- Colors in `tailwind.config.js`
- Component styles in respective files
- Global styles in CSS files

### Features
Easy to extend with additional features:
- Note sharing
- Rich text editing
- Note templates
- Advanced search filters
- Export functionality

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop**: Full feature set with optimal layout
- **Tablet**: Adapted grid layout and touch-friendly controls
- **Mobile**: Single-column layout with mobile-optimized interactions

## 🔒 Security Features

- JWT token-based authentication
- Protected API routes
- Input validation and sanitization
- Secure file upload handling
- XSS protection


## 👥 Authors

- **Susanta Samanta** - *Initial work* - [YourGitHub](https://github.com/Susanta0)

## 🙏 Acknowledgments

- React.js community for excellent documentation
- Tailwind CSS for the utility-first approach
- Lucide React for beautiful icons
- All contributors who helped improve this project


**Happy Note Taking! 📝✨**