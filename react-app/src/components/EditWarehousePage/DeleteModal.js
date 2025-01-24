export const DeleteModal = ({ isOpen, onClose, onConfirm }) => (
    isOpen && (
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-5 rounded-lg shadow-lg text-center">
          <p>Are you sure you want to delete the warehouse?</p>
          <div className="mt-5">
            <button onClick={onConfirm} className="bg-red-500 text-white p-2 rounded mr-2">
              Yes
            </button>
            <button onClick={onClose} className="bg-gray-300 p-2 rounded">
              No
            </button>
          </div>
        </div>
      </div>
    )
  );  