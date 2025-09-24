import { Link } from 'react-router-dom';
import { FiGithub, FiSearch, FiUsers, FiStar, FiCode } from 'react-icons/fi';

function HomePage() {
  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          <span className="block">GitHub User</span>
          <span className="block text-blue-600">Search Engine</span>
        </h1>
        
        <p className="mt-6 max-w-lg mx-auto text-xl text-gray-500">
          Search for GitHub users, explore their profiles, repositories, and more with our powerful search tool.
        </p>
        
        <div className="mt-10 flex justify-center">
          <div className="rounded-md shadow">
            <Link
              to="/search"
              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 transition-colors duration-200"
            >
              <FiSearch className="mr-2" />
              Start Searching
            </Link>
          </div>
        </div>
        
        <div className="mt-16 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <div className="pt-6">
            <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
              <div className="-mt-6">
                <div className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg">
                  <FiUsers className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Find Users</h3>
                <p className="mt-2 text-base text-gray-500">
                  Search for any GitHub user by their username and view their profile information.
                </p>
              </div>
            </div>
          </div>
          
          <div className="pt-6">
            <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
              <div className="-mt-6">
                <div className="inline-flex items-center justify-center p-3 bg-green-500 rounded-md shadow-lg">
                  <FiCode className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Explore Repositories</h3>
                <p className="mt-2 text-base text-gray-500">
                  Browse through repositories, view commit history, and explore codebases.
                </p>
              </div>
            </div>
          </div>
          
          <div className="pt-6">
            <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
              <div className="-mt-6">
                <div className="inline-flex items-center justify-center p-3 bg-purple-500 rounded-md shadow-lg">
                  <FiStar className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Save Favorites</h3>
                <p className="mt-2 text-base text-gray-500">
                  Keep track of your favorite users and repositories for quick access later.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;