import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { Link, useNavigate } from 'react-router-dom';

const HomeWatchlistPreview = () => {
  const { watchlist, addMovieToWatched } = useContext(GlobalContext);
  const navigate = useNavigate();

  const recentMovie = watchlist[watchlist.length - 1];

  const handleAddNote = () => {
    if (recentMovie) {
      addMovieToWatched(recentMovie);
      navigate('/notes');
    }
  };

  return (
    <div className="watchlist-preview">
      <h2 className="home-watchlist">Watchlist</h2>
      {recentMovie ? (
        <div className="recent-movie">
          <div className="movie-poster">
            {recentMovie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w200${recentMovie.poster_path}`}
                alt={`${recentMovie.title} Poster`}
              />
            ) : (
              <div className="filler-poster"></div>
            )}
          </div>
          <div className="movie-details">
            <h3 className="movie-title">{recentMovie.title}</h3>
            <div className="options">
              <Link to="/watchlist" className="option-btn">View watchlist</Link>
              <Link to="/add" className="option-btn">Add another movie</Link>
              <button onClick={handleAddNote} className="option-btn">Add a note</button>
            </div>
          </div>
        </div>
      ) : (
        <p>No movies in your watchlist yet!</p>
      )}
    </div>
  );
};

export default HomeWatchlistPreview;