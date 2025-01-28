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
  const [rerender, setRerender] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isToggled, setIsToggled] = useState(false);
  
  const Rack = ({ id, isEmpty }) => {
    return (
      <div
        className={`w-16 h-16 border-2 ${isEmpty ? 'bg-gray-300' : 'bg-gray-600'} 
                    flex justify-center items-center m-2`}
      >
        {id}
      </div>
    );
  };

  const openDeleteModal = () => setIsDeleteModalOpen(true);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  const confirmDelete = async () => {
    setIsDeleteModalOpen(false);
    await dispatch(deleteWarehouseThunk(warehouseId));
    navigate("/");
  };

  const handleToggle = () => setIsToggled((prev) => !prev);

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
  }, [loadedWarehouseFields, allFields, rerender]);

  return (
    <div className="flex flex-col items-center h-[80vh]">
      <div className="wrapper !w-full !border-2 !h-[10vh] !flex !justify-between !items-center bg-white rounded-lg shadow-md !p-[2em] !mb-[1em]">
        <div className="!flex !items-center !space-x-3">
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              value=""
              className="!sr-only peer"
              checked={isToggled}
              onChange={handleToggle}
            />
            <div className="!relative w-11 h-6 !bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:!bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:!bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:!bg-blue-600 dark:peer-checked:!bg-blue-600" />
          </label>
          <span className="!text-sm !font-light !text-gray-900 !dark:text-gray-300">
            Show {isToggled ? "Racks" : "Fields"}
          </span>
        </div>

        <div>
          <button
            onClick={openDeleteModal}
            className="btn btn-outline-secondary !text-red-700 hover:!text-white !border-red-700 hover:!bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 dark:!border-red-500 dark:!text-red-500 dark:hover:!bg-red-600 dark:focus:ring-red-900"
          >
            DELETE
          </button>
        </div>

        {isDeleteModalOpen && (
          <DeleteWarehouseModal
            isDeleteModalOpen={isDeleteModalOpen}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            confirmDelete={confirmDelete}
            closeDeleteModal={closeDeleteModal}
          />
        )}
      </div>

      <div className="wrapper flex w-[95%] h-[70vh]">
        <div className="leftButtons flex flex-col items-center justify-center gap-1 w-[12%]">
          {!isToggled && (
            <>
              <ModalButton
                dir="left"
                operation="add"
                warehouseId={warehouseId}
              />
              <ModalButton
                dir="left"
                operation="subtract"
                warehouseId={warehouseId}
              />
            </>
          )}

          {/* Display racks instead of buttons when !isToggled */}
          {isToggled && (
            <>
              <Rack id="Rack 1" isEmpty={false} />
              <Rack id="Rack 2" isEmpty={true} />
              <Rack id="Rack 3" isEmpty={false} />
            </>
          )}
        </div>

        {!isToggled && (
          <div className="fields flex items-center justify-center w-[70%] m-auto">
            <div className="text-center w-full">
              {fields && warehouse ? fieldGenerator(fields, warehouse) : null}
            </div>
          </div>
        )}
        {isToggled && (
          <div className="fields flex items-center justify-center w-[70%] m-auto border-amber-800 border-4">
            <div className="text-center w-[70%]">
              {fields && warehouse ? fieldGenerator(fields, warehouse) : null}
            </div>
          </div>
        )}

        <div className="rightButtons flex flex-col items-center justify-center gap-1 w-[12%]">
          {!isToggled && (
            <>
              <ModalButton
                dir="right"
                operation="add"
                warehouseId={warehouseId}
              />
              <ModalButton
                dir="right"
                operation="subtract"
                warehouseId={warehouseId}
              />
            </>
          )}
        </div>
      </div>

      <div className="bottomButtons flex justify-center gap-4 w-full">
        {!isToggled && (
          <>
            <ModalButton
              dir="bottom"
              operation="add"
              warehouseId={warehouseId}
            />
            <ModalButton
              dir="bottom"
              operation="subtract"
              warehouseId={warehouseId}
            />
          </>
        )}
      </div>
    </div>
  );
}
