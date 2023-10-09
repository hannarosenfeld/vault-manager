import React, { useState, useEffect } from 'react';
import './SearchBar.css';
import axios from 'axios'; // Import Axios for making API requests

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    // Fetch all customers when the component mounts
    axios.get('/api/customers')
      .then((response) => {
        setCustomers(response.data.customers);
      })
      .catch((error) => {
        console.error('Error fetching customers:', error);
      });
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Filter customers based on the search term
    const filteredCustomers = customers.filter((customer) =>
      customer.name.toLowerCase().includes(value.toLowerCase())
    );

    setSuggestions(filteredCustomers);
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
        <span className="material-symbols-outlined">search</span>
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
