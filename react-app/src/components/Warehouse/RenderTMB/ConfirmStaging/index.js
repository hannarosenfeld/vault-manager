import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { editVaultThunk } from '../../../../store/vault';
import "./ConfirmStaging.css"


export default function ConfirmStaging({ 
    vault, 
    onClose, 
  }) {

    console.log("💁‍♀️", vault)

    const dispatch = useDispatch();
    const handleSubmit = async (e) => {
        e.preventDefault();
        let vaultData = new FormData()
        vaultData.append("staging", true)
    
        dispatch(editVaultThunk(vault.id, vaultData))
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