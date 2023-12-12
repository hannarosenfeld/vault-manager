import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { getFieldThunk } from '../../store/field';
import { Link } from 'react-router-dom';

const VaultInstance = ({ topmostVault, vault, position, handleStageClick, handleEditClick }) => {
  const dispatch = useDispatch();
  // const [topmostPosition, setTopmostPosition] = useState('');
  const [field, setField] = useState(null);

  useEffect(() => {
    // Fetch field information when component mounts
    dispatch(getFieldThunk(vault.field_id))
      .then((response) => {
        setField(response.payload);
      })
      .catch((error) => {
        console.error('Error fetching field:', error);
      });
  }, [dispatch, vault.field_id]);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
      <div style={{ display: 'flex', width: '60%', gap: '5px' }}>
        <div>{vault?.customer?.name}</div>
        <div>{vault?.vault_id}</div>
        <div style={{ color: 'var(--red)' }}>
          <b>{vault?.type}</b>
        </div>
      </div>
      <div className="edit-symbols">
        <span
          onClick={ topmostVault ? () => handleStageClick(vault, position) : '' }
          style={{ color: topmostVault ? '#FFA500' : '#CCCCCC', cursor: topmostVault ? 'pointer' : 'not-allowed' }}
          className="material-symbols-outlined"
        >
          forklift
        </span>
        <Link to={`/vaults/${vault?.id}/edit`} className="edit-link">
          <span
            // onClick={() => handleEditClick(vault)}
            style={{ color: '#0074D9' }}
            className="material-symbols-outlined"
          >
            edit
          </span>
        </Link>
      </div>
    </div>
  );
};

export default VaultInstance;
