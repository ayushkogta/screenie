import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import NotesCard from './NotesCard';

export const Watched = () => {
  const { watched } = useContext(GlobalContext);

  return (
    <div className="movie-page">
      <div className="container">
        <div className="header">
          <h1 className="heading">Notes</h1>
          <span className="count-pill">
            {watched.length} {watched.length === 1 ? "Movie" : "Movies"}
          </span>
        </div>
        {watched.length > 0 ? (
          <div className="movie-grid">
            {watched.map((movie) => (
              <NotesCard movie={movie} key={movie.id} />
            ))}
          </div>
        ) : (
          <h2 className="no-movies">You haven't watched any movies! Add some to create notes.</h2>
        )}
      </div>
    </div>
  );
};

export default Watched;