import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useState } from "react";

export default function AddVaultModal({ onClose }) {
  const [isEmpty, setIsEmpty] = useState(false);
  const [formData, setFormData] = useState({
    customer: "",
    vaultNumber: "",
    orderNumber: "",
    type: "Standard",
    message: "",
  });

  const handleToggle = () => {
    setIsEmpty(!isEmpty);
    setFormData({
      ...formData,
      customer: !isEmpty ? "EMPTY" : "",
      orderNumber: "",
    });
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted", formData);
    onClose();
  };

  return (
    <Dialog open={true} onClose={onClose} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />
      <div className="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto p-4 sm:p-6 lg:p-8">
        <DialogPanel
          transition
          className="relative w-full max-w-lg transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        >
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-1 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <DialogTitle
                  as="h3"
                  className="text-lg font-semibold text-gray-900 mb-5"
                >
                  New Vault Info
                </DialogTitle>
                <div className="mt-2 w-full">
                  <form onSubmit={handleSubmit}>
                    <label className="mb-5 inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        value=""
                        className="sr-only peer"
                        onChange={handleToggle}
                      />
                      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      <span className="ms-3 text-sm font-medium text-gray-900">
                        Set empty
                      </span>
                    </label>

                    <div className="mb-5">
                      <label
                        htmlFor="customer"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Customer Name
                      </label>
                      <input
                        type="text"
                        id="customer"
                        value={formData.customer}
                        onChange={handleChange}
                        disabled={isEmpty}
                        className={`${
                          isEmpty ? "bg-gray-200 text-gray-500" : "bg-gray-50"
                        } border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                        placeholder="Customer Name"
                        required
                      />
                    </div>
                    <div className="flex gap-2">
                      <div className="mb-5 w-1/2">
                        <label
                          htmlFor="vaultNumber"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Vault Number
                        </label>
                        <input
                          type="text"
                          id="vaultNumber"
                          value={formData.vaultNumber}
                          onChange={handleChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          placeholder="Vault Number"
                          required
                        />
                      </div>
                      <div className="mb-5 w-1/2">
                        <label
                          htmlFor="orderNumber"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Order Number
                        </label>
                        <input
                          type="text"
                          id="orderNumber"
                          value={formData.orderNumber}
                          onChange={handleChange}
                          disabled={isEmpty}
                          className={`${
                            isEmpty ? "bg-gray-200 text-gray-500" : "bg-gray-50"
                          } border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                          placeholder="Order Number"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex gap-2 mb-5">
                      <div className="w-1/2">
                        <label
                          htmlFor="type"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Type
                        </label>
                        <select
                          id="type"
                          value={formData.type}
                          onChange={handleChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        >
                          <option>Standard</option>
                          <option>Tall</option>
                        </select>
                      </div>
                      <div className="w-1/2">
                        <label
                          htmlFor="fileUpload"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Upload File
                        </label>
                        <input
                          type="file"
                          id="fileUpload"
                          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div className="mb-5">
                      <label
                        htmlFor="message"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Your message
                      </label>
                      <textarea
                        id="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="4"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Add a note..."
                      ></textarea>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="submit"
                        className="inline-flex w-full justify-center rounded-md bg-blue-500 px-3 py-2 text-sm text-white shadow-xs hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto"
                      >
                        Add Vault
                      </button>
                      <button
                        type="button"
                        data-autofocus
                        onClick={() => onClose()}
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:mt-0 sm:w-auto"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}