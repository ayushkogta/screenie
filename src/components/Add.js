import React, { useState, useEffect, useCallback } from 'react';
import ResultCard from './ResultCard';
import Pagination from './Pagination';
import FilterMenu from './FilterMenu';
import { FaFilter } from 'react-icons/fa';

export const Add = () => {
  const apiKey = process.env.REACT_APP_TMDB_API_KEY;

  const MAX_PAGES = 500; // Max pages I want to display

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    releaseYearStart: 1900,
    releaseYearEnd: new Date().getFullYear(),
    genres: [],
  });

  const fetchMovies = useCallback(async () => {
    let url = '';

    if (query) {
      url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&language=en-US&page=${currentPage}`;
    } 
    else {
      url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&page=${currentPage}`;

      
      if (filters.genres.length > 0) {
        url += `&with_genres=${filters.genres.join(',')}`;
      }

      
      url += `&primary_release_date.gte=${filters.releaseYearStart}-01-01`;
      url += `&primary_release_date.lte=${filters.releaseYearEnd}-12-31`;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (!data.errors) {
        setResults(data.results);
        setTotalPages(Math.min(data.total_pages, MAX_PAGES)); // Limit total pages to MAX_PAGES
      } else {
        setResults([]);
        setTotalPages(0);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  }, [query, currentPage, filters, apiKey]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  
  useEffect(() => {
    if (query && results.length > 0) {
      let filtered = results;

      // genre filter
      if (filters.genres.length > 0) {
        filtered = filtered.filter(movie =>
          movie.genre_ids.some(genreId => filters.genres.includes(genreId))
        );
      }

      // release year filter
      filtered = filtered.filter(movie => {
        const releaseYear = new Date(movie.release_date).getFullYear();
        return releaseYear >= filters.releaseYearStart && releaseYear <= filters.releaseYearEnd;
      });

      setFilteredResults(filtered);
    } else {
      setFilteredResults(results); 
    }
  }, [results, filters, query]);

  const onChange = event => {
    event.preventDefault();
    setQuery(event.target.value);
    setCurrentPage(1); 
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); 
  };

  return (
    <div className="search-page">
      <div className="container">
        <div className="search-content">
          <div className="input-wrapper">
            <input
              type="text"
              placeholder='Search for a movie...'
              value={query}
              onChange={onChange}
            />
            <button onClick={toggleFilters} className="filter-button">
              <FaFilter />
            </button>
          </div>
          {showFilters && (
            <FilterMenu filters={filters} onFilterChange={handleFilterChange} />
          )}
          {filteredResults.length > 0 && (
            <>
              <ul className="results">
                {filteredResults.map(movie => (
                  <li key={movie.id}>
                    <ResultCard movie={movie} />
                  </li>
                ))}
              </ul>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Add;

