import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export default function AddVaultModal({ onClose }) {
  return (
    <Dialog open={true} onClose={onClose} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />
      <div className="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto w-[90%] m-auto">
        <DialogPanel
          transition
          className="w-100 relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
        >
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-1 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <DialogTitle
                  as="h3"
                  className="text-base font-semibold text-gray-900 mb-5"
                >
                  New Vault Info
                </DialogTitle>
                <div className="mt-2 w-full">
                  <form>
                    <div class="mb-5">
                      <label
                        for="customer"
                        class="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Customer Name
                      </label>
                      <input
                        type="text"
                        id="customer"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Customer Name"
                        required
                      />
                    </div>
                    <div className="flex gap-2">
                      <div class="mb-5">
                        <label
                          for="vaultNumber"
                          class="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Vault Number
                        </label>
                        <input
                          type="text"
                          id="vaultNumber"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          placeholder="Customer Name"
                          required
                        />
                      </div>
                      <div class="mb-5">
                        <label
                          for="orderNumber"
                          class="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Order Number
                        </label>
                        <input
                          type="text"
                          id="orderNumber"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          placeholder="Customer Name"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        for="type"
                        class="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Type
                      </label>
                      <select
                        id="type"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      >
                        <option>Standard</option>
                        <option>Tall</option>
                      </select>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              type="button"
              onClick={() => onClose()}
              className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
            >
              Deactivate
            </button>
            <button
              type="button"
              data-autofocus
              onClick={() => onClose()}
              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
            >
              Cancel
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
