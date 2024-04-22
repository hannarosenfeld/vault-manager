import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { getAllFieldVaultsThunk, stageVaultThunk } from '../../../../store/vault';
import "./ConfirmStaging.css"


export default function ConfirmStaging({ 
    vault, 
    onClose,    
  }) {
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        let vaultData = new FormData()
        vaultData.append("staging", true)

        const stageVault = dispatch(stageVaultThunk(vault.id, vaultData))

        Promise.all([stageVault])
        .then(() => console.log("😎 vault staged", vault))
        .catch(() => console.log("🥐 couldn't set field"));

        // dispatch(getAllFieldVaultsThunk(vault.field_id)) // !!! ATTENTION: this is a hacky way to update our field vaults after stagin (so the forklift icon of the then "topmost" vault is clickable/yellow). ideally we want the topmostvault function (see RenderTMB) to run again with the remaining vaults.
        onClose(true);
    }

    const handleGoBackClick = () => {
        onClose(false);
    };

    return (
        <Box className="confirm-staging-modal">
            <form onSubmit={handleSubmit}>
                <p style={{marginBottom: "10px"}}>Are you sure you want to stage this vault?</p>
                <p style={{marginTop: "5px", marginBottom: "15px",  color: "var(--blue)", margin: "0 auto", fontWeight: "bold"}}>{vault?.customer_name} {vault?.name}</p>
                <Button type="submit" variant="contained">Yes</Button>
                <Button onClick={handleGoBackClick} variant="outlined">Go Back</Button>
            </form>
        </Box>
    )
}