import React, { useEffect, useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

const HomeRecommendations = () => {
  const { watched, addMovieToWatchlist, watchlist } = useContext(GlobalContext);
  const [recommendations, setRecommendations] = useState([]);
  const [allRecommendations, setAllRecommendations] = useState([]); 
  const apiKey = process.env.REACT_APP_TMDB_API_KEY;


  
  const isMovieInList = (movie, list) => {
    return list.some(m => m.id === movie.id);
  };

  useEffect(() => {
    const fetchRecommendations = async () => {
      const highestRatedMovies = watched.filter(movie => movie.userRating === 5);

      if (highestRatedMovies.length === 0) {
        setRecommendations([]);
        setAllRecommendations([]);
        return;
      }

      const movieId = highestRatedMovies[0].id;

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${apiKey}&language=en-US&page=1`
        );
        const data = await response.json();
        
        
        const availableRecommendations = data.results.filter(movie => 
          !isMovieInList(movie, watchlist) && !isMovieInList(movie, watched)
        );

        setAllRecommendations(availableRecommendations); 
        setRecommendations(availableRecommendations.slice(0, 3)); 
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };

    fetchRecommendations();
  }, [watched]); 

  
  const handleAddToWatchlist = (movie) => {
    addMovieToWatchlist(movie);
    
    
    const newRecommendations = recommendations.filter(m => m.id !== movie.id);
    const remainingRecommendations = allRecommendations.filter(m => 
      !isMovieInList(m, watchlist) && 
      !isMovieInList(m, watched) && 
      !recommendations.some(rec => rec.id === m.id)
    );

    
    if (remainingRecommendations.length > 0) {
      newRecommendations.push(remainingRecommendations[0]);
    }

    setRecommendations(newRecommendations);
  };

  if (watched.length === 0) {
    return (
      <div className="recommendations">
        <h2>Recommendations</h2>
        <p>Watch more movies for this feature to be available!</p>
      </div>
    );
  }

  return (
    <div className="recommendations">
      <h2>Recommendations Based On Your Favorites</h2>
      {recommendations.length > 0 ? (
        <div className="recommendations-grid">
          {recommendations.map((movie) => (
            <div key={movie.id} className="recommendation-item">
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={`${movie.title} Poster`}
                className="recommendation-poster"
              />
              <h3 className="recommendation-title">{movie.title}</h3>
              <button
                className="btn recommendation-btn"
                onClick={() => handleAddToWatchlist(movie)}
                disabled={isMovieInList(movie, watchlist) || isMovieInList(movie, watched)}
              >
                {isMovieInList(movie, watchlist) ? 'In Watchlist' : 
                 isMovieInList(movie, watched) ? 'Already Watched' : 
                 'Add to Watchlist'}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No recommendations available at the moment.</p>
      )}
    </div>
  );
};

export default HomeRecommendations;