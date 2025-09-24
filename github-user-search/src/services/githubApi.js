import axios from 'axios';

// Get environment variables
const GITHUB_API_KEY = import.meta.env.VITE_APP_GITHUB_API_KEY;
const GITHUB_API_BASE_URL = import.meta.env.VITE_APP_GITHUB_API_BASE_URL || 'https://api.github.com';

// Create axios instance with base configuration
const githubApi = axios.create({
  baseURL: GITHUB_API_BASE_URL,
  headers: {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'GitHub-User-Search-App',
    // Add authorization header if API key is provided
    ...(GITHUB_API_KEY && { 'Authorization': `token ${GITHUB_API_KEY}` })
  }
});

// Request interceptor for logging (optional)
githubApi.interceptors.request.use(
  (config) => {
    console.log(`Making request to: ${config.baseURL}${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
githubApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    
    // Handle specific GitHub API errors
    if (error.response?.status === 403) {
      console.error('Rate limit exceeded or API key invalid');
    } else if (error.response?.status === 404) {
      console.error('User not found');
    }
    
    return Promise.reject(error);
  }
);

// API service functions
export const githubService = {
  // Search for users
  searchUsers: async (query, page = 1, perPage = 10) => {
    try {
      const response = await githubApi.get('/search/users', {
        params: {
          q: query,
          page,
          per_page: perPage,
          sort: 'followers'
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to search users: ${error.message}`);
    }
  },

  // Get user details
  getUser: async (username) => {
    try {
      const response = await githubApi.get(`/users/${username}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get user: ${error.message}`);
    }
  },

  // Get user repositories
  getUserRepos: async (username, page = 1, perPage = 10) => {
    try {
      const response = await githubApi.get(`/users/${username}/repos`, {
        params: {
          page,
          per_page: perPage,
          sort: 'updated',
          direction: 'desc'
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get user repositories: ${error.message}`);
    }
  },

  // Get user followers
  getUserFollowers: async (username, page = 1, perPage = 10) => {
    try {
      const response = await githubApi.get(`/users/${username}/followers`, {
        params: {
          page,
          per_page: perPage
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get user followers: ${error.message}`);
    }
  },

  // Get user following
  getUserFollowing: async (username, page = 1, perPage = 10) => {
    try {
      const response = await githubApi.get(`/users/${username}/following`, {
        params: {
          page,
          per_page: perPage
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get user following: ${error.message}`);
    }
  }
};

export default githubService;
