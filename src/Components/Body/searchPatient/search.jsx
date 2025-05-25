import React, { useState } from 'react';

function SearchForm({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
<form className="search-form" style={{ marginTop: '10px' }}>
  <div className="input-group">
    <input
      id="search"
      type="text"
      value={searchTerm}
      onChange={handleSearchChange}
      placeholder="Search"
    />
  </div>
</form>

  );
}

export default SearchForm;
