import { useState } from 'react';
import './CreatePost.css';

function CreatePost({ user, onPostCreated }) {
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');
  // const [authorId, setAuthorId] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      setError('Title and content are required');
      return;
    }

    try {
      const API_BASE_URL = process.env.REACT_APP_API_URL || "https://full-stack-dev-backend.onrender.com";
      const response = await fetch(`${API_BASE_URL}/api/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          image_url: imageUrl,
          author_id: user.id
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Reset form
        setTitle('');
        setContent('');
        setImageUrl('');
        setError('');
        setIsCreating(false);
        
        // Notify parent to refresh posts
        onPostCreated();
      } else {
        setError(data.message || 'Failed to create post');
      }
    } catch (error) {
      setError('Network error. Please try again.');
      console.error('Error creating post:', error);
    }
  };

  if (!isCreating) {
    return (
      <button 
        className="create-post-btn" 
        onClick={() => setIsCreating(true)}
      >
        + Create New Post
      </button>
    );
  }

  return (
    <div className="create-post-modal">
      <div className="create-post-content">
        <h2>Create New Post</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="imageUrl">Image URL (optional)</label>
            <input
              type="url"
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="6"
              required
            />
          </div>
          <div className="form-actions">
            <button type="submit">Publish</button>
            <button type="button" onClick={() => setIsCreating(false)}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;