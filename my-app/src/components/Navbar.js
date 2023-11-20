import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Badge } from '@mui/material';
import "./Navbar.css"
const Navbar = () => {
  const [favoriteCount, setFavoriteCount] = useState(0);

  useEffect(() => {
    // Retrieve favorite posts from localStorage to get the count
    const storedFavorites = JSON.parse(localStorage.getItem('favoritePosts')) || [];
    setFavoriteCount(storedFavorites.length);
  }, []);

  return (
    <div className="navbar">
      <Link to="/">
        <Button color="primary">Home</Button>
      </Link>
      <Link to="/favourite">
        <Button color="primary">Favourite</Button>
      </Link>
      <Badge badgeContent={favoriteCount} color="secondary">
        <span role="img" aria-label="Love Symbol">
        <Link to="/favourite" style={{textDecoration:"none"}}>
          💙
          </Link>
        </span>
      </Badge>
    </div>
  );
};

export default Navbar;
