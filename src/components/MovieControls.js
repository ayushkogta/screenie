import React, {useContext} from 'react';
import { GlobalContext } from '../context/GlobalState';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTimes, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export const MovieControls = ({ type, movie }) => {
  const {
    removeMovieFromWatchlist,
    addMovieToWatched,
    moveToWatchlist,
    removeFromWatched,
  } = useContext(GlobalContext);


  return (
    <div className="inner-card-controls">
     {type === "watchlist" && (
  <>
    <div className="ctrl-btn-container">
      <button className="ctrl-btn" onClick={() => addMovieToWatched(movie)}>
        <FontAwesomeIcon icon={faEye} />
        <span>Move to Watched</span>
      </button>
    </div>
    <div className="ctrl-btn-container">
      <button className="ctrl-btn" onClick={() => removeMovieFromWatchlist(movie.id)}>
        <FontAwesomeIcon icon={faTimes} />
        <span>Remove from Watchlist</span>
      </button>
    </div>
  </>
)}




{type === "watched" && (
  <>
    <div className="ctrl-btn-container">
      <button className="ctrl-btn" onClick={() => moveToWatchlist(movie)}>
        <FontAwesomeIcon icon={faEyeSlash} />
        <span>Move to Watchlist</span>
      </button>
    </div>
    <div className="ctrl-btn-container">
      <button className="ctrl-btn" onClick={() => removeFromWatched(movie.id)}>
        <FontAwesomeIcon icon={faTimes} />
        <span>Remove from Watched</span>
      </button>
    </div>
  </>
)}

    </div>
  );
};

export default MovieControls;