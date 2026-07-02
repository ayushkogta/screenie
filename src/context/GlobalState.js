import React, { createContext, useReducer, useEffect, useState } from "react";
import AppReducer from "./AppReducer";
import { useAuth } from "./AuthContext";
import * as db from "../services/db";

const initialState = {
  watchlist: [],
  watched: [],
  categories: ["Uncategorized"],
  movieCategories: {},
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = (props) => {
  const { user } = useAuth();
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const [loading, setLoading] = useState(true);

  // load this user's data when they log in
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        setLoading(true);
        const data = await db.loadState(user.id);
        if (active) dispatch({ type: "HYDRATE", payload: data });
      } catch (e) {
        console.error("Failed to load your data:", e.message);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [user.id]);

  // re-sync from the server (if there's a failed write)
  const reload = async () => {
    try {
      const data = await db.loadState(user.id);
      dispatch({ type: "HYDRATE", payload: data });
    } catch (e) {
      console.error("Reload failed:", e.message);
    }
  };

  // Run a DB write; on failure, use reload as described above
  const persist = async (fn) => {
    try {
      await fn();
    } catch (e) {
      console.error("Save failed:", e.message);
      reload();
    }
  };

  const addMovieToWatchlist = (movie) => {
    dispatch({ type: "ADD_MOVIE_TO_WATCHLIST", payload: movie });
    persist(() => db.addToWatchlist(user.id, movie));
  };

  const removeMovieFromWatchlist = (id) => {
    dispatch({ type: "REMOVE_MOVIE_FROM_WATCHLIST", payload: id });
    persist(() => db.removeMovie(user.id, id));
  };

  const addMovieToWatched = (movie) => {
    const withDate = { ...movie, dateWatched: new Date().toISOString() };
    dispatch({ type: "ADD_MOVIE_TO_WATCHED", payload: withDate });
    persist(() => db.addToWatched(user.id, withDate));
  };

  const moveToWatchlist = (movie) => {
    dispatch({ type: "MOVE_TO_WATCHLIST", payload: movie });
    persist(() => db.moveToWatchlist(user.id, movie.id));
  };

  const removeFromWatched = (id) => {
    dispatch({ type: "REMOVE_FROM_WATCHED", payload: id });
    persist(() => db.removeMovie(user.id, id));
  };

  const addMovieNotes = (id, notes) => {
    dispatch({ type: "ADD_MOVIE_NOTES", payload: { id, notes } });
    persist(() => db.setNotes(user.id, id, notes));
  };

  const updateMovieNotes = (id, notes) => {
    dispatch({ type: "UPDATE_MOVIE_NOTES", payload: { id, notes } });
    persist(() => db.setNotes(user.id, id, notes));
  };

  const updateMovieRating = (id, rating) => {
    dispatch({ type: "UPDATE_MOVIE_RATING", payload: { id, rating } });
    persist(() => db.setRating(user.id, id, rating));
  };

  const addCategory = (category) => {
    dispatch({ type: "ADD_CATEGORY", payload: category });
    persist(() => db.addCategory(user.id, category));
  };

  const deleteCategory = (category) => {
    dispatch({ type: "DELETE_CATEGORY", payload: category });
    persist(() => db.deleteCategory(user.id, category));
  };

  const setMovieCategory = (movieId, category) => {
    dispatch({ type: "SET_MOVIE_CATEGORY", payload: { movieId, category } });
    persist(() => db.setMovieCategory(user.id, movieId, category));
  };

  if (loading) {
    return (
      <div style={{ padding: 40, textAlign: "center", color: "#555" }}>
        Loading your movies…
      </div>
    );
  }

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