import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { getAllFieldsThunk } from '../../store/field';
import { Link } from 'react-router-dom';
import { getCustomerThunk } from '../../store/customer';


const VaultInstance = ({ topmostVault, vault, position, handleStageClick, handleEditClick }) => {
  const dispatch = useDispatch();
  const customer = useSelector(state => state.customer) // TODO: Change store and fetch customer to render on line 23
  const [field, setField] = useState(null);
  const [isLoading, setIsLoadig] = useState(true); // TODO: Conditional Render based on isLoaded

  console.log("🪶", customer)

  useEffect(() => {
    dispatch(getCustomerThunk(vault.customer_id)) // The route is currently not working
    .then(setIsLoadig(false));
  }, [vault.customer_id])

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
      <div style={{ display: 'flex', width: '60%', gap: '5px' }}>
        <div>{customer.name}</div>
        <div>{vault.name}</div>
        <div style={{ color: 'var(--red)' }}>
          <b>{vault.type}</b>
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
        <Link to={`/vaults/${vault?.id}/detail`}>
          <span class="material-symbols-outlined">
          description
          </span>
        </Link>
      </div>
    </div>    
  );
};

export default VaultInstance;
