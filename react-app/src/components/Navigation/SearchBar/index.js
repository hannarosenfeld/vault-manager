import React, { useState, useEffect } from 'react';
import './SearchBar.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setSelectedCustomerThunk, resetSelectedCustomerThunk} from '../../../store/customer';
import { getWarehouseInfoThunk } from '../../../store/warehouse';


function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const dispatch = useDispatch();

  console.log("⭐️", selectedCustomer)

  useEffect(() => {
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

    const filteredCustomers = customers.filter((customer) =>
      customer.name.toLowerCase().includes(value.toLowerCase())
    );

    setSuggestions(filteredCustomers);
  };

  const handleSelectCustomer = async (customer) => {
    // Set the selected customer and clear the search term
    setSelectedCustomer(customer);
    setSearchTerm('');

    // Dispatch the setSelectedCustomerThunk with the selected customer's ID
    await dispatch(setSelectedCustomerThunk(customer.id));
    await dispatch(getWarehouseInfoThunk());
  };

  const handleClearSelectedCustomer = async () => {
    await dispatch(resetSelectedCustomerThunk(selectedCustomer.id));
    await dispatch(getWarehouseInfoThunk());
    setSelectedCustomer(null);
  };
  
  const handleSearch = () => {
    console.log('Searching for:', searchTerm);
  };

  return (
    <div className="search-bar">
      {selectedCustomer ? (
        <div className="selected-customer">
          {selectedCustomer.name}
          <button className="clear-button" onClick={handleClearSelectedCustomer}>
            X
          </button>
        </div>
      ) : (
        <>
          <input
            type="text"
            placeholder="Search Customer/Order#..."
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
        </>
      )}
    </div>
  );
}

export default SearchBar;
