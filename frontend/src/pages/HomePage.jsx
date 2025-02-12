import { useNavigate } from "react-router-dom";

// 🚨 Add onhover styles to the warehouse boxes
export default function HomePage({ warehouses }) {
  const navigate = useNavigate();

  console.log("🥳", warehouses)

  const handleWarehouseClick = (warehouseName) => {
    navigate(`/warehouse/${warehouseName.toLowerCase().split(" ").join("-")}`);
  };

  return (
    <div className="w-full h-full">
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Object.values(warehouses).map((warehouse) => (
              <div
                key={warehouse.id}
                className="border border-gray-300 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleWarehouseClick(warehouse.name.toLowerCase().split(" ").join("-"))}
              >
                <h2 className="text-lg font-semibold text-gray-800">
                  {warehouse.name}
                </h2>
                <p>{warehouse.location}</p>
              </div>
            ))}
          </div>
        </div>
    </div>
  );
}