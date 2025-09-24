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
  (response) => response,
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

/**
 * Gets all the important info about a GitHub user in one go
 * @param {string} username - The GitHub username to look up (e.g., 'octocat')
 * @returns {Promise<Object>} User's profile with their latest repos and social stats
 */
const fetchUserData = async (username) => {
  try {
    // Get basic user data
    const userResponse = await githubApi.get(`/users/${username}`);
    const userData = userResponse.data;

    // Get user repositories
    const reposResponse = await githubApi.get(`/users/${username}/repos`, {
      params: {
        sort: 'updated',
        per_page: 5, // Limit to 5 most recently updated repos
        direction: 'desc'
      }
    });

    // Combine all the data
    return {
      ...userData,
      repos: reposResponse.data,
      followers_count: userData.followers || 0,
      following_count: userData.following || 0
    };
  } catch (error) {
    handleApiError(error);
  }
};

/**
 * Search for GitHub users by username
 * @param {string} query - What to search for (e.g., 'john')
 * @param {number} [page=1] - Which page of results to show
 * @param {number} [perPage=10] - How many results per page (max 100)
 * @returns {Promise<Object>} List of matching users and total count
 */
const searchUsers = async (query, page = 1, perPage = 10) => {
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
    handleApiError(error, 'Failed to search users');
  }
};

/**
 * Get basic info about a GitHub user
 * @param {string} username - The GitHub username (e.g., 'octocat')
 * @returns {Promise<Object>} User's profile information
 */
const getUser = async (username) => {
  try {
    const response = await githubApi.get(`/users/${username}`);
    return response.data;
  } catch (error) {
    handleApiError(error, 'Failed to get user');
  }
};

/**
 * Get a user's GitHub repositories
 * @param {string} username - The GitHub username
 * @param {number} [page=1] - Which page of repos to show
 * @param {number} [perPage=10] - How many repos to show per page
 * @returns {Promise<Array>} List of repository objects
 */
const getUserRepos = async (username, page = 1, perPage = 10) => {
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
    handleApiError(error, 'Failed to get user repositories');
  }
};

/**
 * Get a list of users who follow someone
 * @param {string} username - The GitHub username to check
 * @param {number} [page=1] - Which page of followers to show
 * @param {number} [perPage=10] - How many followers to show per page
 * @returns {Promise<Array>} List of follower profiles
 */
const getUserFollowers = async (username, page = 1, perPage = 10) => {
  try {
    const response = await githubApi.get(`/users/${username}/followers`, {
      params: { page, per_page: perPage }
    });
    return response.data;
  } catch (error) {
    handleApiError(error, 'Failed to get user followers');
  }
};

/**
 * Get a list of users someone is following
 * @param {string} username - The GitHub username to check
 * @param {number} [page=1] - Which page of followed users to show
 * @param {number} [perPage=10] - How many followed users to show per page
 * @returns {Promise<Array>} List of user profiles being followed
 */
const getUserFollowing = async (username, page = 1, perPage = 10) => {
  try {
    const response = await githubApi.get(`/users/${username}/following`, {
      params: { page, per_page: perPage }
    });
    return response.data;
  } catch (error) {
    handleApiError(error, 'Failed to get user following');
  }
};

/**
 * Helper function to make error messages more helpful
 * @private
 * @param {Error} error - The error that happened
 * @param {string} [customMessage='API request failed'] - What went wrong in simple terms
 */
const handleApiError = (error, customMessage = 'API request failed') => {
  // Handle 404 - User not found
  if (error.response?.status === 404) {
    throw new Error('User not found. Please check the username and try again.');
  }
  
  // Handle rate limiting
  if (error.response?.status === 403) {
    const resetTime = error.response.headers['x-ratelimit-reset'];
    const resetDate = resetTime ? new Date(resetTime * 1000).toLocaleTimeString() : 'later';
    throw new Error(`API rate limit exceeded. Please try again after ${resetDate}`);
  }
  
  // Handle other errors
  const errorMessage = error.response?.data?.message || error.message;
  throw new Error(`${customMessage}: ${errorMessage}`);
};

export default {
  // User data
  fetchUserData,
  getUser,
  
  // Search
  searchUsers,
  
  // Repositories
  getUserRepos,
  
  // Social
  getUserFollowers,
  getUserFollowing
};
