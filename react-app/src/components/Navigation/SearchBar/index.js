import React, { useState, useEffect } from 'react';
import './SearchBar.css';
import axios from 'axios';
import { useDispatch } from 'react-redux'; // Import useDispatch from react-redux
import { setSelectedCustomerThunk } from '../../../store/customer';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [customers, setCustomers] = useState([]);
  const dispatch = useDispatch(); // Get the dispatch function from Redux

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

  const handleSelectCustomer = (customer) => {
    // Dispatch the setSelectedCustomerThunk with the selected customer's ID
    dispatch(setSelectedCustomerThunk(customer.id));
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
            <li key={customer.id} onClick={() => handleSelectCustomer(customer)}>
              {customer.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
