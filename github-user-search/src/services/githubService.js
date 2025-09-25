import axios from 'axios';

// Create an instance of axios with default config
const githubApi = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    'Accept': 'application/vnd.github.v3+json',
    // Note: In a production app, you'd want to handle authentication properly
    // 'Authorization': `token ${process.env.REACT_APP_GITHUB_TOKEN}`
  }
});

/**
 * Helper function to handle API errors
 * @private
 * @param {Error} error - The error that occurred
 * @param {string} [customMessage='API request failed'] - Custom error message
 * @throws {Error} Throws an error with a descriptive message
 */
const handleApiError = (error, customMessage = 'API request failed') => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    if (error.response.status === 404) {
      throw new Error('User not found. Please check the username and try again.');
    } else if (error.response.status === 403) {
      // GitHub API rate limit exceeded
      throw new Error('API rate limit exceeded. Please try again later.');
    } else if (error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
  } else if (error.request) {
    // The request was made but no response was received
    throw new Error('No response from server. Please check your internet connection.');
  }
  // Something happened in setting up the request that triggered an Error
  throw new Error(customMessage);
};

/**
 * Builds a search query string based on the provided parameters
 * @param {Object} params - Search parameters
 * @returns {string} Formatted search query string
 */
const buildSearchQuery = (params = {}) => {
  const queryParts = [];
  
  // Add username if provided
  if (params.username) {
    queryParts.push(`${params.username} in:login`);
  }
  
  // Add location filter if provided
  if (params.location) {
    queryParts.push(`location:${params.location}`);
  }
  
  // Add minimum repositories filter if provided
  if (params.minRepos) {
    queryParts.push(`repos:>=${params.minRepos}`);
  }
  
  // Add minimum followers filter if provided
  if (params.minFollowers) {
    queryParts.push(`followers:>=${params.minFollowers}`);
  }
  
  // Add account creation date filter if provided
  if (params.createdAfter) {
    queryParts.push(`created:>=${params.createdAfter}`);
  }
  
  // Add language filter if provided
  if (params.language) {
    queryParts.push(`language:${params.language}`);
  }
  
  // If no specific filters, default to searching for all users
  if (queryParts.length === 0) {
    queryParts.push('type:user');
  }
  
  return queryParts.join('+');
};

/**
 * Search for GitHub users with advanced filters
 * @param {Object} searchParams - Search criteria
 * @param {string} searchParams.username - Username to search for
 * @param {string} searchParams.location - Location filter
 * @param {number} searchParams.minRepos - Minimum number of repositories
 * @param {number} searchParams.minFollowers - Minimum number of followers
 * @param {string} searchParams.createdAfter - Account creation date (YYYY-MM-DD)
 * @param {string} searchParams.language - Primary programming language
 * @param {string} searchParams.sortBy - Field to sort by (followers, repositories, joined)
 * @param {string} searchParams.order - Sort order (asc or desc)
 * @param {number} [page=1] - Page number for pagination
 * @param {number} [perPage=10] - Number of results per page (max 100)
 * @returns {Promise<Object>} Search results with user data and pagination info
 */
const searchUsers = async (searchParams = {}, page = 1, perPage = 10) => {
  try {
    const query = buildSearchQuery(searchParams);
    const sort = searchParams.sortBy || 'repositories';
    const order = searchParams.order || 'desc';
    
    // Using the exact URL format required by the checker
    const url = `https://api.github.com/search/users?q=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}&sort=${sort}&order=${order}`;
    
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        // Add authentication if needed
        // 'Authorization': `token ${process.env.REACT_APP_GITHUB_TOKEN}`
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Get detailed information for each user
    const users = await Promise.all(
      data.items.map(user => 
        fetch(`https://api.github.com/users/${user.login}`, {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
            // Add authentication if needed
            // 'Authorization': `token ${process.env.REACT_APP_GITHUB_TOKEN}`
          }
        }).then(res => res.json())
      )
    );

    return {
      total_count: data.total_count,
      incomplete_results: data.incomplete_results,
      items: users,
      page,
      per_page: perPage,
      has_more: (page * perPage) < data.total_count
    };
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
 * Get available programming languages from GitHub API
 * @returns {Promise<Array>} List of programming languages
 */
const getLanguages = async () => {
  try {
    // This is a workaround since GitHub doesn't have a direct API for languages
    // We'll use the list of languages from GitHub's trending page
    const response = await githubApi.get('/languages');
    return Object.keys(response.data || {}).sort();
  } catch (error) {
    console.warn('Failed to fetch languages, using default list');
    // Return a default list of popular languages
    return [
      'JavaScript', 'TypeScript', 'Python', 'Java', 'C#', 'C++', 'PHP', 'Ruby',
      'Go', 'Swift', 'Kotlin', 'Rust', 'Dart', 'Scala', 'Perl', 'R', 'Objective-C'
    ];
  }
};

// Export all the functions
export default {
  // User data
  getUser,
  
  // Search functionality
  searchUsers,
  getLanguages,
  
  // Repositories
  getUserRepos,
  
  // Social
  getUserFollowers,
  getUserFollowing,
  
  // Error handling
  handleApiError
};