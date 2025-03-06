import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { addFieldsThunk, deleteFieldsThunk, getAllFieldsThunk } from "../../store/field";

export function EditWarehouseModal({ dir, operation, warehouseId, onClose }) {
  const dispatch = useDispatch();
  const warehouse = useSelector((state) => state.warehouse[warehouseId]);
  const [count, setCount] = useState(1);

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("warehouse_id", warehouseId);
    formData.append("direction", dir);
    formData.append("operation", operation);
    formData.append("warehouse_columns", warehouse.columns);
    formData.append("warehouse_rows", warehouse.rows);
    formData.append("count", count);

    if (operation === "add") await dispatch(addFieldsThunk(formData));
    if (operation === "subtract") await dispatch(deleteFieldsThunk(formData));

    // await dispatch(getAllFieldsThunk(warehouseId));

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <form onSubmit={onSubmit}>
          <div className="mb-4 text-center">
            <h2 className="text-xl font-semibold mb-2">
              {operation === "plus" ? "Add" : "Subtract"} Rows
            </h2>
            <p className="text-gray-600">
              {operation === "plus" ? "Add" : "Subtract"}{" "}
              <span className="font-bold">{count}</span> row
              {count === 1 ? "" : "s"} {operation === "add" ? "to" : "from"} warehouse <b>{dir}</b>
            </p>
          </div>
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center border rounded w-32 justify-between">
              <button
                className="px-4 py-2 border-r"
                disabled={count === 1}
                onClick={(e) => {
                  e.preventDefault();
                  setCount(count - 1);
                }}
              >
                -
              </button>
              <span className="text-lg px-4">{count}</span>
              <button
                className="px-4 py-2 border-l"
                onClick={(e) => {
                  e.preventDefault();
                  setCount(count + 1);
                }}
              >
                +
              </button>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditWarehouseModal;