import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllVaultAttachmentsThunk } from '../../../store/attachment';
import { getAllVaultsThunk } from '../../../store/vault';
import "./VaultDetailPage.css";


const VaultDetailPage = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const vaultId = parseInt(params.vaultId);
    const fieldId = parseInt(params.fieldId);
    const vaultObj = useSelector((state) => state.vault[vaultId]);
    // const attachmentsObj = useSelector((state) => state.attachment);
    const attachments = vaultObj?.attachments;
    const [loading, setLoading] = useState(true);

    const [selectedPDF, setSelectedPDF] = useState(null);

    const handleAttachmentClick = (fileUrl) => {
        setSelectedPDF(fileUrl);
    };

    useEffect(() => {
        if (vaultObj) setLoading(false);
        else dispatch(getAllVaultsThunk(fieldId));
    }, [vaultObj])


    return (
        <>

            {vaultObj && vaultObj.customer_name ? (
                <div className="container mt-3 wrapper">
                    <div className="card" style={{ marginBottom: '20px' }}>
                        <div className="card-body">
                            <h2 className="card-title">Vault Detail View</h2>
                            <div>
                                <strong>Vault</strong> #{vaultObj.name}
                            </div>
                            <div>
                                <strong>Order</strong> #{vaultObj.order_number}
                            </div>
                            <div>
                                <strong>Customer</strong> {vaultObj.customer_name}
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
                                    // style={{cursor: "pointer"}}
                                    className="d-flex attachment"
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
            ) : <div>...Loading</div>}
        </>
    );
};

export default VaultDetailPage;
