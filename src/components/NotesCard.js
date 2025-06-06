import React, { useState, useContext, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { GlobalContext } from '../context/GlobalState';
import DOMPurify from 'dompurify';

const NotesCard = ({ movie }) => {
  const [showEditor, setShowEditor] = useState(false);
  const [notes, setNotes] = useState('');
  const [displayNotes, setDisplayNotes] = useState(movie.notes || '');
  const { addMovieNotes, updateMovieNotes } = useContext(GlobalContext);

  useEffect(() => {
    setNotes(movie.notes || '');
  }, [movie.notes]);

  const handleAddNotes = () => {
    setShowEditor(true);
    setNotes(movie.notes || '');
    setDisplayNotes('');
  };

  const handleEditorChange = (value) => {
    setNotes(value);
  };

  const closeEditor = () => {
    setShowEditor(false);
    setDisplayNotes(movie.notes || '');
  };

  const submitNotes = () => {
    if (movie.notes) {
      updateMovieNotes(movie.id, notes);
    } else {
      addMovieNotes(movie.id, notes);
    }
    setShowEditor(false);
    setDisplayNotes(notes);
  };

  const createMarkup = (html) => {
    return { __html: DOMPurify.sanitize(html) };
  };

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
        <h3 className="movie-title">{movie.title}</h3>
        <button className="btn" onClick={handleAddNotes}>
          {movie.notes ? 'Change Notes' : 'Add Notes'}
        </button>
        {!showEditor && displayNotes && (
          <div
            className="movie-notes"
            dangerouslySetInnerHTML={createMarkup(displayNotes)}
          />
        )}
        {showEditor && (
  <div className="notes-editor-fullscreen">
    <div className="notes-editor-overlay"></div>
    <div className="notes-editor">
      
      <div className="button-container">
        <button className="close-button" onClick={closeEditor}>
          Close
        </button>
        <button className="submit-button" onClick={submitNotes}>
          Submit
        </button>
      </div>
      
      <ReactQuill
        value={notes}
        onChange={handleEditorChange}
        modules={{
          toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
            ['clean'],
          ],
        }}
      />
    </div>
  </div>
)}

      </div>
    </div>
  );
};

export default NotesCard;