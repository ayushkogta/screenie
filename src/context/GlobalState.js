import React, { createContext, useReducer, useEffect } from "react";
import AppReducer from "./AppReducer";


const initialState = {
  watchlist: localStorage.getItem("watchlist")
    ? JSON.parse(localStorage.getItem("watchlist"))
    : [],
  watched: localStorage.getItem("watched")
    ? JSON.parse(localStorage.getItem("watched"))
    : [],
    categories: localStorage.getItem("categories")
    ? JSON.parse(localStorage.getItem("categories"))
    : ["Uncategorized"],
  movieCategories: localStorage.getItem("movieCategories")
    ? JSON.parse(localStorage.getItem("movieCategories"))
    : {},
};


export const GlobalContext = createContext(initialState);


export const GlobalProvider = (props) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(state.watchlist));
    localStorage.setItem("watched", JSON.stringify(state.watched));
    localStorage.setItem("categories", JSON.stringify(state.categories));
    localStorage.setItem("movieCategories", JSON.stringify(state.movieCategories));
  }, [state]);

  const addMovieToWatchlist = (movie) => {
    dispatch({ type: "ADD_MOVIE_TO_WATCHLIST", payload: movie });
  };

  const removeMovieFromWatchlist = (id) => {
    dispatch({ type: "REMOVE_MOVIE_FROM_WATCHLIST", payload: id });
  };

  const addMovieToWatched = (movie) => {
    dispatch({ 
      type: "ADD_MOVIE_TO_WATCHED", 
      payload: { ...movie, dateWatched: new Date().toISOString() } 
    });
  };
  

  const moveToWatchlist = (movie) => {
    dispatch({ type: "MOVE_TO_WATCHLIST", payload: movie });
  };

  const removeFromWatched = (id) => {
    dispatch({ type: "REMOVE_FROM_WATCHED", payload: id });
  };

  const addMovieNotes = (id, notes) => {
    dispatch({ type: "ADD_MOVIE_NOTES", payload: { id, notes } });
  };

  const updateMovieNotes = (id, notes) => {
    dispatch({ type: "UPDATE_MOVIE_NOTES", payload: { id, notes } });
  };

  const updateMovieRating = (id, rating) => {
    dispatch({ type: "UPDATE_MOVIE_RATING", payload: { id, rating } });
  };

  const addCategory = (category) => {
    dispatch({ type: "ADD_CATEGORY", payload: category });
  };
  
  const deleteCategory = (category) => {
    dispatch({ type: "DELETE_CATEGORY", payload: category });
  };
  
  const setMovieCategory = (movieId, category) => {
    dispatch({ type: "SET_MOVIE_CATEGORY", payload: { movieId, category } });
  };
  

  return (
    <GlobalContext.Provider
      value={{
        watchlist: state.watchlist,
        watched: state.watched,
        addMovieToWatchlist,
        removeMovieFromWatchlist,
        addMovieToWatched,
        moveToWatchlist,
        removeFromWatched,
        addMovieNotes,
        updateMovieNotes,
        updateMovieRating,
        categories: state.categories,
  movieCategories: state.movieCategories,
  addCategory,
  deleteCategory,
  setMovieCategory,

      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};