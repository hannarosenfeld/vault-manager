import { Dialog, DialogBackdrop, DialogPanel, DialogTitle} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

export default function NavDrawer({ open, setOpen }) {  
  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-closed:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto relative w-screen max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
            >
              <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                <div className="px-4 sm:px-6 flex justify-between items-center">
                  <DialogTitle className="text-base font-semibold text-gray-900">Panel title</DialogTitle>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="rounded-md text-gray-300 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden"
                  >
                    <span className="sr-only">Close panel</span>
                    <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                  </button>
                </div>
                <div className="relative mt-6 flex-1 px-4 sm:px-6">{/* Your content */}</div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  )
}