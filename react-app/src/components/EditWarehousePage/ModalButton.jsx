import OpenModalButton from "../OpenModalButton";
import { EditWarehouseModal } from "./editWarehouseModal";


export const ModalButton = ({ dir, operation, warehouseId }) => (
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