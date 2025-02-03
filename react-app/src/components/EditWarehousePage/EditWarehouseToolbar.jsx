import DeleteWarehouseModal from "./DeleteWarehouseModal";

export const EditWarehouseToolBar = ({
  openDeleteModal,
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  confirmDelete,
  closeDeleteModal,
}) => {
  return (
    <div className="wrapper !w-full !h-[10vh] !flex !justify-between !items-center bg-white rounded-lg shadow-md !p-[2em] !mb-[1em]">
      <div>
        <button
          onClick={openDeleteModal}
          style={{ fontSize: "10px" }}
          className="btn btn-outline-secondary !text-red-700 hover:!text-white !border-red-700 hover:!bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg px-5 py-2.5 text-center mb-2 dark:!border-red-500 dark:!text-red-500 dark:hover:!bg-red-600 dark:focus:ring-red-900"
        >
          DELETE WAREHOUSE
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
  );
};
