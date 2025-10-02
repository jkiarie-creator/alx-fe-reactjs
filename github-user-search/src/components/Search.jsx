import { useState, useEffect } from 'react';
import { FiSearch, FiMapPin, FiDatabase, FiCalendar, FiUsers, FiGitBranch, FiGithub } from 'react-icons/fi';
import githubService from '../services/githubService';

function Search() {
  // Search state
  const [searchParams, setSearchParams] = useState({
    username: '',
    location: '',
    minRepos: '',
    minFollowers: '',
    createdAfter: '',
    language: '',
    sortBy: 'repositories',
    order: 'desc'
  });
  
  const [languages, setLanguages] = useState([]);
  
  // Function to fetch user data
  const fetchUserData = async (params) => {
    const searchCriteria = {
      username: params.username.trim(),
      location: params.location?.trim(),
      minRepos: params.minRepos,
      minFollowers: params.minFollowers,
      createdAfter: params.createdAfter,
      language: params.language,
      sortBy: params.sortBy,
      order: params.order
    };
    
    try {
      return await githubService.searchUsers(searchCriteria);
    } catch (err) {
      console.error('Error fetching user data:', err);
      throw err; // Re-throw to handle in the calling function
    }
  };

  // Load available languages on component mount
  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const langs = await githubService.getLanguages();
        setLanguages(langs);
      } catch (error) {
        console.error('Failed to load languages:', error);
      }
    };
    
    fetchLanguages();
  }, []);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [userData, setUserData] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);

  // Load search history on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('githubSearchHistory');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save search history when it changes
  useEffect(() => {
    if (searchHistory.length > 0) {
      localStorage.setItem('githubSearchHistory', JSON.stringify(searchHistory));
    }
  }, [searchHistory]);

  // Validate search parameters
  const validateSearch = () => {
    if (!searchParams.username.trim()) {
      return 'Please enter a GitHub username';
    }
    
    // GitHub username validation: alphanumeric, hyphens, and underscores only
    const usernameRegex = /^[a-zA-Z0-9]([a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/;
    if (!usernameRegex.test(searchParams.username.trim())) {
      return 'Please enter a valid GitHub username (alphanumeric, hyphens, and underscores only)';
    }
    
    return null;
  };

  // Toggle advanced search
  const toggleAdvancedSearch = () => {
    setShowAdvanced(!showAdvanced);
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, target } = e;
    const value = target.value;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (error) setError('');
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationError = validateSearch();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    setError('');
    setSearchPerformed(true);
    setUserData(null);

    try {
      // Fetch user data using our new function
      const result = await fetchUserData(searchParams);
      
      // Add to search history
      const newSearchHistory = [
        searchParams.username.trim(), 
        ...searchHistory.filter(item => item !== searchParams.username.trim())
      ].slice(0, 5);
      
      setSearchHistory(newSearchHistory);
      
      // Set user data for display - take the first result
      if (result?.items?.length > 0) {
        setUserData(result.items[0]);
      } else {
        setError('Looks like we cant find the user.');
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch user data. Please check your search criteria and try again.');
      setUserData(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle search history click
  const handleHistoryClick = (historyUsername) => {
    setSearchParams(prev => ({
      ...prev,
      username: historyUsername
    }));
    setError('');
  };

  // Clear search
  const handleClear = () => {
    setSearchParams({
      username: '',
      location: '',
      minRepos: '',
      minFollowers: '',
      createdAfter: '',
      language: '',
      sortBy: 'repositories',
      order: 'desc'
    });
    setError('');
    setUserData(null);
    setSearchPerformed(false);
  };

  return (
    <div className="space-y-6">
      {/* Search Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-grow relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="username"
              value={searchParams.username}
              onChange={handleInputChange}
              placeholder="Enter GitHub username"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              disabled={isLoading}
              aria-label="GitHub username"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
          {searchPerformed && (
            <button
              type="button"
              onClick={handleClear}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Clear
            </button>
          )}
        </div>

        {/* Advanced Search Toggle */}
        <div className="text-right">
          <button
            type="button"
            onClick={toggleAdvancedSearch}
            className="text-sm text-blue-600 hover:text-blue-800 focus:outline-none"
            aria-expanded={showAdvanced}
            aria-controls="advanced-search-fields"
          >
            {showAdvanced ? 'Hide Advanced' : 'Show Advanced'} Search
          </button>
        </div>

        {/* Advanced Search Fields */}
        {showAdvanced && (
          <div id="advanced-search-fields" className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 p-4 bg-gray-50 rounded-md">
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="location"
                  id="location"
                  value={searchParams.location}
                  onChange={handleInputChange}
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="e.g. Nairobi"
                  aria-label="Filter by location"
                />
              </div>
            </div>

            <div>
              <label htmlFor="minRepos" className="block text-sm font-medium text-gray-700">
                Min Repositories
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiDatabase className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  name="minRepos"
                  id="minRepos"
                  value={searchParams.minRepos}
                  onChange={handleInputChange}
                  min="0"
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="0"
                  aria-label="Minimum number of repositories"
                />
              </div>
            </div>

            <div>
              <label htmlFor="minFollowers" className="block text-sm font-medium text-gray-700">
                Min Followers
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUsers className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  name="minFollowers"
                  id="minFollowers"
                  value={searchParams.minFollowers}
                  onChange={handleInputChange}
                  min="0"
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="0"
                  aria-label="Minimum number of followers"
                />
              </div>
            </div>

            <div>
              <label htmlFor="createdAfter" className="block text-sm font-medium text-gray-700">
                Created After
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiCalendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="date"
                  name="createdAfter"
                  id="createdAfter"
                  value={searchParams.createdAfter}
                  onChange={handleInputChange}
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  aria-label="Account created after date"
                />
              </div>
            </div>

            <div>
              <label htmlFor="language" className="block text-sm font-medium text-gray-700">
                Primary Language
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <select
                  name="language"
                  id="language"
                  value={searchParams.language}
                  onChange={handleInputChange}
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md h-9"
                >
                  <option value="">Any language</option>
                  {languages.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700">
                Sort By
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <select
                  name="sortBy"
                  id="sortBy"
                  value={searchParams.sortBy}
                  onChange={handleInputChange}
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md h-9"
                >
                  <option value="repositories">Repositories</option>
                  <option value="followers">Followers</option>
                  <option value="joined">Join Date</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="order" className="block text-sm font-medium text-gray-700">
                Sort Order
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <select
                  name="order"
                  id="order"
                  value={searchParams.order}
                  onChange={handleInputChange}
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md h-9"
                >
                  <option value="desc">Descending</option>
                  <option value="asc">Ascending</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </form>

      {/* Error Message */}
      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">{error}</h3>
            </div>
          </div>
        </div>
      )}

      {/* Search History */}
      {searchHistory.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Recent Searches:</h3>
          <div className="flex flex-wrap gap-2">
            {searchHistory.map((item, index) => (
              <button
                key={index}
                onClick={() => handleHistoryClick(item)}
                className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                aria-label={`Search for ${item}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* User Profile */}
      {isLoading ? (
        <div className="mt-8 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" aria-label="Loading"></div>
        </div>
      ) : userData ? (
        <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 flex items-center space-x-4">
            <img 
              className="h-16 w-16 rounded-full" 
              src={userData.avatar_url} 
              alt={userData.name || userData.login} 
            />
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {userData.name || userData.login}
                {userData.name && <span className="text-gray-500 ml-2">({userData.login})</span>}
              </h3>
              {userData.bio && (
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  {userData.bio}
                </p>
              )}
            </div>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Company</dt>
                <dd className="mt-1 text-sm text-gray-900">{userData.company || 'Not specified'}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Location</dt>
                <dd className="mt-1 text-sm text-gray-900">{userData.location || 'Not specified'}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 text-sm text-gray-900">{userData.email || 'Not specified'}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Blog/Website</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {userData.blog ? (
                    <a href={userData.blog} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {userData.blog}
                    </a>
                  ) : (
                    'Not specified'
                  )}
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Public Repositories</dt>
                <dd className="mt-1 text-sm text-gray-900 flex items-center">
                  <FiGitBranch className="mr-1.5 h-4 w-4 text-gray-400" />
                  {userData.public_repos?.toLocaleString() || '0'}
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Followers</dt>
                <dd className="mt-1 text-sm text-gray-900 flex items-center">
                  <FiUsers className="mr-1.5 h-4 w-4 text-gray-400" />
                  {userData.followers?.toLocaleString() || '0'}
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Following</dt>
                <dd className="mt-1 text-sm text-gray-900 flex items-center">
                  <FiUsers className="mr-1.5 h-4 w-4 text-gray-400" />
                  {userData.following?.toLocaleString() || '0'}
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Account Created</dt>
                <dd className="mt-1 text-sm text-gray-900 flex items-center">
                  <FiCalendar className="mr-1.5 h-4 w-4 text-gray-400" />
                  {userData.created_at ? new Date(userData.created_at).toLocaleDateString() : 'Unknown'}
                </dd>
              </div>
            </dl>
            <div className="mt-6">
              <a
                href={userData.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                <FiGithub className="mr-2 h-4 w-4" />
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      ) : searchPerformed ? (
        <div className="mt-8 text-center">
          <p className="text-gray-500">No user found with that username. Please try another search.</p>
        </div>
      ) : null}
    </div>
  );
}

export default Search;
