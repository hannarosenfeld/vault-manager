import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const VaultInstance = ({ topmostVault, vault, handleStageClick, fieldType }) => {
  // const customer = useSelector((state) => state.customer[vault.customer_id]);
  const { warehouseId } = useParams()
  const sessionuser = useSelector((state) => state.session.user);


  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
      <div style={{ display: 'flex', width: '60%', gap: '5px' }}>
      <div>
  {vault.customer_name === "null" || vault.customer_name === null 
    ? "EMPTY" 
    : (vault.customer_name.length > 10 
        ? `${vault.customer_name.slice(0, 10)}...` 
        : vault.customer_name)}
</div>
        { fieldType !== "couchbox-T" ? (
          <div style={{display: 'flex', gap: '0.5em'}}>
            <div>{vault.name}</div>
            <b style={{color: "var(--red)"}}>{vault.type}</b>
          </div>
        ) : (
        <div style={{ color: 'var(--red)' }}>
          <b>{vault.type}</b>
        </div>
        )}
      </div>
      <div className="edit-symbols">

        <span
          onClick={topmostVault ? () => handleStageClick(vault) : () => ''}
          style={{ color: topmostVault ? '#FFA500' : '#CCCCCC', cursor: topmostVault ? 'pointer' : 'not-allowed' }}
          className="material-symbols-outlined"
        >
          forklift
        </span>
        <Link to={`/${sessionuser.company.name.toLowerCase()}/warehouse/${warehouseId}/vault/${vault.id}/edit`} className="edit-link">
          <span
            style={{ color: '#0074D9' }}
            className="material-symbols-outlined"
          >
            edit
          </span>
        </Link>
        <Link to={`/${sessionuser.company.name.toLowerCase()}/warehouse/${warehouseId}/vault/${vault.id}/detail`}>
          <span className="material-symbols-outlined">description</span>
        </Link>
      </div>
    </div>
  );
};

export default VaultInstance;
