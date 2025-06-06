import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import MovieCard from './MovieCard';
import CategoryManager from "./CategoryManager";
import WeeklyWatchedChart from './WeeklyWatchedChart';
import { BarChart2 } from 'lucide-react';

export const Watched = () => {
  const { watched, categories, movieCategories } = useContext(GlobalContext);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("desc");
  const [showChart, setShowChart] = useState(false);  

  const toggleChart = () => {  
    setShowChart(!showChart);
  };

  const filteredWatched = selectedCategory === "all"
    ? watched
    : watched.filter(movie => 
        (movieCategories[movie.id] || "Uncategorized") === selectedCategory
      );

  const sortedWatched = [...filteredWatched].sort((a, b) => {
    const dateA = new Date(a.dateWatched || 0);
    const dateB = new Date(b.dateWatched || 0);
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  return (
    <div className="movie-page">
      <div className="container">
        <div className="header">
          <h1 className="heading">My Watched</h1>
          <div className="header-controls">
          <button className="chart-button" onClick={toggleChart}>  
              <BarChart2 size={24} />
            </button>

            <div className="sort-container">
              <select 
                onChange={(e) => setSelectedCategory(e.target.value)}
                value={selectedCategory}
                className="mr-2"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <select 
                onChange={(e) => setSortOrder(e.target.value)}
                value={sortOrder}
              >
                <option value="desc">Newest First</option>
                <option value="asc">Oldest First</option>
              </select>
              <span className="count-pill">
                {filteredWatched.length} {filteredWatched.length === 1 ? "Movie" : "Movies"}
              </span>
            </div>
          </div>
        </div>

        {showChart && <WeeklyWatchedChart onClose={toggleChart} />}  

        <CategoryManager />
        {filteredWatched.length > 0 ? (
          <div className="movie-grid">
            {sortedWatched.map((movie) => (
              <MovieCard movie={movie} key={movie.id} type="watched" />
            ))}
          </div>
        ) : (
          <h2 className="no-movies">No movies in your watched!</h2>
        )}
      </div>
    </div>
  );
};

export default Watched;