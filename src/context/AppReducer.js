// eslint-disable-next-line
export default (state, action) => {
  switch (action.type) {
    case "ADD_MOVIE_TO_WATCHLIST":
      return {
        ...state,
        watchlist: [action.payload, ...state.watchlist],
      };
    case "REMOVE_MOVIE_FROM_WATCHLIST":
      return {
        ...state,
        watchlist: state.watchlist.filter(
          (movie) => movie.id !== action.payload
        ),
      };
    case "ADD_MOVIE_TO_WATCHED":
      return {
        ...state,
        watchlist: state.watchlist.filter(
          (movie) => movie.id !== action.payload.id
        ),
        watched: [action.payload, ...state.watched],
      };
    case "MOVE_TO_WATCHLIST":
      return {
        ...state,
        watched: state.watched.filter(
          (movie) => movie.id !== action.payload.id
        ),
        watchlist: [action.payload, ...state.watchlist],
      };
    case "REMOVE_FROM_WATCHED":
      return {
        ...state,
        watched: state.watched.filter((movie) => movie.id !== action.payload),
      };
    case "ADD_MOVIE_NOTES":
      return {
        ...state,
        watched: state.watched.map((movie) =>
          movie.id === action.payload.id
            ? { ...movie, notes: action.payload.notes }
            : movie
        ),
      };
    case "UPDATE_MOVIE_NOTES":
      return {
        ...state,
        watched: state.watched.map((movie) =>
          movie.id === action.payload.id
            ? { ...movie, notes: action.payload.notes }
            : movie
        ),
      };
    case "UPDATE_MOVIE_RATING":
      return {
        ...state,
        watched: state.watched.map((movie) =>
          movie.id === action.payload.id
            ? { ...movie, userRating: action.payload.rating }
            : movie
        ),
      };

    case "UPDATE_DATE_WATCHED":
  return {
    ...state,
    watched: state.watched.map((movie) =>
      movie.id === action.payload.id
        ? { ...movie, dateWatched: action.payload.date }
        : movie
    ),
  };
  case "ADD_CATEGORY":
    return {
      ...state,
      categories: [...state.categories, action.payload]
    };
  
  case "DELETE_CATEGORY":
    return {
      ...state,
      categories: state.categories.filter(cat => cat !== action.payload),
      movieCategories: Object.fromEntries(
        Object.entries(state.movieCategories).map(([id, cat]) => [
          id,
          cat === action.payload ? "Uncategorized" : cat
        ])
      )
    };
  
  case "SET_MOVIE_CATEGORY":
    return {
      ...state,
      movieCategories: {
        ...state.movieCategories,
        [action.payload.movieId]: action.payload.category
      }
    };
    default:
      return state;
  }
};