import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import "./DeleteVaultModal.css"
import { useDispatch } from 'react-redux';
import { deleteVaultThunk } from '../../../store/vault';

export default function DeleteVaultModal({ onClose, vaultId }) {
    console.log(vaultId)
    const dispatch = useDispatch();

    const handleSubmit = async () => {
        await dispatch(deleteVaultThunk(vaultId));
        onClose();
    }

    const handleGoBackClick = () => {
        onClose();
    };

    return (
        <Box className="delete-vault-modal-wrapper">
            <div className="delete-vault-modal">
                <div className='delete-vault-modal-content'>
                    <p>Are you sure you want to delete this vault?</p>
                    <form>
                        <Button variant="contained" onClick={handleSubmit}>Submit</Button>
                        <Button variant="outlined" onClick={handleGoBackClick}>Go Back</Button>
                    </form>
                </div>
            </div>
        </Box>
    )
}
