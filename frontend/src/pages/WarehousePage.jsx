import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function WarehousePage() {
  const { warehouseName } = useParams();
  const warehouse = useSelector((state) =>
    Object.values(state.warehouse.warehouses).find(
      (w) => w.name.toLowerCase().split(" ").join("-") === warehouseName
    )
  );

  if (!warehouse) {
    return <div>Warehouse not found</div>;
  }

  return (
    <div className="h-full">
      <h1 className="text-xl font-bold mb-2 text-center">{warehouse.name}</h1>
      <div className="border-2 h-[23vh]">
      </div>
      <div className="border-2 min-h-[60vh]">

      </div>
    </div>
  );
}

export default WarehousePage;
