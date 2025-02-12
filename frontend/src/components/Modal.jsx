export default function Modal({ onClose, children }) {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md max-w-sm w-full">
        <button onClick={onClose} className="absolute top-2 right-2 text-xl">X</button>
        <div>{children}</div>
      </div>
    </div>
  );
}
