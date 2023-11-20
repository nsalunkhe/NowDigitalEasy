import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Pagination } from '@mui/material';
import './allPosts.css';

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const postsPerPage = 10;

  // Fetch posts from the API
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=${postsPerPage}`)
      .then((response) => {
        // Extract pagination information from headers
        const totalCount = response.headers.get('X-Total-Count');
        setTotalPages(Math.ceil(totalCount / postsPerPage));

        return response.json();
      })
      .then((data) => setPosts(data));
  }, [currentPage]);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleAddToFavorites = (postId) => {
    // Get favorite posts from localStorage or set an empty array
    const favoritePosts = JSON.parse(localStorage.getItem('favoritePosts')) || [];

    // Check if the post is already in favorites
    const isAlreadyFavorite = favoritePosts.some((favoritePost) => favoritePost.id === postId);

    if (!isAlreadyFavorite) {
      // Find the selected post
      const selectedPost = posts.find((post) => post.id === postId);

      if (selectedPost) {
        // Add the post to the favorites array
        const updatedFavorites = [...favoritePosts, selectedPost];

        // Update localStorage with the new favorites array
        localStorage.setItem('favoritePosts', JSON.stringify(updatedFavorites));
        alert('Post added to favorites!');

        // Refresh the page
        window.location.reload();
      }
    } else {
      alert('This post is already in your favorites.');
    }
  };

  return (
    <div>
      <h2>Posts</h2>
      {posts.map((post) => (
        <div key={post.id} className="post-container">
          <Link to={`/post/${post.id}`} className="post-title">
            {post.title}
          </Link>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleAddToFavorites(post.id)}
            className="add-to-favorite"
          >
            Add to Favorites
          </Button>
        </div>
      ))}
      <div className='pagination'>
        <Pagination count={totalPages} page={currentPage} onChange={handlePageChange}  color="secondary"/>
      </div>
    </div>
  );
};

export default AllPosts;
