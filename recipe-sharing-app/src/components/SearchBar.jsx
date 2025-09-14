import React from 'react';
import { useRecipeStore } from './recipeStore';

const SearchBar = () => {
  const { searchTerm, setSearchTerm } = useRecipeStore(state => ({
    searchTerm: state.searchTerm,
    setSearchTerm: state.setSearchTerm
  }));

  return (
    <div style={{ marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="Search recipes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: '100%',
          maxWidth: '400px',
          padding: '12px 16px',
          border: '1px solid #ced4da',
          borderRadius: '6px',
          fontSize: '16px',
          outline: 'none',
          transition: 'border-color 0.2s ease'
        }}
      />
      {searchTerm && (
        <button
          onClick={() => setSearchTerm('')}
          style={{
            marginLeft: '10px',
            padding: '8px 12px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          Clear
        </button>
      )}
    </div>
  );
};

export default SearchBar;