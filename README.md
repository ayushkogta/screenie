# SupaScreenie

## Overview

A movie management app that integrates with the TMDB API to fetch movie data, allows users to track watched movies, maintain a watchlist, take notes, categorize movies, and view visual stats through charts.
This branch uses a Supabase (Postgres) database behind authentication, so data can be synced between devices on login.

## API Connection

### Search

Uses the TMDB API with an API key. Implements async functions to fetch and display movie data dynamically.

### Filtering

Filters are fetched from the API to ensure up-to-date filter options. Includes error handling for invalid inputs.

### Top Charts

Fetches top movies based on different criteria using a switch/case statement within `fetchTopMovies()`.

## Authentication

### Login / Signup
Users sign up and log in with an email and password, and there is one-time email confirmation. The app remembers you're logged in when you reload the page.


## Data Storage

### Supabase (Postgres)
Movie data is stored in a Supabase database tied to your account instead of the device it was saved on, so your watchlist, watched movies, notes, ratings and categories follow you across devices as long as you log in. This replaced `localStorage`, which only kept data on the one device.

### Storing and Retrieving Data
When you do something like add a movie or rate it, the change is saved to the database in the background. If a save fails, the Supabase data is displayed as a fallback.

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

- Supabase (Postgres, Auth, auto-generated REST API)
- Row-Level Security
- TMDB API
- JSON Handling


### Running the project

Copy `.env.example` to `.env` and fill in the TMDB and Supabase keys, then run `supabase/schema.sql` in the Supabase SQL editor to create the tables and policies. Enter `npm start` and open [http://localhost:3000](http://localhost:3000) to view it in the browser.
