import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { editVaultThunk, stageVaultThunk } from '../../../../store/vault';
import "./ConfirmStaging.css"
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


export default function ConfirmStaging({ 
    vault, 
    onClose, 
    // warehouseId
  }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const handleSubmit = async (e) => {
        e.preventDefault();
        let vaultData = new FormData()
        vaultData.append("staging", true)
        dispatch(stageVaultThunk(vault.id, vaultData))
        // history.push(`/warehouse/${warehouseId}`)
        // const updatedVault = await dispatch(addVaultToStageThunk(vaultId));
        onClose();
    }

    const handleGoBackClick = () => {
        onClose();
    };

    return (
        <Box className="confirm-staging-modal">
            <form onSubmit={handleSubmit}>
                <p style={{marginBottom: "10px"}}>Are you sure you want to stage this vault?</p>
                <p style={{marginTop: "5px", marginBottom: "15px",  color: "var(--blue)", margin: "0 auto", fontWeight: "bold"}}>{vault.customer_name} {vault.name}</p>
                <Button type="submit" variant="contained">Yes</Button>
                <Button onClick={handleGoBackClick} variant="outlined">Go Back</Button>
            </form>
        </Box>
    )
}