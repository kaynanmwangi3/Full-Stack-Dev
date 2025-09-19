import { useState, useEffect } from 'react';
import NavBar from './NavBar';
import PostList from './PostList';
import PostContent from './PostContent';
import LoadingSpinner from './LoadingSpinner';
import './HomePage.css';

function HomePage({ user, onUserUpdate }) {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError('');
      const API_BASE_URL =  "https://full-stack-dev-backend.onrender.com";
      const response = await fetch(`${API_BASE_URL}/api/posts`);
      
      if (response.ok) {
        const postsData = await response.json();
        setPosts(postsData);
        if (postsData.length > 0 && !selectedPost) {
          setSelectedPost(postsData[0]);
        }
      } else {
        setError('Failed to load posts. Please try again later.');
      }
    } catch (error) {
      setError('Network error. Please check your connection.');
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">{error}</div>
        <button onClick={fetchPosts}>Retry</button>
      </div>
    );
  }

  const handleUserUpdate = (updatedUser) => {
    onUserUpdate(updatedUser);
    // If the username changed, update the posts if needed
    fetchPosts();
  };

  return (
    <div className="homepage">
      <NavBar user={user}  onUserUpdate={handleUserUpdate}/>
      <div className="main-content">
        <PostContent post={selectedPost} user={user} onPostUpdate={fetchPosts} />
        <PostList 
          posts={posts} 
          selectedPost={selectedPost} 
          onSelectPost={setSelectedPost}
          user={user}
          onPostCreated={fetchPosts}
        />
      </div>
    </div>
  );
}

export default HomePage;