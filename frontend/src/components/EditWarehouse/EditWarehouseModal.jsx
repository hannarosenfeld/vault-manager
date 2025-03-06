import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { addFieldsThunk, deleteFieldsThunk, getAllFieldsThunk } from "../../store/field";

export function EditWarehouseModal({ dir, operation, warehouseId, onClose }) {
  const dispatch = useDispatch();
  const warehouse = useSelector((state) => state.warehouse[warehouseId]);
  const [count, setCount] = useState(1);

  console.log("😆", dir);

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
          <div className="text-lg mb-4">
            {operation === "add" ? "Add" : "Subtract"}{" "}
            <button
              className="btn btn-outline-secondary px-4 py-2 mr-2"
              disabled={count === 1}
              onClick={(e) => {
                e.preventDefault();
                setCount(count - 1);
              }}
            >
              -
            </button>
            <span className="text-lg">{count}</span>
            <button
              className="btn btn-outline-secondary px-4 py-2 ml-2"
              onClick={(e) => {
                e.preventDefault();
                setCount(count + 1);
              }}
            >
              +
            </button>{" "}
            row{count === 1 ? "" : "s"} to warehouse <b>{dir}</b>
          </div>
          <div className="flex items-center justify-center mb-4">
            {/* <button
              className="btn btn-outline-secondary px-4 py-2 mr-2"
              disabled={count === 1}
              onClick={(e) => {
                e.preventDefault();
                setCount(count - 1);
              }}
            >
              -
            </button>
            <span className="text-lg">{count}</span>
            <button
              className="btn btn-outline-secondary px-4 py-2 ml-2"
              onClick={(e) => {
                e.preventDefault();
                setCount(count + 1);
              }}
            >
              +
            </button> */}
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
