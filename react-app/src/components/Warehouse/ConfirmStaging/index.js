import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { addVaultToStageThunk } from '../../../store/stage';
import { removeVaultFromWarehouseThunk, getWarehouseInfoThunk, getAllWarehouseVaultsThunk } from '../../../store/warehouse';
import "./ConfirmStaging.css"


export default function ConfirmStaging({ 
    vault, 
    vaultCustomer, 
    vaultNumber, 
    vaultId, 
    onClose, 
    updateVaultPosition, 
  }) {
    const dispatch = useDispatch();
 
    const handleSubmit = async (e) => {
        e.preventDefault();
        updateVaultPosition(vault.position);
        const removeVault = await dispatch(removeVaultFromWarehouseThunk(vaultId))        
        const updatedVault = await dispatch(addVaultToStageThunk(vaultId));
        const getWarehouseInfoDispatch = await dispatch(getWarehouseInfoThunk(1));

        onClose();
    }

    const handleGoBackClick = () => {
        onClose();
    };

    return (
        <Box className="confirm-staging-modal">
            <form onSubmit={handleSubmit}>
                <p style={{marginBottom: "10px"}}>Are you sure you want to stage this vault?</p>
                <p style={{marginTop: "5px", marginBottom: "15px",  color: "var(--blue)", margin: "0 auto", fontWeight: "bold"}}>{vaultCustomer} {vaultNumber}</p>
                <Button type="submit" variant="contained">Yes</Button>
                <Button onClick={handleGoBackClick} variant="outlined">Go Back</Button>
            </form>
        </Box>
    )
}