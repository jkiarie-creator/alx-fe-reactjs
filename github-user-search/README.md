# GitHub User Search

A React application for searching GitHub users and viewing their profiles, repositories, and activity.

## Features

- Search for GitHub users
- View user profiles and details
- Browse user repositories
- View followers and following lists
- Responsive design with modern UI

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Environment Setup

1. Copy the environment template:
   ```bash
   copy env.template .env
   ```

2. Edit the `.env` file and add your GitHub API credentials:
   ```env
   VITE_APP_GITHUB_API_KEY=your_github_personal_access_token_here
   VITE_APP_GITHUB_API_BASE_URL=https://api.github.com
   ```

3. **Getting a GitHub API Key (Optional but Recommended):**
   - Go to [GitHub Settings > Personal Access Tokens](https://github.com/settings/tokens)
   - Click "Generate new token (classic)"
   - Select scopes: `public_repo` (for public repositories)
   - Copy the generated token and paste it in your `.env` file

   **Note:** You can use the GitHub API without authentication, but you'll have lower rate limits (60 requests per hour vs 5000 with authentication).

### Running the Application

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## API Service

The application uses a centralized API service (`src/services/githubApi.js`) that handles all GitHub API interactions. The service automatically uses environment variables for configuration and includes:

- User search functionality
- User profile retrieval
- Repository listing
- Followers/Following lists
- Error handling and rate limit management

## Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `VITE_APP_GITHUB_API_KEY` | GitHub Personal Access Token | No | - |
| `VITE_APP_GITHUB_API_BASE_URL` | GitHub API Base URL | No | `https://api.github.com` |

## Technologies Used

- React 19
- Vite
- React Router DOM
- Axios
- CSS3

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request
