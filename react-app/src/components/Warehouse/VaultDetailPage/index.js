import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getVaultThunk } from '../../../store/vault';


const VaultDetailPage = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const vaultId = parseInt(params.vaultId)
    const vaultObj = useSelector((state) => state.vault.currentVault);

    useEffect(() => {
        dispatch(getVaultThunk(vaultId))
    }, [vaultId])

    console.log("vaultId: ", vaultId)
    console.log("🛼", vaultObj)
    
    const vaultData = {
        vaultNumber: vaultObj.vault_id,
        orderNumber: vaultObj.order_number,
        customerName: vaultObj.customer.name,
    };

    return (
        <div 
            style={{
                display: "flex", 
                justifyContent: "center", 
                alignItems: "center", 
                height: "90vh", 
                background: "#f4f4f4",
            }}>
            <div 
                className="container" 
                style={{ 
                    border: "1px solid #ddd", 
                    borderRadius: "8px", 
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", 
                    padding: "20px", 
                    background: "#fff", 
                    width: "70%",
                    height: "70%"
                    }}>
                <h2 className="heading">Vault #{vaultData.vaultNumber}</h2>
                <div className="row align-items-start">
                    <div className="col">
                        <strong>Order </strong>#{vaultData.orderNumber}
                    </div>
                    <div className="col">
                        <strong>Customer:</strong> {vaultData.customerName}
                    </div>
                </div>
                <br/>
                <div className='row'>
                    <h4>Attachments</h4>
                    <div className='col'></div>
                </div>
            </div>
        </div>
    );
};

export default VaultDetailPage;
