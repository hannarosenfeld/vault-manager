import { useState } from "react";

export function EditWarehouseModal({ dir, opperation }) {

  const [count, setCount] = useState(1);

  return (
    <div style={{width: "22em", padding: "3em"}}>
      {opperation === "add" ? <div>Add <b>{count}</b> row{count === 1 ? '' : 's' } to warehouse</div> : <div>Subtract rows from warehouse</div>}
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
    </div>
  );
}
