import { useState } from "react";
import { useSelector } from "react-redux";
import { editWarehouseThunk } from "../../store/warehouse";
import { useDispatch } from "react-redux";


export function EditWarehouseModal({ dir, opperation, warehouseId }) {
  const dispatch = useDispatch();
  const warehouse = useSelector(state => state.warehouse[warehouseId]);
  const [count, setCount] = useState(1);


  const editWarehouse = (e) => {
    e.preventDefault();
    console.log("💁‍♀️")
    const warehouseData = {
      warehouseId,
      direction: dir,
      warehouseColumns: warehouse.columns,
      warehouseRows: warehouse.rows,
      count
      // amountRowsAdded: count
    }
    dispatch(editWarehouseThunk(warehouseData));
  }

  return (
    <div style={{width: "20em", padding: "2em"}}>
      <form onSubmit={editWarehouse}>
      {opperation === "add" ? <div>Add <b>{count}</b> row{count === 1 ? '' : 's' } to warehouse</div> : <div>Subtract <b>{count}</b> row{count === 1 ? '' : 's' } from warehouse</div>}
      <div className="input-group">
        <button
          className="btn btn-outline-secondary"
          disabled={count === 1}
          onClick={() => setCount(count - 1)}
        >
          -
        </button>
        {/* <input type="text" className="form-control text-center" value={count} readOnly /> */}
        <button
          className="btn btn-outline-secondary"
          onClick={() => setCount(count + 1)}
        >
          +
        </button>
      </div>
      <br/>
      <button class="btn btn-primary">submit</button>
      </form>
    </div>
  );
}
