import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { addVaultToStageThunk } from '../../../store/stage';
import { removeVaultFromWarehouseThunk, getWarehouseInfoThunk, getAllWarehouseVaultsThunk } from '../../../store/warehouse';
import { removeVaultFromFieldThunk } from '../../../store/field';
import "./ConfirmStaging.css"
import { dialogClasses } from '@mui/material';


export default function ConfirmStaging({ vaultCustomer, vaultNumber, vaultId, onClose, fieldId, updateVaultPosition, tmb}) {
    const dispatch = useDispatch();
 
    const handleSubmit = async (e) => {
        e.preventDefault();
        const staged = await dispatch(addVaultToStageThunk(vaultId));
        await dispatch(removeVaultFromWarehouseThunk(vaultId))

        if (staged) {
            await updateVaultPosition(tmb);
          }

        await dispatch(getWarehouseInfoThunk());

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