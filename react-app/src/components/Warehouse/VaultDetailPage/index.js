import { useEffect, useState } from 'react';
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
    const [selectedPDF, setSelectedPDF] = useState(null);

    useEffect(() => {
        dispatch(getVaultThunk(vaultId));
        dispatch(getAllVaultAttachmentsThunk(vaultId));
    }, [vaultId]);

    useEffect(() => {
        if (vaultObj.customer && vaultObj.customer.id) {
            dispatch(getCustomerThunk(vaultObj.customer.id));
        }
    }, [vaultObj]);

    const handleAttachmentClick = (fileUrl) => {
        setSelectedPDF(fileUrl)
        console.log('Attachment Clicked:', selectedPDF);
    };

    return (
        <>
            {vaultObj && vaultObj.customer && customerObj.vaults ? (
                <div className="container mt-3" style={{ display: 'flex', maxWidth: '800px', height: '85vh' }}>
                    <div className="card" style={{ flex: 1, marginRight: '20px' }}>
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
                                    <strong>Customer Vaults:</strong> 10
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col d-flex flex-column">
                                    <strong className="mb-2">Attachments</strong>
                                    {attachments.map((attachment) => (
                                        <div
                                            className="d-flex"
                                            key={attachment.id}
                                            onClick={() => handleAttachmentClick(attachment.file_url)}
                                        >
                                            <span className="material-symbols-outlined" style={{ fontSize: '1.5em' }}>
                                                file_present
                                            </span>
                                            <small>{attachment.file_name}</small>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ border: '2px solid grey', height: '85vh', width: '60%', overflow: 'auto' }}>
                        { selectedPDF && (
                            <embed src={selectedPDF} width="100%" height="100%"/>                            
                        )}                                        
                    </div>
                </div>
            ) : (
                'Loading...'
            )}
        </>
    );
};

export default VaultDetailPage;
