import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getVaultThunk } from '../../../store/vault';
import { getCustomerThunk } from '../../../store/customer';


const VaultDetailPage = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const vaultId = parseInt(params.vaultId);
    const vaultObj = useSelector((state) => state.vault.currentVault);
    const customerObj = useSelector((state) => state.customer.currentCustomer);

    useEffect(() => {
        dispatch(getVaultThunk(vaultId));
    }, [vaultId]);

    useEffect(() => {
        // Check if vaultObj.customer is defined before accessing its id property
        if (vaultObj.customer && vaultObj.customer.id) {
            dispatch(getCustomerThunk(vaultObj.customer.id));
        }
    }, [vaultObj]);

    console.log("🥎", customerObj);

    return (
        <>
            { vaultObj && vaultObj.customer && customerObj.vaults ? (
                <div className="container mt-5" style={{maxWidth: "800px"}}>
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title">Vault #{vaultObj.vault_id}</h2>
                            <div className="row">
                                <div className="col">
                                    <strong>Order:</strong> #{vaultObj.order_number}
                                </div>
                                <div className="col">
                                    <strong>Customer:</strong> {vaultObj.customer.name}
                                </div>
                                <div className="col">
                                    <strong>Total Customer Vaults:</strong> 10
                                </div>
                                <div>
                                    <strong>Customer Vaults:</strong>
                                    <div>
                                        {customerObj.vaults.map((vault) => (
                                            // TODO: add a table for the customer vaults. maybe add the date the vault was entered?
                                            <div key={vault.id}>{vault.vault_id}</div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col d-flex flex-column ">
                                    <strong className='mb-2'>Attachments</strong>
                                    <div className='d-flex'>
                                        <span className="material-symbols-outlined" style={{ fontSize: "1.5em" }}>
                                            file_present
                                        </span>
                                        <small>sample.pdf</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : 'Loading...'}
        </>
    );
};

export default VaultDetailPage;
