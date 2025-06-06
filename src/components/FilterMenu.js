import React, { useState, useEffect } from 'react';

const FilterMenu = ({ filters, onFilterChange }) => {
  const [localFilters, setLocalFilters] = useState(filters);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      const apiKey = process.env.REACT_APP_TMDB_API_KEY;
      const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`);
      const data = await response.json();
      setGenres(data.genres);
    };
    fetchGenres();
  }, []);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters(prev => ({ ...prev, [name]: parseInt(value) }));
  };

  const handleGenreChange = (e) => {
    const genreId = parseInt(e.target.value);
    setLocalFilters(prev => ({
      ...prev,
      genres: e.target.checked
        ? [...prev.genres, genreId]
        : prev.genres.filter(id => id !== genreId)
    }));
  };

  const handleApplyFilters = () => {
    onFilterChange({ ...localFilters });
  };

  return (
    <div className="filter-menu">
      <h3>Filters</h3>
      <div>
        <label>
          Release Year Start:
          <input
            type="number"
            name="releaseYearStart"
            value={localFilters.releaseYearStart}
            onChange={handleInputChange}
            min="1900"
            max={new Date().getFullYear()}
          />
        </label>
      </div>
      <div>
        <label>
          Release Year End:
          <input
            type="number"
            name="releaseYearEnd"
            value={localFilters.releaseYearEnd}
            onChange={handleInputChange}
            min="1900"
            max={new Date().getFullYear()}
          />
        </label>
      </div>
      <div>
        <h4>Genres:</h4>
        {genres.map(genre => (
          <label key={genre.id}>
            <input
              type="checkbox"
              value={genre.id}
              checked={localFilters.genres.includes(genre.id)}
              onChange={handleGenreChange}
            />
            {genre.name}
          </label>
        ))}
      </div>
      <button onClick={handleApplyFilters}>Apply Filters</button>
    </div>
  );
};

export default FilterMenu;
