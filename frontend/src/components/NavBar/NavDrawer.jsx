import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function NavDrawer({ open, setOpen }) {
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
                  <a
                    href="#"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <span class="material-symbols-outlined">package_2</span>
                    <span className="ml-3">Stage</span>
                  </a>
                </nav>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
