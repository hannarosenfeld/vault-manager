import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addFieldsThunk } from "../../store/field";


export function EditWarehouseModal({ dir, opperation, warehouseId }) {
  const dispatch = useDispatch();
  const warehouse = useSelector(state => state.warehouse[warehouseId]);
  const [count, setCount] = useState(1);


  const onSubmit = (e) => {
    e.preventDefault();
    console.log("💁‍♀️")
    const warehouseData = {
      warehouse_id: warehouseId,
      direction: dir,
      opperation: opperation,
      warehouse_columns: warehouse.columns,
      warehouse_rows: warehouse.rows,
      count
    }
    if (opperation === 'add') dispatch(addFieldsThunk(warehouseData));
    // if (opperation === 'subtract') 
  }

  return (
    <div style={{width: "20em", padding: "2em"}}>
      <form onSubmit={onSubmit}>
      <div>{opperation === "add" ? 'Add' : 'Subtract'} <b>{count}</b> row{count === 1 ? '' : 's' } to warehouse <b>{dir}</b></div>
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
