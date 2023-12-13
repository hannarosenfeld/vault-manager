import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getVaultThunk } from '../../../store/vault';
import { getCustomerThunk } from '../../../store/customer';
import { getAllVaultAttachmentsThunk } from '../../../store/attachment';


const VaultDetailPage = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const vaultId = parseInt(params.vaultId);
    const vaultObj = useSelector((state) => state.vault.currentVault);
    const customerObj = useSelector((state) => state.customer.currentCustomer);
    const attachmentsObj = useSelector((state) => state.attachment.vaultAttachments);
    const attachments = Object.values(attachmentsObj);

    useEffect(() => {
        dispatch(getVaultThunk(vaultId));
        dispatch(getAllVaultAttachmentsThunk(vaultId));
    }, [vaultId]);

    useEffect(() => {
        // Check if vaultObj.customer is defined before accessing its id property
        if (vaultObj.customer && vaultObj.customer.id) {
            dispatch(getCustomerThunk(vaultObj.customer.id));
        }
    }, [vaultObj]);

    useEffect(() => {
        console.log("🧽", attachmentsObj)
    }, [attachmentsObj])

    return (
        <>
            { vaultObj && vaultObj.customer && customerObj.vaults ? (
                <div className="container mt-5" style={{maxWidth: "800px"}}>
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title">Vault Detail View</h2>
                            <div className="row">
                                <div className="col">
                                    <strong>Vault</strong> #{vaultObj.vault_id}
                                </div>                                
                                <div className="col">
                                    <strong>Order</strong> #{vaultObj.order_number}
                                </div>
                                <div className="col">
                                    <strong>Customer</strong> {vaultObj.customer.name}
                                </div>
                                <div className="col">
                                    <strong>Total Customer Vaults:</strong> 10
                                </div>
                                {/* <div>
                                    <strong>Customer Vaults:</strong>
                                    <div>
                                        {customerObj.vaults.map((vault) => (
                                            // TODO: add a table for the customer vaults. maybe add the date the vault was entered?
                                            <div key={vault.id}>{vault.vault_id}</div>
                                        ))}
                                    </div>
                                </div> */}
                            </div>
                            <div className="row mt-3">
                                <div className="col d-flex flex-column ">
                                    <strong className='mb-2'>Attachments</strong>
                                    {attachments.map(attachment => {
                                        console.log("📗", attachment)
                                        return(
                                        <div className='d-flex'>
                                            <span className="material-symbols-outlined" style={{ fontSize: "1.5em" }}>
                                                file_present
                                            </span>
                                            <small>{attachment.file_name}</small>
                                        </div>)
                                    })}
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
