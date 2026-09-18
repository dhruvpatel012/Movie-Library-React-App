# Cinevia — Movie Library

Cinevia is a responsive movie library web application built with React. It allows users to explore movies, search for titles, view detailed movie information, and manage their Favorites and Watchlist.

## Live Demo

🔗 [Cinevia](YOUR_VERCEL_URL)

## Features

- Browse movies from local JSON data
- Search movies with debounce
- View movie details, ratings, genres, languages and cast
- Add and remove Favorites
- Add and remove Watchlist
- User Signup and Login
- Form validation using React Hook Form
- Protected Library route
- Logout functionality
- Data persistence using localStorage
- Responsive design for desktop, tablet and mobile
- Loading, error and empty states

## Tech Stack

- React
- Vite
- Tailwind CSS
- Redux
- Redux Thunk
- React Router DOM
- React Hook Form
- Lucide React
- JavaScript
- JSON
- localStorage

## Project Structure

```text
src/
├── components/   # Reusable UI components
├── data/         # Local movie JSON data
├── pages/        # Application pages
├── redux/        # Store, actions and reducers
├── services/     # Movie data service
├── App.jsx       # Application routes
└── main.jsx      # Application entry point