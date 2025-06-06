import React, { useEffect, useState } from 'react';
import HomeWatchlist from './HomeWatchlist';
import HomeTopCharts from './HomeTopCharts';
import HomeRecommendations from './HomeRecommendations';

function Home() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => { 
    fetch('/filmquotes.txt')
      .then(response => response.text())
      .then(text => {
        const quotes = text.split('\n').filter(line => line.trim() !== '');
        const randomLine = quotes[Math.floor(Math.random() * quotes.length)];
        const [quoteText, authorText] = randomLine.split('|').map(item => item.trim());
        setQuote(quoteText);
        setAuthor(authorText);
      });
  }, []);

  return (
    <div className="home">
      <div className="home-left">
        <div className="home-recommendations">
          <HomeRecommendations />
        </div>
        <div className="home-watchlist">
          <HomeWatchlist />
        </div>
      </div>
      <div className="home-right">
        <div className="quote-container">
          <p className="quote">{quote || 'Loading...'}</p>
          <p className="author">{author}</p>
        </div>
        <div className="home-top-charts">
          <HomeTopCharts />
        </div>
      </div>
    </div>
  );
}

export default Home;