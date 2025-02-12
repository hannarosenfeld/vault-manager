import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentWarehouse } from "../store/warehouse";

function WarehousePage() {
  const { warehouseName } = useParams();
  const dispatch = useDispatch();
  const warehouse = useSelector((state) => state.warehouse.currentWarehouse);
  const warehouses = useSelector((state) => state.warehouse.warehouses);

  useEffect(() => {
    const foundWarehouse = Object.values(warehouses).find(
      (w) => w.name.toLowerCase().split(" ").join("-") === warehouseName
    );
    if (foundWarehouse) {
      dispatch(setCurrentWarehouse(foundWarehouse));
    }
  }, [dispatch, warehouseName, warehouses]);

  if (!warehouse) {
    return <div>Warehouse not found</div>;
  }

  return (
    <div className="h-full">
      <h1 className="text-xl font-bold mb-2 text-center">{warehouse.name}</h1>
      <div className="border-2 h-[20vh]">

      </div>
      <div className="border-2 min-h-[60vh]">
      </div>
    </div>
  );
}

export default WarehousePage;