# screenie

## Overview

A movie management app that integrates with the TMDB API to fetch movie data, allows users to track watched movies, maintain a watchlist, take notes, categorize movies, and view visual stats through charts.
## API Connection

### Search

Uses the TMDB API with an API key. Implements async functions to fetch and display movie data dynamically.

### Filtering

Filters are fetched from the API to ensure up-to-date filter options. Includes error handling for invalid inputs.

### Top Charts

Fetches top movies based on different criteria using a switch/case statement within `fetchTopMovies()`.

## Data Storage

### localStorage

Data is persisted using `localStorage`, so the user’s movie data remains across sessions.

### Storing and Retrieving Data

React's `useEffect` monitors state changes and updates storage accordingly. Uses `useReducer` for consistent state management.

### Movie Features

Movies in the "watched" list can be annotated with notes, a watch date, and ratings. Ratings are interactive via UI.

### Categorising Movies

Custom categories can be added. Input is trimmed to prevent duplication from whitespace.

## Program Interactions

### Watched

Sorted by date using `useContext` and `useState`. Enables ascending/descending order toggling.

### Watchlist

Similar to watched, but without sorting or additional metadata.

### Notes

Notes are added via `react-quill` rich text editor.

### Recommendations

Movies rated 5 stars trigger recommendation logic to suggest similar content.

### Graph

Built with `Recharts`. Uses `useMemo` to avoid redundant calculations. Displays a dynamic weekly movie-watching chart.

## Tech Stack

### Frontend

- React
- React Hooks: `useContext`, `useReducer`, `useEffect`, `useMemo`
- React-Quill
- Recharts
- Conditional Rendering

### Backend / Storage

- localStorage
- TMDB API
- JSON Handling


### Running the project

enter `npm start`, which runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
