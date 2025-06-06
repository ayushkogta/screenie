import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { GlobalProvider } from './context/GlobalState';
import Header from './components/Header';
import Watchlist from './components/watchlist';
import Watched from './components/Watched';
import Add from './components/Add';
import Notes from './components/Notes';
import Home from './components/Home'; 
import './App.css';

library.add(fasStar, farStar);

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Header>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/watchlist">Watchlist</Link>
            <Link to="/Watched">Watched</Link>
            <Link to="/Add">Add</Link>
            <Link to="/Notes">Notes</Link>
          </nav>
        </Header>
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/Watched" element={<Watched />} />
          <Route path="/Add" element={<Add />} />
          <Route path="/Notes" element={<Notes />} />
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;