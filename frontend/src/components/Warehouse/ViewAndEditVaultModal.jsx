import { useState } from "react";

export default function ViewAndEditVaultModal({ toggleModal, vault }) {
  const [editableVault, setEditableVault] = useState({ ...vault });
  const [editFields, setEditFields] = useState({
    customer_name: false,
    vault_id: false,
    order_name: false,
    note: false,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setEditableVault((prevVault) => ({
      ...prevVault,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSave = () => {
    // Save the updated vault information
    // This could involve making an API call or updating the parent component's state
    console.log("Saved vault:", editableVault);
    toggleModal();
  };

  const toggleEditField = (field) => {
    setEditFields((prevFields) => ({
      ...prevFields,
      [field]: !prevFields[field],
    }));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-8 rounded-lg shadow-lg z-10 w-full max-w-3xl max-h-full overflow-auto">
        <h2 className="text-2xl font-semibold mb-6">View / Edit Vault</h2>

        <div className="mb-6 flex items-center border-b border-gray-200 pb-4">
          <label className="block text-sm font-medium text-gray-700 w-1/3">
            Customer Name
          </label>
          {editFields.customer_name ? (
            <input
              type="text"
              name="customer_name"
              value={editableVault.customer_name}
              onChange={handleChange}
              className="ml-2 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          ) : (
            <span className="ml-2 w-2/3">{editableVault.customer_name}</span>
          )}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 cursor-pointer ml-2 text-blue-500"
            onClick={() => toggleEditField("customer_name")}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
            />
          </svg>
        </div>

        <div className="mb-6 flex items-center border-b border-gray-200 pb-4">
          <label className="block text-sm font-medium text-gray-700 w-1/3">
            Vault#
          </label>
          {editFields.vault_id ? (
            <input
              type="text"
              name="vault_id"
              value={editableVault.name}
              onChange={handleChange}
              className="ml-2 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          ) : (
            <span className="ml-2 w-2/3">{editableVault.name}</span>
          )}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 cursor-pointer ml-2 text-blue-500"
            onClick={() => toggleEditField("vault_id")}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
            />
          </svg>
        </div>

        <div className="mb-6 flex items-center border-b border-gray-200 pb-4">
          <label className="block text-sm font-medium text-gray-700 w-1/3">
            Order#
          </label>
          {editFields.order_name ? (
            <input
              type="text"
              name="order_name"
              value={editableVault.order_name}
              onChange={handleChange}
              className="ml-2 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          ) : (
            <span className="ml-2 w-2/3">{editableVault.order_name}</span>
          )}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 cursor-pointer ml-2 text-blue-500"
            onClick={() => toggleEditField("order_name")}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
            />
          </svg>
        </div>

        <div className="mb-6 border-b border-gray-200 pb-4">
          <label
            htmlFor="file"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Upload Attachment
          </label>
          <input
            type="file"
            name="file"
            id="file"
            onChange={handleChange}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <p className="mt-1 text-sm text-gray-500">No file chosen</p>
        </div>

        <div className="mb-6 border-b border-gray-200 pb-4">
          <label
            htmlFor="note"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Note
          </label>
          <textarea
            name="note"
            id="note"
            value={editableVault.note}
            onChange={handleChange}
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Add a note..."
          ></textarea>
        </div>

        <div className="mb-6 border-b border-gray-200 pb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Attachments
          </label>
          {editableVault.attachments && editableVault.attachments.length > 0 ? (
            <ul className="list-disc pl-5">
              {editableVault.attachments.map((attachment, index) => (
                <li key={index} className="text-sm text-gray-900">
                  {attachment}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No attachments</p>
          )}
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            type="button"
            className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            onClick={toggleModal}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}