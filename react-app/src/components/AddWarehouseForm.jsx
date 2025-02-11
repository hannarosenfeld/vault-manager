import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addWarehouseThunk } from '../store/warehouse';


const AddWarehouseForm = ({ onAddWarehouseSubmit }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [numRows, setNumRows] = useState('');
  const [numCols, setNumCols] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const warehouseData = {
      name,
      numRows: parseInt(numRows),
      numCols: parseInt(numCols)
    };

    await dispatch(addWarehouseThunk(warehouseData));
    setName('');
    setNumRows('');
    setNumCols('');
    onAddWarehouseSubmit();
  };

  return (
    <div className='wrapper' style={{marginTop: "2em", padding: "1em 2em"}}>
      <h3>Add Warehouse</h3>
      <br></br>
      <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column", gap: "1.5em"}}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Number of Rows:</label>
          <input
            type="number"
            value={numCols}
            onChange={(e) => setNumCols(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Number of Fields per Row:</label>
          <input
            type="number"
            value={numRows}
            onChange={(e) => setNumRows(e.target.value)}
            required
          />
        </div>
        <button type="submit" style={{marginTop: "2em"}}>Add Warehouse</button>
      </form>
    </div>
  );
};

export default AddWarehouseForm;
