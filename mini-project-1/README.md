# Task Management App

A simple and intuitive **Task Management Web Application** built with vanilla JavaScript, HTML, and CSS. This app provides a clean interface for managing your daily tasks with persistent storage and advanced filtering capabilities.

### Live Application URLs

- **Deployment Link**: [https://dailyplanner-tau.vercel.app/](https://dailyplanner-tau.vercel.app/)

## 🚀 Features

### Core Functionality
- **Add Tasks**: Create new tasks with custom categories
- **Task Status Management**: Mark tasks as complete or incomplete with a single click
- **Delete Tasks**: Remove individual tasks or clear all tasks at once
- **Persistent Storage**: All tasks are automatically saved to LocalStorage and persist across browser sessions

### Advanced Features
- **Live Search**: Real-time task filtering with debounced input for optimal performance
- **Category Organization**: Organize tasks by custom categories
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Back to Top Button**: Smooth scrolling navigation with throttled scroll events
- **Smart UI Messages**: Displays "No tasks found" when search yields no results

## 🛠️ Technologies Used

- **HTML5**: Semantic markup structure
- **CSS3**: Modern styling with responsive design
- **Vanilla JavaScript**: Pure JavaScript implementation with no external dependencies
- **LocalStorage API**: Client-side data persistence

## 📋 Usage

### Adding Tasks
1. Enter your task description in the input field
2. Select a category
3. Click "Add Task" or press Enter

### Managing Tasks
- **Complete/Incomplete**: Click the checkbox next to any task
- **Delete Single Task**: Click the delete button (🗑️) next to individual tasks
- **Clear All Tasks**: Use the "Clear All" button to remove all tasks

### Searching Tasks
- Use the search bar to filter tasks in real-time
- Search works across task descriptions and categories
- Debounced input ensures smooth performance

### Data Persistence
- Tasks are automatically saved to `localStorage`
- Data persists across browser sessions and page reloads
- Graceful handling of storage limitations

### Navigation
- **Back to Top**: When scrolling down, use the floating "Back to Top" button for quick navigation

## 🏗️ Project Structure

```
mini-project-1/
│
├── index.html          # Main HTML structure
├── style.css          # CSS styling and responsive design
├── index.js           # JavaScript functionality
└── README.md           # Project documentation
```

## 🔧 Installation & Setup

1. **Clone or Download** the project files
2. **Open `index.html`** in your web browser
3. **Start managing tasks** immediately - no build process required!

---

**Happy Task Managing! 📝✅**