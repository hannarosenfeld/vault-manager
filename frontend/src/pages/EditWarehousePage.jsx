import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentWarehouse } from "../store/warehouse";
import LoadingSpinner from "../components/LoadingSpinner";
import EditWarehouseFieldGrid from "../components/EditWarehouse/EditWarehouseFieldGrid";
import { getCurrentFieldThunk } from "../store/warehouse";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';

function EditWarehousePage() {
  const { warehouseName } = useParams();
  const dispatch = useDispatch();
  const warehouse = useSelector((state) => state.warehouse.currentWarehouse);
  const warehouses = useSelector((state) => state.warehouse.warehouses);
  const [fieldsArr, setFieldsArr] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalContent, setModalContent] = useState(null);

  function handleFieldClick(field) {
    if (field.id) dispatch(getCurrentFieldThunk(field));
  }

  useEffect(() => {
    const foundWarehouse = Object.values(warehouses).find(
      (w) => w.name.toLowerCase().split(" ").join("-") === warehouseName
    );
    if (foundWarehouse) {
      dispatch(setCurrentWarehouse(foundWarehouse));
      setFieldsArr(Object.values(foundWarehouse.fields));
    }
    setLoading(false);

    return () => {
      dispatch(setCurrentWarehouse(null));
    };
  }, [dispatch, warehouseName, warehouses]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!warehouse) {
    return <div>Warehouse could not be fetched</div>;
  }

  const handleAddClick = (position) => {
    setModalContent(`plus ${position}`);
  };

  const handleRemoveClick = (position) => {
    setModalContent(`minus ${position}`);
  };

  const closeModal = () => {
    setModalContent(null);
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-xl font-bold mb-2 text-center">{warehouse.name}</h1>
      <div className="flex-grow flex">
        <div className="flex flex-col justify-center mr-2">
          <button
            onClick={() => handleAddClick("left")}
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 mb-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-3 w-3"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
          <button
            onClick={() => handleRemoveClick("left")}
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-3 w-3"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
            </svg>
          </button>
        </div>
        <div className="flex-grow">
          {fieldsArr.length ? (
            <EditWarehouseFieldGrid
              warehouse={warehouse}
              handleFieldClick={handleFieldClick}
              isEditable={false}
            />
          ) : (
            "This warehouse does not have any fields"
          )}
        </div>
        <div className="flex flex-col justify-center ml-2">
          <button
            onClick={() => handleAddClick("right")}
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 mb-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-3 w-3"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
          <button
            onClick={() => handleRemoveClick("right")}
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-3 w-3"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
            </svg>
          </button>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={() => handleAddClick("bottom")}
          className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 mr-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-3 w-3"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </button>
        <button
          onClick={() => handleRemoveClick("bottom")}
          className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-3 w-3"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
          </svg>
        </button>
      </div>

      {modalContent && (
        <Dialog open={true} onClose={closeModal} className="relative z-10">
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
          />

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <DialogPanel
                transition
                className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
              >
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-6 w-6 text-blue-600"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 4.5v15m7.5-7.5h-15"
                        />
                      </svg>
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                        Operation
                      </DialogTitle>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">{modalContent}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-500 sm:ml-3 sm:w-auto"
                  >
                    Close
                  </button>
                </div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
}

export default EditWarehousePage;