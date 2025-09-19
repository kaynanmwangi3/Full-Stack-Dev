import CreatePost from './CreatePost';
import './PostList.css';

function PostList({ posts, selectedPost, onSelectPost, user, onPostCreated }) {
  return (
    <div className="post-list">
      <h2>Blog Posts</h2>
      <CreatePost user={user} onPostCreated={onPostCreated} />
      <div className="posts-container">
        {posts.map(post => (
          <div 
            key={post.id} 
            className={`post-item ${selectedPost?.id === post.id ? 'selected' : ''}`}
            onClick={() => onSelectPost(post)}
          >
            <h3>{post.title}</h3>
            <p>By {post.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostList;