import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import './singlePost.css';

const SinglePost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    // Fetch the details of the single post based on the post ID
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setPost(data);
        // Use the same image for every post
        setImageUrl('https://source.unsplash.com/collection/928423/800x600'); // Adjusted image size
      });
  }, [id]);

  const handleAddToFavorites = () => {
    // Get favorite posts from localStorage or set an empty array
    const favoritePosts = JSON.parse(localStorage.getItem('favoritePosts')) || [];

    // Check if the post is already in favorites
    const isAlreadyFavorite = favoritePosts.some((favoritePost) => favoritePost.id === Number(id));

    if (!isAlreadyFavorite) {
      // Find the selected post
      const selectedPost = post;

      if (selectedPost) {
        // Add the post to the favorites array
        const updatedFavorites = [...favoritePosts, selectedPost];

        // Update localStorage with the new favorites array
        localStorage.setItem('favoritePosts', JSON.stringify(updatedFavorites));
        alert('Added to Favorites!');
        window.location.href="/"
      }
    } else {
      alert('This post is already in your favorites.');
    }
  };

  return (
    <div className="single-post-container">
      {post && (
        <div>
          <img className="post-image" src={imageUrl} alt="Random" />
          <div className="post-content">
            <h3>{post.title}</h3>
            <p>{post.body}</p>
             <div className='but'>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddToFavorites}
            >
              Add to Favorites
            </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SinglePost;
