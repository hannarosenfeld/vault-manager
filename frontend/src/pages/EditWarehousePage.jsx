import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentWarehouse } from "../store/warehouse";
import LoadingSpinner from "../components/LoadingSpinner";
import EditWarehouseFieldGrid from "../components/EditWarehouse/EditWarehouseFieldGrid";

import { getCurrentFieldThunk } from "../store/warehouse";

function EditWarehousePage() {
  const { warehouseName } = useParams();
  const dispatch = useDispatch();
  const warehouse = useSelector((state) => state.warehouse.currentWarehouse);
  const warehouses = useSelector((state) => state.warehouse.warehouses);
  const [fieldsArr, setFieldsArr] = useState(null);
  const [loading, setLoading] = useState(true);

  function handleFieldClick(field) {
    if (field.id) dispatch(getCurrentFieldThunk(field));
  }

  useEffect(() => {
    const foundWarehouse = Object.values(warehouses).find(
      (w) => w.name.toLowerCase().split(" ").join("-") === warehouseName
    );
    if (foundWarehouse) {
      dispatch(setCurrentWarehouse(foundWarehouse));
      setFieldsArr(Object.values(foundWarehouse.fields));
    }
    setLoading(false);

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
    <div className="flex flex-col">
      <h1 className="text-xl font-bold mb-2 text-center">{warehouse.name}</h1>
      <div className="flex-grow">
        {fieldsArr.length ? (
          <EditWarehouseFieldGrid
            warehouse={warehouse}
            handleFieldClick={handleFieldClick}
          />
        ) : (
          "This warehouse does not have any fields"
        )}
      </div>
    </div>
  );
}

export default EditWarehousePage;