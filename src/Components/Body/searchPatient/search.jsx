import React, { useState } from 'react';

function SearchForm({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
    onSearch(value); 
  };

  return (
        <form >
                <div className="input-group">
      <label>Search by Disease:</label>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Enter disease name"
      />
    </div>
    </form>
  );
}

export default SearchForm;
