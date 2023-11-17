import React, { useState, useEffect, useRef } from 'react';
import './SearchBar.css';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedCustomerThunk, resetSelectedCustomerThunk } from '../../../store/customer';
import { getWarehouseInfoThunk } from '../../../store/warehouse';
import { getAllOrdersThunk } from '../../../store/order';
import { searchThunk } from '../../../store/search';

function SearchBar() {
  const dispatch = useDispatch();
  const suggestionBoxRef = useRef(null);
  const ordersState = useSelector(state => state.order.orders);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);


  useEffect(() => {
    dispatch(getAllOrdersThunk())
  }, [])

  useEffect(() => {
    axios.get('/api/customers')
      .then((response) => {
        setCustomers(response.data.customers);
      })
      .catch((error) => {
        console.error('Error fetching customers:', error);
      });
  
    axios.get('/api/orders')
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
      });
  }, []);
  

  useEffect(() => {
    // Add a click event listener to the window
    window.addEventListener('click', handleWindowClick);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('click', handleWindowClick);
    };
  }, []);

  const handleWindowClick = (e) => {
    // Check if the click event occurred outside the suggestion box
    if (suggestionBoxRef.current && !suggestionBoxRef.current.contains(e.target)) {
      // Close the suggestion box
      setSuggestions([]);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    const filteredCustomers = customers.filter((customer) =>
      customer.name.toLowerCase().includes(value.toLowerCase())
    );

    const filteredOrders = orders.filter((order) =>
      order.order_number.toLowerCase().includes(value.toLowerCase())
    );

    // Concatenate the filtered customers and orders for suggestions
    const combinedSuggestions = [...filteredCustomers, ...filteredOrders];

    setSuggestions(combinedSuggestions);
  };

  const handleSelectCustomer = async (item) => {
    // Set the selected customer and clear the search term
    // setSelectedCustomer(item);
    // setSearchTerm('');

    const order = item.order_number ? true : false
    const customer = item.name ? true : false

    await dispatch(searchThunk(item, order ? "order" : customer ? "customer" : "no type specified"));

    // Dispatch the setSelectedCustomerThunk with the selected customer's ID
    // await dispatch(setSelectedCustomerThunk(customer.id));
    // await dispatch(getWarehouseInfoThunk());
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
            <div ref={suggestionBoxRef} className="suggestion-box">
              <ul>
                {suggestions.map((item) => (
                  <li key={item.id} onClick={() => handleSelectCustomer(item)}>
                    {
                    item.name ? <div style={{display: "flex", alignContent: "center", alignItems: "center"}}><span style={{marginRight: "0.5em"}} class="material-symbols-outlined">person</span> {item.name}</div> : 
                    item.order_number ? <div style={{display: "flex", alignContent: "center", alignItems: "center"}}><span style={{marginRight: "0.5em"}} class="material-symbols-outlined">order_approve</span> {item.order_number}</div> : ''
                    }
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default SearchBar;
