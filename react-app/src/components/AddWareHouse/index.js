import React, { useState } from 'react';

const AddWarehouseForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [numRows, setNumRows] = useState('');
  const [numFieldsPerRow, setNumFieldsPerRow] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name,
      numRows: parseInt(numRows),
      numFieldsPerRow: parseInt(numFieldsPerRow)
    };
    onSubmit(data);
    setName('');
    setNumRows('');
    setNumFieldsPerRow('');
  };

  return (
    <div className='wrapper' style={{marginTop: "2em", padding: "1em 2em"}}>
    <form onSubmit={handleSubmit}>
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
          value={numRows}
          onChange={(e) => setNumRows(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Number of Fields per Row:</label>
        <input
          type="number"
          value={numFieldsPerRow}
          onChange={(e) => setNumFieldsPerRow(e.target.value)}
          required
        />
      </div>
      <button type="submit" style={{marginTop: "3em"}}>Add Warehouse</button>
    </form>
    </div>
  );
};

export default AddWarehouseForm;
