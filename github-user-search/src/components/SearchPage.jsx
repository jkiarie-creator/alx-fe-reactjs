import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import Search from './Search';

function SearchPage() {

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link 
          to="/" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
        >
          <FiArrowLeft className="mr-2" />
          Back to Home
        </Link>
      </div>
      
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 bg-gray-50">
          <h2 className="text-xl font-semibold text-gray-900">GitHub User Search</h2>
          <p className="mt-1 text-sm text-gray-500">
            Search for GitHub users by username and filter results with advanced options
          </p>
        </div>
        
        <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
          <Search />
        </div>
      </div>
    </div>
  );
}

export default SearchPage;