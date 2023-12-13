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

    console.log("📕", vaultObj)

    useEffect(() => {
        dispatch(getVaultThunk(vaultId));
        dispatch(getAllVaultAttachmentsThunk(vaultId));
    }, [vaultId]);

    useEffect(() => {
        if (attachments) setSelectedPDF(attachments[0].file_url)
    }, [attachments])

    const handleAttachmentClick = (fileUrl) => {
        setSelectedPDF(fileUrl);
        console.log('Attachment Clicked:', selectedPDF);
    };

    return (
        <>
            {vaultObj && vaultObj.customer && customerObj.vaults ? (
                <div className="container mt-3">
                    <div className="card" style={{ marginBottom: '20px' }}>
                        <div className="card-body">
                            <h2 className="card-title">Vault Detail View</h2>
                            <div>
                                <strong>Vault</strong> #{vaultObj.vault_id}
                            </div>
                            <div>
                                <strong>Order</strong> #{vaultObj.order_number}
                            </div>
                            <div>
                                <strong>Customer</strong> {vaultObj.customer.name}
                            </div>
                            <div>
                                <strong>Customer Vaults:</strong> 10
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <strong className="mb-3">Attachments</strong>
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
                    <div className="card mt-3">
                        <div className="card-body">
                            {selectedPDF && <embed src={selectedPDF} width="100%" height="500" />}
                        </div>
                    </div>
                </div>
            ) : (
                'Loading...'
            )}
        </>
    );
};

export default VaultDetailPage;
