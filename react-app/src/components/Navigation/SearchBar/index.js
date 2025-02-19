import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrdersThunk } from '../../../store/order';
import { searchThunk } from '../../../store/search';
import { setSearchOffAction } from '../../../store/search';
import { getAllCustomersThunk } from '../../../store/customer';

import './SearchBar.css';


function SearchBar() {
  const dispatch = useDispatch();
  const suggestionBoxRef = useRef(null);
  const customersState = useSelector((state) => state.customer);
  const ordersState = useSelector((state) => state.order);
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const customerArr = Object.values(customersState);
    if (customerArr.length) setCustomers(customerArr);
  }, [customersState]);

  useEffect(() => {
    const orderArr = Object.values(ordersState);
    if (orderArr.length) setOrders(orderArr);
  }, [ordersState]);

  useEffect(() => {
    dispatch(getAllOrdersThunk());
    dispatch(getAllCustomersThunk());
  }, [dispatch]);

  useEffect(() => {
  }, [suggestions]);

  useEffect(() => {
    // Add a click event listener to the window
    window.addEventListener('click', handleWindowClick);
    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('click', handleWindowClick);
    };
  }, []);

  const handleWindowClick = (e) => {
    if (suggestionBoxRef.current && !suggestionBoxRef.current.contains(e.target)) {
      setSuggestions([]);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value === "") {
      setSuggestions([]);
      return;
    }

    const filteredCustomers = customers.filter((customer) =>
      customer.name.toLowerCase().includes(value.toLowerCase())
    );

    const filteredOrders = orders.filter((order) =>
      order.name.toLowerCase().includes(value.toLowerCase())
    );

    const combinedSuggestions = { 
      "customers" : [...filteredCustomers], 
      "orders": [...filteredOrders]
    };

    setSuggestions(combinedSuggestions);
  };

  const handleSelectItem = async (item, type) => {
    setSelectedItem(item);
    setSearchTerm('');

    await dispatch(searchThunk(item, type));
  };

  const handleClearSelectedItem = async () => {
    await dispatch(setSearchOffAction());
    setSelectedItem(null);
  };

  const handleSearch = async () => {
    try {
      const foundCustomer = customers.find(
        (customer) => customer.name.toLowerCase() === searchTerm.toLowerCase()
      );

      const foundOrder = orders.find(
        (order) => order.order_number.toLowerCase() === searchTerm.toLowerCase()
      );

      if (foundCustomer) {
        await handleSelectItem(foundCustomer);
      } else if (foundOrder) {
        await handleSelectItem(foundOrder);
      } else {
        throw new Error('Customer/Order not found');
      }
    } catch (error) {
      console.error('Error searching:', error.message);
    }
  };

  return (
    <div className="search-bar">
      {selectedItem ? (
        <div className="selected-item" style={{display: "flex", alignContent: "center", alignItems: "center", flexGrow: "2"}}>
          <div style={{width: "100%", padding: "5px"}}>{ selectedItem.name || selectedItem.order_number}</div>
          <button className="clear-button" onClick={handleClearSelectedItem}>
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
          {suggestions?.customers?.length > 0 || suggestions?.orders?.length > 0 ? (
            <div ref={suggestionBoxRef} className="suggestion-box">
              <ul>
                {suggestions.customers.map((item) => (
                  <li key={item.id} onClick={() => handleSelectItem(item, "customer")} style={{display: "flex", alignItems: "center"}}>
                    <span class="material-symbols-outlined">
                    person
                    </span>
                    <span style={{marginLeft: "0.3em"}}>{item.name}</span>
                  </li>
                ))}
              </ul>
              <ul>
                {suggestions.orders.map((item) => (
                  <li key={item.id} onClick={() => handleSelectItem(item, "order")} style={{display: "flex", alignItems: "center"}}>
                    <span class="material-symbols-outlined">
                    list_alt
                    </span>
                    <span style={{marginLeft: "0.3em"}}>{item.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}

export default SearchBar;
