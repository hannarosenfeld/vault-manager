import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVaultsThunk } from "../../store/vault";
import StageToWareHouseModal from "./StageToWareHouseModal/StageToWareHouseModal";
import { Box, Typography, Button, Switch, Modal } from "@mui/material";
import { deleteVaultThunk } from "../../store/vault";


export default function Stage() {
  const dispatch = useDispatch();
  const vaults = useSelector((state) => state.vault);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVault, setSelectedVault] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stagedArr, setStagedArr] = useState(null);
  const [isDeleteModeOn, setIsDeleteModeOn] = useState(false);
  const [vaultsToDelete, setVaultsToDelete] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      let res = await dispatch(getVaultsThunk());
      setStagedArr(
        Object.values(res).filter(
          (vault) => !vault.field_id && !vault.position
        )
      );
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (Object.values(vaults).length) {
      setStagedArr(
        Object.values(vaults).filter(
          (vault) => !vault.field_id && !vault.position
        )
      );
      setLoading(false);
    }
  }, [vaults]);
  
  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    try {
      // Wait for all delete actions to complete
      await Promise.all(vaultsToDelete.map((vault) => dispatch(deleteVaultThunk(vault.id))));
      
      // Fetch updated vaults or update stagedArr directly
      setStagedArr((prevStagedArr) =>
        prevStagedArr.filter(
          (vault) => !vaultsToDelete.some((deletedVault) => deletedVault.id === vault.id)
        )
      );
      
      // Clear the vaultsToDelete array
      setVaultsToDelete([]);
      
      // Close the modal
      setIsDeleteModalOpen(false);
      
      console.log("Vaults deleted!");
    } catch (error) {
      console.error("Error deleting vaults:", error);
    }
  };

  const handleToggle = (event) => {
    setIsDeleteModeOn(event.target.checked);
  };

  const truncateString = (str, maxLength) => {
    if (str?.length > maxLength) {
      return str?.slice(0, maxLength) + "..";
    }
    return str;
  };

  const handleVaultClick = (vault) => {
    setSelectedVault(vault);
    if (!isDeleteModeOn) {
      setIsModalOpen(true);
    } else {
      setVaultsToDelete((prevVaults) => {
        // Check if the vault is already in the list
        const isVaultInList = prevVaults.some((v) => v.id === vault.id);
        if (isVaultInList) {
          // Remove the vault if it's already in the list
          return prevVaults.filter((v) => v.id !== vault.id);
        } else {
          // Add the vault to the list
          return [...prevVaults, vault];
        }
      });
    }
  };
  

  return (
    <>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div style={{ padding: "20px" }}>
          <div
            style={{
              maxWidth: "800px",
              margin: "0 auto",
              border: `10px solid ${isDeleteModeOn ? "red" : "#ffb101"}`,
              height: "85vh",
              borderImage: isDeleteModeOn
                ? "repeating-linear-gradient(-55deg, #000, #000 20px, red 20px, red 40px) 10"
                : "repeating-linear-gradient(-55deg, #000, #000 20px, #ffb101 20px, #ffb101 40px) 10",
            }}
          >
       <Box
        sx={{
          display: "flex",
          justifyContent: "space-between", // Align toggle/text and trash button
          alignItems: "center",
          border: "2px solid black",
          borderRadius: "8px", // Rounded corners
          margin: "5px",
          padding: "10px 20px",
        }}
      >
        {/* Left Side: Toggle and Text */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Switch
            checked={isDeleteModeOn}
            onChange={handleToggle}
            sx={{ transform: "scale(1.5)" }} // Make the toggle bigger
          />
          <Typography sx={{ marginLeft: "15px", fontSize: "1rem" }}>
            Delete vaults mode{" "}
            <span style={{ color: isDeleteModeOn ? "red" : "green" }}>
              {isDeleteModeOn ? "ON" : "OFF"}
            </span>
          </Typography>
        </Box>

        {/* Right Side: Trash Button */}
        <Button
          variant="contained"
          color="error"
          size="large"
          onClick={handleDeleteClick}
          style={{
            display: isDeleteModeOn ? "flex" : "none",
          }}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: "24px" }}>
            delete
          </span>
        </Button>
      </Box>

      {/* Modal for Confirmation */}
      <Modal open={isDeleteModalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: "8px",
            boxShadow: 24,
            p: 4,
            textAlign: "center",
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Are you sure you want to delete the vaults?
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
            <Button
              variant="outlined"
              onClick={handleCloseModal}
              sx={{ flexGrow: 1, marginRight: "10px" }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleConfirmDelete}
              sx={{ flexGrow: 1 }}
            >
              Confirm
            </Button>
          </Box>
        </Box>
        </Modal>

            <div
              style={{
                padding: "5px",
                display: "flex",
                flexWrap: "wrap",
                gap: "5px",
                justifyContent: "flex-start",
              }}
            >
              {stagedArr.length ? (
                stagedArr.map((vault) => (
                  <div
                    key={vault.id}
                    style={{
                      fontSize: "10px",
                      display: "flex",
                      flexDirection: "column",
                      width: "5em",
                      height: "5em",
                      padding: "4px",
                      borderRadius: "3px",
                      border: "1px solid black",
                      backgroundColor: !isDeleteModeOn
                      ? "#ffb101"
                      : vaultsToDelete.some((vaultToDelete) => vaultToDelete.id === vault.id)
                      ? "red"
                      : "#ffb101",
                      cursor: "pointer",
                    }}
                    onClick={() => handleVaultClick(vault)}
                  >
                    <p style={{ marginBottom: "0" }}>
                      <b>{truncateString(vault.customer_name, 6)}</b>
                    </p>
                    <p>{vault.name}</p>
                  </div>
                ))
              ) : (
                <>No staged vaults</>
              )}
            </div>
          </div>
          {isModalOpen && (
            <StageToWareHouseModal
              selectedVault={selectedVault}
              closeModal={() => setIsModalOpen(false)}
            />
          )}
        </div>
      )}
    </>
  );
}
