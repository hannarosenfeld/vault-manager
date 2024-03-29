import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

const VaultInstance = ({ topmostVault, vault, handleStageClick, fieldType }) => {
  const customer = useSelector(state => state.customer[vault.customer_id]);
  const { warehouseId } = useParams()

  console.log("💖", vault)

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
      <div style={{ display: 'flex', width: '60%', gap: '5px' }}>
        <div>{customer.name}</div>
        { fieldType !== "couchbox-T" ? (
        <div>{vault.name}</div>
        ) : (
        <div style={{ color: 'var(--red)' }}>
          <b>{vault.type}</b>
        </div>
        )}
      </div>
      <div className="edit-symbols">
        <span
          onClick={topmostVault ? () => handleStageClick(vault) : ''}
          style={{ color: topmostVault ? '#FFA500' : '#CCCCCC', cursor: topmostVault ? 'pointer' : 'not-allowed' }}
          className="material-symbols-outlined"
        >
          forklift
        </span>
        <Link to={`${warehouseId}/field/${vault.field_id}/vaults/${vault.id}/edit`} className="edit-link">
          <span
            style={{ color: '#0074D9' }}
            className="material-symbols-outlined"
          >
            edit
          </span>
        </Link>
        <Link to={`${warehouseId}/field/${vault.field_id}/vaults/${vault.id}/detail`}>
          <span className="material-symbols-outlined">description</span>
        </Link>
      </div>
    </div>
  );
};

export default VaultInstance;
