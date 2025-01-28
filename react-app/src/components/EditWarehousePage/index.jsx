import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllFieldsThunk } from "../../store/field";
import { deleteWarehouseThunk } from "../../store/warehouse";
import { EditWarehouseModal } from "./editWarehouseModal";
import OpenModalButton from "../OpenModalButton";
import fieldGenerator from "./fieldGenerator";
import { sortFields } from "../utility";
import DeleteWarehouseModal from "./DeleteWarehouseModal";

export default function EditWarehousePage() {
  const dispatch = useDispatch();
  const { warehouseId } = useParams();
  const navigate = useNavigate();
  const warehouse = useSelector((state) => state.warehouse[warehouseId]);
  const allFields = useSelector((state) => state.field[warehouseId]);
  const [loadedWarehouseFields, setLoadedWarehouseFields] = useState(false);
  const [fields, setFields] = useState(null);
  const [rerender, setRerender] = useState(false); // New state to trigger re-render
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const openDeleteModal = () => setIsDeleteModalOpen(true);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  const confirmDelete = async () => {
    setIsDeleteModalOpen(false);
    await dispatch(deleteWarehouseThunk(warehouseId));
    navigate("/");
  };

  const ModalButton = ({ dir, operation, warehouseId }) => (
    <OpenModalButton
      buttonText={
        <span className="material-symbols-outlined">
          {operation === "add" ? "add" : "remove"}
        </span>
      }
      onItemClick={() => setIsModalOpen(false)}
      modalComponent={
        <EditWarehouseModal
          dir={dir}
          opperation={operation}
          warehouseId={warehouseId}
          onFieldChange={() => setRerender((prev) => !prev)} // Toggle rerender state
        />
      }
    />
  );

  useEffect(() => {
    setFields(null);
    setLoadedWarehouseFields(false);
    const fields = dispatch(getAllFieldsThunk(warehouseId));

    Promise.all([fields])
      .then(() => setLoadedWarehouseFields(true))
      .catch(() => console.log("🚨 fields could not be loaded!"));
  }, [dispatch, warehouseId]);

  useEffect(() => {
    if (loadedWarehouseFields && allFields) {
      const fieldsArr = Object.values(allFields);
      if (fieldsArr.length) {
        const sortedFields = sortFields(fieldsArr);
        setFields(sortedFields);
      }
    }
  }, [loadedWarehouseFields, allFields, rerender]); // Add rerender as a dependency

  return (
    <div className="flex flex-col items-center h-[80vh]">
      {/* Top Box (Delete Button) */}
      <div className="wrapper w-full border-2 height-[10vh]">
        <div className="flex justify-center items-center h-24">
        <button
            onClick={openDeleteModal} // Calls the function to open the modal
            className="btn btn-outline-secondary !text-red-700 hover:!text-white !border-red-700 hover:!bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 dark:!border-red-500 dark:!text-red-500 dark:hover:!bg-red-600 dark:focus:ring-red-900"
          >
            DELETE
          </button>

          {isDeleteModalOpen && (
            <DeleteWarehouseModal
              isDeleteModalOpen={isDeleteModalOpen}
              setIsDeleteModalOpen={setIsDeleteModalOpen}
              confirmDelete={confirmDelete}
              closeDeleteModal={closeDeleteModal} // Ensure this is passed correctly
            />
          )}
        </div>
      </div>

      {/* Fields and Buttons Layout */}
      <div className="wrapper flex w-[95%] h-[70vh]">
        {/* Left Buttons */}
        <div className="leftButtons flex flex-col items-center justify-center gap-1 w-[12%]">
          <ModalButton dir="left" operation="add" warehouseId={warehouseId} />
          <ModalButton
            dir="left"
            operation="subtract"
            warehouseId={warehouseId}
          />
        </div>

        {/* Fields Display */}
        <div className="fields flex items-center justify-center w-full">
          <div className="text-center w-full">
            {fields && warehouse ? fieldGenerator(fields, warehouse) : null}
          </div>
        </div>

        {/* Right Buttons */}
        <div className="rightButtons flex flex-col items-center justify-center gap-1 w-[12%]">
          <ModalButton dir="right" operation="add" warehouseId={warehouseId} />
          <ModalButton
            dir="right"
            operation="subtract"
            warehouseId={warehouseId}
          />
        </div>
      </div>

      {/* Bottom Buttons */}
      <div className="bottomButtons flex justify-center gap-4 w-full">
        <ModalButton dir="bottom" operation="add" warehouseId={warehouseId} />
        <ModalButton
          dir="bottom"
          operation="subtract"
          warehouseId={warehouseId}
        />
      </div>
    </div>
  );
}
