import React, { useState, useEffect } from 'react';

function SearchForm({ onSearch, searchKey }) {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setSearchTerm('');
  }, [searchKey]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <form
      className="search-form"
      style={{
        marginTop: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '8px',
        maxWidth: '600px',
        marginInline: 'auto',
      }}
    >
      <input
        id="search"
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search patients..."
        style={{
          flex: 1,
          padding: '0.5rem 1rem',
          fontSize: '1rem',
          border: '1px solid #ccc',
          borderRadius: '4px',
        }}
      />
      <button
        type="button"
        onClick={handleClear}
        disabled={!searchTerm}
        style={{
          padding: '0.5rem 1rem',
          fontSize: '1rem',
          backgroundColor: '#dc3545',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: searchTerm ? 'pointer' : 'not-allowed',
          opacity: searchTerm ? 1 : 0.6,
        }}
      >
        Clear
      </button>
    </form>
  );
}

export default SearchForm;
