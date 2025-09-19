const API_BASE_URL = process.env.REACT_APP_API_URL || "https://full-stack-dev-backend.onrender.com";

export const API_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/api/login`,
  REGISTER: `${API_BASE_URL}/api/register`,
  POSTS: `${API_BASE_URL}/api/posts`,
  USER_POSTS: (userId) => `${API_BASE_URL}/api/users/${userId}/posts`,
  USER: (userId) => `${API_BASE_URL}/api/users/${userId}`,
  USER_BY_NAME: (username) => `${API_BASE_URL}/api/users/name/${username}`,
};

export default API_BASE_URL;