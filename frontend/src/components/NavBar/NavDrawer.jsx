import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

export default function NavDrawer({ open, setOpen }) {
  const warehouses = useSelector((state) => state.warehouse.warehouses);
  const warehouseArr = Object.values(warehouses);

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className="relative z-50"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 transition-opacity"
        aria-hidden="true"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full">
            {/* Drawer Panel */}
            <DialogPanel
              className={`pointer-events-auto relative w-64 bg-white dark:bg-gray-800 shadow-xl transition-transform duration-300 ease-in-out ${
                open ? "translate-x-0" : "translate-x-full"
              }`}
            >
              {/* Close Button */}
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-white"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>

              {/* Drawer Content */}
              <div className="p-4">
                <DialogTitle className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400">
                  Menu
                </DialogTitle>
                <nav className="mt-4 space-y-2">
                  {/* Loop through warehouses and create dynamic links */}
                  {warehouseArr.map((warehouse) => (
                    <Link
                      key={warehouse.id} // Unique key for each warehouse
                      to={`/warehouse/${warehouse.name
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`} // Format the name for the URL
                      className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                      onClick={() => setOpen(false)} // Close the drawer on click
                    >
                      <span className="material-symbols-outlined">warehouse</span>
                      <span className="ml-3">{warehouse.name}</span>
                    </Link>
                  ))}
                  {/* Static Stage Link */}
                  <Link
                    to="/stage" // This will navigate to the /stage route
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                    onClick={() => setOpen(false)} // Close the drawer on click
                  >
                    <span className="material-symbols-outlined">package_2</span>
                    <span className="ml-3">Stage</span>
                  </Link>
                </nav>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
