import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import MovieControls from './MovieControls';
import { GlobalContext } from '../context/GlobalState';

const MovieCard = ({ movie, type }) => {
  const { updateMovieRating, addMovieToWatchlist, watchlist, categories, movieCategories, setMovieCategory } = useContext(GlobalContext);

  const handleCategoryChange = (e) => {
    setMovieCategory(movie.id, e.target.value);
  };

  
  const handleRatingClick = (rating) => {
    updateMovieRating(movie.id, rating);
  };

  const formatDate = (dateString) => {
    if (!dateString) {
      return 'Not set';
    }
  
    const date = new Date(dateString);
    
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
  
    return `${day}/${month}/${year}`;
  };
  
  const storedMovie = watchlist.find(o => o.id === movie.id);
  const watchlistDisabled = storedMovie ? true : false;

  return (
    <div className="movie-card-row">
      <div className="movie-poster">
        {movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            alt={`${movie.title} Poster`}
          />
        ) : (
          <div className="filler-poster"></div>
        )}
      </div>

      <div className="movie-info">
        <div className="movie-header">
          <h3 className="movie-title">{movie.title}</h3>
          {type === 'watched' && (
            <div className="movie-rating">
              <span>Your rating: </span>
              {[1, 2, 3, 4, 5].map((star) => (
                <FontAwesomeIcon
                  key={star}
                  icon={star <= (movie.userRating || 0) ? fasStar : farStar}
                  onClick={() => handleRatingClick(star)}
                  style={{ cursor: 'pointer', color: star <= (movie.userRating || 0) ? 'gold' : 'gray' }}
                />
              ))}
            </div>
          )}
        </div>
        <p className="movie-overview">{movie.overview}</p>
        <div className="movie-footer">
          
        {type === 'watched' && (
    <>
      <div className="movie-controls">
        <MovieControls type={type} movie={movie} />
        <select
  value={movieCategories[movie.id] || "Default"}  
  onChange={handleCategoryChange}
  className="category-select ml-2"
>
  {categories.map(category => (
    <option key={category} value={category}>
      {category}
    </option>
  ))}
</select>
      </div>
      <div className="date-watched">
        Date watched: {formatDate(movie.dateWatched)}
      </div>
    </>
  )}
    {type === 'watchlist' && (
    <MovieControls type={type} movie={movie} />
  )}
  {type === 'topChart' && (
    <button
      className="btn"
      disabled={watchlistDisabled}
      onClick={() => addMovieToWatchlist(movie)}
    >
      Add to Watchlist
    </button>
  )}
      
        </div>
      </div>
    </div>
  );
};

export default MovieCard;