import React, { useState, useEffect } from 'react';
import './SearchBar.css';
import axios from 'axios'; // Import Axios for making API requests

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Make an API request to fetch customer suggestions
    axios.get(`/api/customers/search?query=${value}`)
      .then((response) => {
        setSuggestions(response.data);
      })
      .catch((error) => {
        console.error('Error fetching customer suggestions:', error);
      });
  };

  const handleSearch = () => {
    // Implement your search logic here using searchTerm
    console.log('Searching for:', searchTerm);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search for customers..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}>
      <span class="material-symbols-outlined">
        search
      </span>
      </button>
      {suggestions.length > 0 && (
        <ul className="suggestion-box">
          {suggestions.map((customer) => (
            <li key={customer.id}>{customer.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
