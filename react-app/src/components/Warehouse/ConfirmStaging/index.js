import React, { forwardRef } from 'react';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { addVaultToStageThunk } from '../../../store/stage';
import { removeVaultFromWarehouseThunk, getWarehouseInfoThunk } from '../../../store/warehouse';
import "./ConfirmStaging.css";

const ConfirmStaging = forwardRef(({ vaultCustomer, vaultNumber, vaultId, onClose, fieldId, updateVaultPosition, tmb }, ref) => {
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
        <Box className="confirm-staging-modal" ref={ref}>
            <form onSubmit={handleSubmit}>
                <p style={{ marginBottom: "10px" }}>Are you sure you want to stage this vault?</p>
                <p style={{ marginTop: "5px", marginBottom: "15px", color: "var(--blue)", margin: "0 auto", fontWeight: "bold" }}>{vaultCustomer} {vaultNumber}</p>
                <Button type="submit" variant="contained">Yes</Button>
                <Button onClick={handleGoBackClick} variant="outlined">Go Back</Button>
            </form>
        </Box>
    )
});

export default ConfirmStaging;
