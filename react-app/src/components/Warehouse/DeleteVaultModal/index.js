import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import "./DeleteVaultModal.css"
import { useDispatch } from 'react-redux';
import { deleteVaultThunk, getAllVaultsThunk } from '../../../store/vault';
import { getAllRowsThunk } from '../../../store/rows';
import { getAllFieldsThunk } from '../../../store/field';

export default function DeleteVaultModal({ onClose, vaultId, vaultCustomer, vaultNumber }) {
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(deleteVaultThunk(vaultId));
        await dispatch(getAllRowsThunk());
        await dispatch(getAllVaultsThunk());
        await dispatch(getAllFieldsThunk());
    
        onClose();
    }

    const handleGoBackClick = () => {
        onClose();
    };

    return (
        <Box className="delete-vault-modal-wrapper">
            <div className="delete-vault-modal">
                <div className='delete-vault-modal-content'>
                    <div style={{display: "flex", flexDirection: "column", gap: "8px", marginBottom: "5px"}}>
                        <p>Are you sure you want to delete this vault?</p>
                        <p style={{margin: "5px auto", fontWeight: "bold"}}>{vaultCustomer} {vaultNumber}</p>
                    </div>
                    <form>
                        <Button variant="contained" onClick={handleSubmit}>Submit</Button>
                        <Button variant="outlined" onClick={handleGoBackClick}>Go Back</Button>
                    </form>
                </div>
            </div>
        </Box>
    )
}
