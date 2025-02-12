import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentWarehouse } from "../store/warehouse";
import LoadingSpinner from "../components/LoadingSpinner";
import WarehouseFields from "../components/Warehouse/WarehouseFields";

function WarehousePage() {
  const { warehouseName } = useParams();
  const dispatch = useDispatch();
  const warehouse = useSelector((state) => state.warehouse.currentWarehouse);
  const warehouses = useSelector((state) => state.warehouse.warehouses);
  const [selectedField, setSelectedField] = useState(null);
  const [loading, setLoading] = useState(true);

  function handleFieldClick(field) {
    setSelectedField(field);
  }

  useEffect(() => {
    const foundWarehouse = Object.values(warehouses).find(
      (w) => w.name.toLowerCase().split(" ").join("-") === warehouseName
    );
    if (foundWarehouse) {
      dispatch(setCurrentWarehouse(foundWarehouse));
    }
    setLoading(false);

    // Cleanup function to reset currentWarehouse when component unmounts
    return () => {
      dispatch(setCurrentWarehouse(null));
    };
  }, [dispatch, warehouseName, warehouses]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!warehouse) {
    return <div>Warehouse could not be fetched</div>;
  }

  return (
    <div className="h-full">
      <h1 className="text-xl font-bold mb-2 text-center">{warehouse.name}</h1>
      <div className="border-2 h-[20vh]">{selectedField ? "hi" : "no"}</div>
      <div className="">
        {warehouse.fields.length ? (
          <WarehouseFields warehouse={warehouse} handleFieldClick={handleFieldClick} />
        ) : (
          "This warehouse does not have any fields"
        )}
      </div>
    </div>
  );
}

export default WarehousePage;