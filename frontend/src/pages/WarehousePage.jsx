import { useParams } from "react-router-dom";

function WarehousePage() {
  const { warehouseId } = useParams();

  return (
    <div>
      <h1>Warehouse Details</h1>
      <p>Warehouse ID: {warehouseId}</p>
    </div>
  );
}

export default WarehousePage;