import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrdersThunk } from '../../store/order';
import { searchThunk } from '../../store/search';
import { setSearchOffAction } from '../../store/search';
import { getAllCustomersThunk } from '../../store/customer';

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
  const searchItem = useSelector((state) => state.search.fields);

  useEffect(() => {
    const customerArr = Object.values(customersState);
    if (customerArr.length) setCustomers(customerArr);
  }, [customersState])

  useEffect(() => {
    const orderArr = Object.values(ordersState);
    if (orderArr.length) setOrders(orderArr);
  }, [ordersState])

  useEffect(() => {
    dispatch(getAllOrdersThunk())
    dispatch(getAllCustomersThunk())
  }, [dispatch])  

  useEffect(() => {
    // Add a click event listener to the window
    window.addEventListener('click', handleWindowClick);
    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('click', handleWindowClick);
    };
  }, [dispatch]);

  const handleWindowClick = (e) => {
    // Check if the click event occurred outside the suggestion box
    if (suggestionBoxRef.current && !suggestionBoxRef.current.contains(e.target)) {
      // Close the suggestion box
      setSuggestions([]);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value === "") {
      setSearchTerm(null);
      setSuggestions(null);
      return
    }
    else setSearchTerm(value);


    const filteredCustomers = customers.filter((customer) =>
      customer.name.toLowerCase().includes(value.toLowerCase())
    );

    const filteredOrders = orders.filter((order) =>
      order.name.toLowerCase().includes(value.toLowerCase())
    );

    const combinedSuggestions = [...filteredCustomers, ...filteredOrders];

    setSuggestions(combinedSuggestions);
  };

  const handleSelectItem = async (item) => {
    setSelectedItem(item);
    setSearchTerm('');

    const order = item.order_number ? true : false
    const customer = item.name ? true : false

    await dispatch(searchThunk(item, order ? "order" : customer ? "customer" : "no type specified"));
  };

  const handleClearSelectedItem = async () => {
    const order = selectedItem.name ? true : false
    const customer = selectedItem.name ? true : false
    await dispatch(setSearchOffAction());
    setSelectedItem(null);
  };

  const handleSearch = async () => {
    try {
      // Search logic to find the customer/order
      const foundCustomer = customers.find(
        (customer) => customer.name.toLowerCase() === searchTerm.toLowerCase()
      );
  
      const foundOrder = orders.find(
        (order) => order.order_number.toLowerCase() === searchTerm.toLowerCase()
      );
  
      // Check if either customer or order is found
      if (foundCustomer) {
        await handleSelectItem(foundCustomer);
      } else if (foundOrder) {
        await handleSelectItem(foundOrder);
      } else {
        throw new Error('Customer/Order not found');
      }
    } catch (error) {
      console.error('Error searching:', error.message);
      // Handle the error as needed, e.g., display an error message to the user
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
          {suggestions?.length > 0 && (
            <div ref={suggestionBoxRef} className="suggestion-box">
              <ul>
                {suggestions.map((item) => (
                  <li key={item.id} onClick={() => handleSelectItem(item)}>
                    {
                    item.name ? <div style={{display: "flex", alignContent: "center", alignItems: "center"}}><span style={{marginRight: "0.5em"}} className="material-symbols-outlined">person</span> {item.name}</div> : 
                    item.order_number ? <div style={{display: "flex", alignContent: "center", alignItems: "center"}}><span style={{marginRight: "0.5em"}} className="material-symbols-outlined">order_approve</span> {item.order_number}</div> : ''
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
