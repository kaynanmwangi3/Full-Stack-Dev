import { useState } from 'react';
import './PostContent.css';

function PostContent({ post, user, onPostUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  if (!post) {
    return <div className="post-content">Select a post to view</div>;
  }

  const handleEdit = () => {
    setEditTitle(post.title);
    setEditContent(post.content);
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const API_BASE_URL =  "https://full-stack-dev-backend.onrender.com";
      const response = await fetch(`${API_BASE_URL}/api/posts/${post.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: editTitle,
          content: editContent,
        }),
      });

      if (response.ok) {
        setIsEditing(false);
        onPostUpdate(); // Refresh the posts
      } else {
        console.error('Failed to update post');
      }
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        const API_BASE_URL = "https://full-stack-dev-backend.onrender.com";
        const response = await fetch(`${API_BASE_URL}/api/posts/${post.id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          onPostUpdate(); // Refresh the posts
        } else {
          console.error('Failed to delete post');
        }
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="post-content">
      {isEditing ? (
        <>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="edit-title"
          />
          
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="edit-content"
          />
          <div className="post-actions">
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </>
      ) : (
        <>
          <h1>{post.title}</h1>
          <p className="post-meta">By {post.author} - {formatDate(post.created_at)}</p>
          <div className="post-body">
            <p>{post.content}</p>
            <img src={post.image_url} alt="" />
          </div>
          {user.name === post.author && (
            <div className="post-actions">
              <button onClick={handleEdit}>Edit Post</button>
              <button onClick={handleDelete} className="delete-btn">Delete Post</button>
            </div>
           )} 
        </>
      )}
    </div>
  );
}

export default PostContent;