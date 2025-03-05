import { Link } from "react-router-dom";

export default function HomePage({ warehouses }) {
  return (
    <div className="w-full h-full">
      <div className="mt-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Object.values(warehouses).map((warehouse) => (
            <div
              key={warehouse.id}
              className="border border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100"
            >
              <Link
                to={`/warehouse/${warehouse.name.toLowerCase().split(" ").join("-")}`}
                className="block cursor-pointer p-4"
              >
                <div>
                  <div className="text-lg font-semibold text-gray-800">
                    {warehouse.name}
                  </div>
                  <p>{warehouse.location}</p>
                </div>
              </Link>
              <hr className="border-gray-300" />
              <div className="py-2 px-4 hover:bg-blue-100 bg-blue-50">
                <Link
                  to={`/edit/${warehouse.name.toLowerCase().split(" ").join("-")}`}
                  className="text-blue-500 hover:text-blue-700 flex items-center p-2 rounded"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-4 w-4 mr-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                    />
                  </svg>
                  Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}