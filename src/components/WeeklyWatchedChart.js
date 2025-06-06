import React, { useContext, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { GlobalContext } from '../context/GlobalState';
import { X } from 'lucide-react';

const WeeklyWatchedChart = ({ onClose }) => {
  const { watched } = useContext(GlobalContext);

  const weeklyData = useMemo(() => {
    const now = new Date();
    const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());
    
    
    const currentWeek = {};
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate() + i);
      currentWeek[date.toISOString().split('T')[0]] = 0;
    }

    
    watched.forEach(movie => {
      const watchedDate = new Date(movie.dateWatched);
      if (watchedDate >= startOfWeek && watchedDate <= now) {
        const dateKey = watchedDate.toISOString().split('T')[0];
        if (dateKey in currentWeek) {
          currentWeek[dateKey]++;
        }
      }
    });

    
    return Object.entries(currentWeek)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [watched]);

  const hasWatchedMovies = weeklyData.some(day => day.count > 0);

  return (
    <div className="weekly-watched-chart-popup">
      <div className="chart-header">
        <h2>Movies Watched This Week</h2>
        <button className="close-button" onClick={onClose}>
          <X size={24} />
        </button>
      </div>
      {hasWatchedMovies ? (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={weeklyData}>
            <XAxis 
              dataKey="date" 
              tickFormatter={(tick) => new Date(tick).toLocaleDateString('en-US', { weekday: 'short' })}
            />
            <YAxis allowDecimals={false} />
            <Tooltip 
              labelFormatter={(label) => new Date(label).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
            />
            <Line type="monotone" dataKey="count" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <p className="no-movies-message">Watch more movies this week for this feature to be available!</p>
      )}
    </div>
  );
};

export default WeeklyWatchedChart;