import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { searchWarehouse, clearSearch } from "../../store/warehouse";

function Searchbar() {
  const dispatch = useDispatch();
  const currentWarehouse = useSelector((state) => state.warehouse.currentWarehouse);
  const [search, setSearch] = useState("");
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    if (currentWarehouse === null) {
      return;
    }
    if (currentWarehouse.customers) {
      setCustomers(Object.values(currentWarehouse.customers));
    }
    if (currentWarehouse.orders) {
      setOrders(Object.values(currentWarehouse.orders));
    }
  }, [currentWarehouse]);

  useEffect(() => {
    return () => {
      dispatch(clearSearch());
    };
  }, [dispatch]);


  const handleChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value) {
      const customerSuggestions = customers.filter((customer) =>
        customer && customer.toLowerCase().includes(value.toLowerCase())
      ).map((customer) => ({ type: 'customer', name: customer }));
      const orderSuggestions = orders.filter((order) =>
        order && order.toLowerCase().includes(value.toLowerCase())
      ).map((order) => ({ type: 'order', name: order }));
      setSuggestions([...customerSuggestions, ...orderSuggestions]);
      setDropdownVisible(true);
    } else {
      setSuggestions([]);
      setDropdownVisible(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearch(suggestion.name);
    dispatch(searchWarehouse(suggestion.name, suggestion.type));
    setDropdownVisible(false);
  };

  const handleClearSearch = () => {
    setSearch("");
    dispatch(clearSearch());
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Add your search logic here
    console.log("Search:", search);
  };

  return (
    <div className="flex items-center py-2">
      <form className="flex items-center mx-auto w-[95%] lg:w-[70%]" onSubmit={handleSearch}>
        <div className="relative w-full">
          <input
            type="text"
            id="simple-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-3 p-2.5"
            placeholder="Search customer/order..."
            value={search}
            onChange={handleChange}
            required
            autoComplete="off"
          />
          {search && (
            <button
              type="button"
              className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
              onClick={handleClearSearch}
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          )}
          {dropdownVisible && suggestions.length > 0 && (
            <div className="absolute z-10 w-full bg-white divide-y divide-gray-100 rounded-lg shadow-sm mt-1 max-h-60 overflow-y-auto">
              <ul className="py-2 text-sm text-gray-700">
                {suggestions.map((suggestion, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="flex items-center px-4 py-2 hover:bg-gray-100"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      <span className="material-symbols-outlined me-2 text-xs">
                        {suggestion.type === 'customer' ? 'person' : 'orders'}
                      </span>
                      {suggestion.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <button
          type="submit"
          className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
        >
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          <span className="sr-only">Search</span>
        </button>
      </form>
    </div>
  );
}

export default Searchbar;