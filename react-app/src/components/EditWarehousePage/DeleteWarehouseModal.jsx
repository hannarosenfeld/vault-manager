const DeleteWarehouseModal = ({ closeModal, confirmDelete }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
      <div className="bg-white p-5 rounded-lg shadow-lg text-center">
        <p>Are you sure you want to delete the warehouse?</p>
        <div className="mt-5">
          <button
            onClick={confirmDelete}
            className="px-5 py-2 bg-red-500 text-white rounded-md mr-2 cursor-pointer"
          >
            Yes
          </button>
          <button
            onClick={closeModal}
            className="px-5 py-2 bg-gray-300 rounded-md cursor-pointer"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteWarehouseModal;
