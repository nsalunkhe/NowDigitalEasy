import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';


const FavouritePost = () => {
  const [favoritePosts, setFavoritePosts] = useState([]);

  useEffect(() => {
    // Retrieve favorite posts from localStorage
    const storedFavorites = JSON.parse(localStorage.getItem('favoritePosts')) || [];
    setFavoritePosts(storedFavorites);
  }, []);

  const handleRemoveFromFavorites = (postId) => {
    // Remove the post from favorites
    const updatedFavorites = favoritePosts.filter((post) => post.id !== postId);
    setFavoritePosts(updatedFavorites);

    // Update localStorage with the new favorites array
    localStorage.setItem('favoritePosts', JSON.stringify(updatedFavorites));

    // Redirect to the AllPosts page and trigger a refresh
    window.location.href = '/';
  };

  return (
    <div>
      <h2>Favourite Posts</h2>
      {favoritePosts.length === 0 ? (
        <p>No favorite posts yet.</p>
      ) : (
        <div>
          {favoritePosts.map((post) => (
            <div key={post.id} className="favorite-post-container">
              <h3>{post.title}</h3>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleRemoveFromFavorites(post.id)}
                className="remove-from-favorite"
              >
                Remove from Favorites
              </Button>
            </div>
          ))}
        </div>
      )}

      
    </div>
  );
};

export default FavouritePost;
