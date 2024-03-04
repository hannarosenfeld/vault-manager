import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCustomerThunk } from '../../../store/customer';
import { getAllVaultAttachmentsThunk } from '../../../store/attachment';

const VaultDetailPage = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const vaultId = parseInt(params.vaultId);
    const vaultObj = useSelector((state) => state.vault.currentVault);
    const attachmentsObj = useSelector((state) => state.attachment.vaultAttachments);
    const attachments = Object.values(attachmentsObj);
    const [selectedPDF, setSelectedPDF] = useState(null);


    useEffect(() => {
        dispatch(getAllVaultAttachmentsThunk(vaultId));
    }, [vaultId]);

    const handleAttachmentClick = (fileUrl) => {
        setSelectedPDF(fileUrl);
    };

    return (
        <>
            {vaultObj && vaultObj.customer && (
                <div className="container mt-3 wrapper">
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
                            
                            {/* FUTURE FEATURE: show more information about customer vaults 
                            <div>
                                <strong>Customer Vaults:</strong> 10
                            </div> 
                            */}
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
                            {selectedPDF ? <embed src={selectedPDF} width="100%" height="500" /> : "Select an Attachment to view it's content"}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default VaultDetailPage;
