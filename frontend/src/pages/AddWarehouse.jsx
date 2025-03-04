import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addWarehouseThunk } from "../store/warehouse";

export default function AddWarehouse() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [rows, setRows] = useState("");
  const [columns, setColumns] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const warehouseData = {
      name,
      rows: parseInt(rows, 10),
      columns: parseInt(columns, 10),
    };
    await dispatch(addWarehouseThunk(warehouseData));
    navigate("/"); // Redirect to the home page or warehouse list page after adding
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">Add Warehouse</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rows">
            Number of Rows
          </label>
          <input
            type="number"
            id="rows"
            value={rows}
            onChange={(e) => setRows(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="columns">
            Number of Columns
          </label>
          <input
            type="number"
            id="columns"
            value={columns}
            onChange={(e) => setColumns(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Warehouse
          </button>
        </div>
      </form>
    </div>
  );
}