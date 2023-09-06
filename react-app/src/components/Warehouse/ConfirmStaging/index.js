import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import "./ConfirmStaging.css"

export default function ConfirmStaging({ vaultCustomer, vaultNumber }) {
    return (
        <Box className="confirm-staging-modal">
            <form >
                <p style={{marginBottom: "10px"}}>Are you sure you want to stage this vault?</p>
                <p style={{marginTop: "5px", marginBottom: "15px",  color: "var(--blue)", margin: "0 auto", fontWeight: "bold"}}>{vaultCustomer} {vaultNumber}</p>
                <Button variant="contained">Yes</Button>
                <Button variant="outlined">Go Back</Button>
            </form>
        </Box>
    )
}