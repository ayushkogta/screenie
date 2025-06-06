import React, { useEffect, useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { Link } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa';

const HomeTopCharts = () => {
  const [topMovies, setTopMovies] = useState([]);
  const { addMovieToWatchlist, watchlist } = useContext(GlobalContext);
  const apiKey = process.env.REACT_APP_TMDB_API_KEY;
  const [sortBy, setSortBy] = useState('current');
  const [showSortMenu, setShowSortMenu] = useState(false);

  useEffect(() => {
    const fetchTopMovies = async () => {
      try {
        let url = `https://api.themoviedb.org/3/`;
        switch (sortBy) {
          case 'current':
            url += 'trending/movie/week?api_key=';
            break;
          case 'yearly':
            url += 'movie/popular?api_key=';
            break;
          case 'alltime':
            url += 'movie/top_rated?api_key=';
            break;
          default:
            url += 'trending/movie/week?api_key=';
        }
        url += apiKey;

        const response = await fetch(url);
        const data = await response.json();
        setTopMovies(data.results.slice(0, 6));
      } catch (error) {
        console.error("Error fetching top movies:", error);
      }
    };

    fetchTopMovies();
  }, [sortBy]);

  const toggleSortMenu = () => {
    setShowSortMenu(!showSortMenu);
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
    setShowSortMenu(false);
  };

  return (
    <div className="top-charts">
      <div className="top-charts-header">
        <h2>Top Charts</h2>
        <div className="sort-dropdown">
          <button className="sort-button" onClick={toggleSortMenu}>
            Sort By: {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)} <FaChevronDown />
          </button>
          {showSortMenu && (
            <ul className="sort-menu">
              <li onClick={() => handleSortChange('current')}>Current</li>
              <li onClick={() => handleSortChange('yearly')}>This Year</li>
              <li onClick={() => handleSortChange('alltime')}>All Time</li>
            </ul>
          )}
        </div>
      </div>
      <div className="top-movies-grid">
        {topMovies.map((movie, index) => {
          const storedMovie = watchlist.find(o => o.id === movie.id);
          const watchlistDisabled = storedMovie ? true : false;

          return (
            <div key={movie.id} className="top-movie-item">
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
                <span className="movie-number">{index + 1}.</span>
                <h3>{movie.title}</h3>
                <button
                  className="btn"
                  disabled={watchlistDisabled}
                  onClick={() => addMovieToWatchlist(movie)}
                >
                  Add to Watchlist
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <Link to="/add" className="view-more-btn">View More</Link>
    </div>
  );
};

export default HomeTopCharts;