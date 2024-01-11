import React, { useState, useEffect } from 'react';

const Forum = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchForumPosts();
  }, []);

  const fetchForumPosts = async () => {
    try {
      const response = await fetch('/api/forum/posts'); // Adjust the URL to match your backend endpoint
      const data = await response.json();
      setPosts(data.posts);
    } catch (error) {
      console.error('Error fetching forum posts:', error);
    }
  };

  return (
    <div>
      <h2>Forum</h2>
      <ul>
        {Array.isArray(posts) && posts.length > 0 ? (
          posts.map((post) => (
            <li key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <p>Author: {post.author}</p>
            </li>
          ))
        ) : (
          <p>No posts available</p>
        )}
      </ul>
    </div>
  );
};

export default Forum;
