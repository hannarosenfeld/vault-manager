import { useState } from "react";

export function EditWarehouseModal({dir, opperation}) {

  const [count, setCount] = useState(1);

  return (
    <>
      {opperation === "add" ? <div>Add rows from warehouse</div> : <div>Subtract rows from warehouse</div>}
      <div>
      {(opperation === "add" && count === 1) ? "" : <i class="fa-solid fa-arrow-left" onClick={() => setCount(count-1)}></i>}
      {count}
      <i class="fa-solid fa-arrow-right" onClick={() => setCount(count+1)}></i>
      </div>
    </>
  );
}
