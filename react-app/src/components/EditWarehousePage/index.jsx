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
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        />
      }
    />
  );

  // Delete Warehouse Modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const openDeleteModal = () => setIsDeleteModalOpen(true);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);
  const confirmDelete = async () => {
    setIsDeleteModalOpen(false);
    await dispatch(deleteWarehouseThunk(warehouseId));
    navigate("/");
  };

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
  }, [loadedWarehouseFields, allFields]);

  return (
    <div>
      <div className="flex flex-col items-center h-full">
        <div className="wrapper flex flex-col items-center w-full h-full">
          <div className="border-2">
            <div className="flex justify-center items-center h-24">
              <OpenModalButton
                buttonText="DELETE"
                onItemClick={openDeleteModal}
                modalComponent={
                  <DeleteWarehouseModal
                    closeModal={closeDeleteModal}
                    confirmDelete={confirmDelete}
                  />
                }
              />
            </div>
          </div>
          <div className="flex w-full mt-4 relative">
            {/* Left Buttons */}
            <div className="leftButtons absolute left-0 top-0 flex flex-col items-center mx-2">
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
            </div>

            {/* Fields Display */}
            <div className="flex w-3/4 items-center justify-center">
              <div className="w-full text-center">
                {fields && warehouse ? fieldGenerator(fields, warehouse) : null}
              </div>
            </div>

            {/* Right Buttons */}
            <div className="rightButtons absolute right-0 top-0 flex flex-col items-center mx-2">
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
            </div>
          </div>

          {/* Bottom Buttons */}
          <div className="bottomButtons absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-4 mt-4">
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
          </div>
        </div>
      </div>
    </div>
  );
}
