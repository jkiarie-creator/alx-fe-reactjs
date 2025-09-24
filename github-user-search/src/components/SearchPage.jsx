import { useEffect } from 'react';
import Search from './Search';
import './SearchPage.css';

function SearchPage() {
  useEffect(() => {
    console.log('SearchPage component mounted');
    return () => {
      console.log('SearchPage component unmounted');
    };
  }, []);

  return (
    <div className="search-page">
      <h2 style={{ color: '#24292e' }}>GitHub User Search</h2>
      <Search />
    </div>
  );
}

export default SearchPage;