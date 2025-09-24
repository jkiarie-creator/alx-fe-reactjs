import { useState, useEffect } from 'react';
import githubService from '../services/githubService';
import './Search.css';

function Search() {
  console.log('Search component rendering');
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  const [userData, setUserData] = useState(null);
  const [searchPerformed, setSearchPerformed] = useState(false);

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setUsername(value);
    
    // Clear error when user starts typing
    if (error) {
      setError('');
    }
  };

  // Validate username input
  const validateUsername = (username) => {
    if (!username.trim()) {
      return 'Please enter a GitHub username';
    }
    
    // GitHub username validation: alphanumeric, hyphens, and underscores only
    const usernameRegex = /^[a-zA-Z0-9]([a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/;
    if (!usernameRegex.test(username.trim())) {
      return 'Please enter a valid GitHub username (alphanumeric, hyphens, and underscores only)';
    }
    
    return null;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const trimmedUsername = username.trim();
    const validationError = validateUsername(trimmedUsername);
    
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    setError('');
    setSearchPerformed(true);
    setUserData(null);

    try {
      // Fetch user data using our service
      const userDetails = await githubService.fetchUserData(trimmedUsername);
      
      // Add to search history
      const newSearchHistory = [trimmedUsername, ...searchHistory.filter(item => item !== trimmedUsername)].slice(0, 5);
      setSearchHistory(newSearchHistory);
      
      // Set user data for display
      setUserData(userDetails);
    } catch (err) {
      setError(err.message || 'Failed to fetch user data');
      setUserData(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle search history click
  const handleHistoryClick = (historyUsername) => {
    setUsername(historyUsername);
    setError('');
  };

  // Clear search
  const handleClear = () => {
    setUsername('');
    setError('');
    setUserData(null);
    setSearchPerformed(false);
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-group">
          <div className="search-input-wrapper">
            <input
              type="text"
              value={username}
              onChange={handleInputChange}
              placeholder="Enter GitHub username..."
              className={`search-input ${error ? 'error' : ''}`}
              disabled={isLoading}
              autoComplete="off"
              spellCheck="false"
              autoFocus
              style={{ caretColor: '#0366d6' }}
            />
            {username && (
              <button
                type="button"
                onClick={handleClear}
                className="clear-button"
                disabled={isLoading}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>
          
          <div className="search-button-wrapper">
            <button
              type="submit"
              className={`search-button ${isLoading ? 'loading' : ''}`}
              disabled={isLoading || !username.trim()}
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  Searching...
                </>
              ) : (
                'Search'
              )}
            </button>
          </div>
        </div>

        {error && (
          <div className="error-message" role="alert">
            <span className="error-icon">⚠️</span>
            {error}
          </div>
        )}

        {searchHistory.length > 0 && (
          <div className="search-history">
            <h4>Recent Searches:</h4>
            <div className="history-tags">
              {searchHistory.map((historyUsername, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleHistoryClick(historyUsername)}
                  className="history-tag"
                  disabled={isLoading}
                >
                  {historyUsername}
                </button>
              ))}
            </div>
          </div>
        )}
      </form>

      <div className="search-tips">
        <h4>Search Tips:</h4>
        <ul>
          <li>Enter exact GitHub usernames for best results</li>
          <li>Usernames can contain letters, numbers, hyphens, and underscores</li>
          <li>Try searching for popular users like "octocat" or "torvalds"</li>
        </ul>
      </div>

      {/* User Profile Section */}
      {isLoading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading user data...</p>
        </div>
      ) : error ? (
        <div className="error-state">
          <p>❌ {error}</p>
          {error.includes('not found') && (
            <p>Looks like we can't find the user "{username}"</p>
          )}
        </div>
      ) : userData ? (
        <div className="user-profile">
          <div className="profile-header">
            <img 
              src={userData.avatar_url} 
              alt={`${userData.login}'s avatar`} 
              className="avatar"
            />
            <div className="profile-info">
              <h2>{userData.name || userData.login}</h2>
              {userData.name && <p className="username">@{userData.login}</p>}
              {userData.bio && <p className="bio">{userData.bio}</p>}
              <a 
                href={userData.html_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="github-link"
              >
                View on GitHub
              </a>
            </div>
          </div>
          
          <div className="profile-stats">
            <div className="stat">
              <span className="stat-count">{userData.public_repos || 0}</span>
              <span className="stat-label">Repositories</span>
            </div>
            <div className="stat">
              <span className="stat-count">{userData.followers || 0}</span>
              <span className="stat-label">Followers</span>
            </div>
            <div className="stat">
              <span className="stat-count">{userData.following || 0}</span>
              <span className="stat-label">Following</span>
            </div>
          </div>
          
          {userData.repos && userData.repos.length > 0 && (
            <div className="recent-repos">
              <h3>Recent Repositories</h3>
              <div className="repo-list">
                {userData.repos.map(repo => (
                  <a 
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="repo-card"
                  >
                    <h4>{repo.name}</h4>
                    <p>{repo.description || 'No description'}</p>
                    <div className="repo-meta">
                      <span>⭐ {repo.stargazers_count || 0}</span>
                      <span>🍴 {repo.forks_count || 0}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : searchPerformed ? (
        <div className="no-results">
          <p>No user data to display. Try searching for a GitHub username.</p>
        </div>
      ) : null}
    </div>
  );
}

export default Search;
