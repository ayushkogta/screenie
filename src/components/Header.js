import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
   <header>
    <div className='container'>
        <div className='inner-content'>
            <div className='brand'>
                <Link to="/">Screenie</Link>
            </div>

    <div className='Search'>
            <Link to="/add" className='btn'>
                Search
            </Link>
    </div>


            <ul className="nav-links">
                <li>
                    <Link to="/watchlist">Watch List</Link>
                </li>

                <li>
                    <Link to="/Watched">Watched</Link>
                </li>

                <li>
                    <Link to="/Notes">Notes</Link>
                </li>

            </ul>
        </div>
    </div>
   </header>
  )
}

export default Header
