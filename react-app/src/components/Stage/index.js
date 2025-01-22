import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVaultsThunk } from "../../store/vault";
import StageToWareHouseModal from "./StageToWareHouseModal/StageToWareHouseModal";
import { Switch, Typography, Box } from "@mui/material";

export default function Stage() {
  const dispatch = useDispatch();
  const vaults = useSelector((state) => state.vault);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVault, setSelectedVault] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stagedArr, setStagedArr] = useState(null);
  const [isDeleteModeOn, setIsDeleteModeOn] = useState(false);

  const handleToggle = (event) => {
    setIsDeleteModeOn(event.target.checked);
  };

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

  const truncateString = (str, maxLength) => {
    if (str?.length > maxLength) {
      return str?.slice(0, maxLength) + "..";
    }
    return str;
  };

  const handleVaultClick = (vault) => {
    setSelectedVault(vault);
    setIsModalOpen(true);
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
              border: `10px solid ${isDeleteModeOn ? "red" : "pink"}`,
              height: "85vh",
              borderImage: isDeleteModeOn
                ? "repeating-linear-gradient(-55deg, #000, #000 20px, red 20px, red 40px) 10"
                : "repeating-linear-gradient(-55deg, #000, #000 20px, #ffb101 20px, #ffb101 40px) 10",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                border: "2px solid black",
                margin: "5px",
                padding: "5px 10px",
              }}
            >
              <Switch checked={isDeleteModeOn} onChange={handleToggle} />
              <Typography sx={{ marginLeft: "10px" }}>
                Delete vaults mode{" "}
                <span style={{ color: isDeleteModeOn ? "red" : "green" }}>
                  {isDeleteModeOn ? "ON" : "OFF"}
                </span>
              </Typography>
            </Box>
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
                      backgroundColor: "#ffb101",
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
