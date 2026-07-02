import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { GlobalProvider } from './context/GlobalState';
import { AuthProvider, useAuth } from './context/AuthContext';
import Auth from './components/Auth';
import Header from './components/Header';
import Watchlist from './components/watchlist';
import Watched from './components/Watched';
import Add from './components/Add';
import Notes from './components/Notes';
import Home from './components/Home';
import './App.css';

library.add(fasStar, farStar);

function AppContent() {
  const { signOut } = useAuth();

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
            <button onClick={signOut} className="btn">Sign out</button>
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

// Decide to render based on auth state
function Gate() {
  const { session, loading } = useAuth();

  if (loading) return null;
  if (!session) return <Auth />;
  return <AppContent />;
}

function App() {
  return (
    <AuthProvider>
      <Gate />
    </AuthProvider>
  );
}

export default App;