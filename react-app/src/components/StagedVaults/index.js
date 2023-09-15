import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllStagedVaultsThunk } from "../../store/stage";

import "./StagedVaults.css";

export default function StagedVaults() {
  const dispatch = useDispatch();
  const staged = useSelector((state) => state.stage.stagedVaults);
  const stagedArr = Object.values(staged);

  useEffect(() => {
    dispatch(getAllStagedVaultsThunk());
  }, [dispatch]);

  // Function to truncate a string to a specified length
  const truncateString = (str, maxLength) => {
    if (str.length > maxLength) {
      return str.slice(0, maxLength) + ".."; // Append ellipsis for truncated text
    }
    return str;
  };

  return (
    <div className="page-wrapper">
      <div className="hazard-border">
        <div className="staged-containers">
          {stagedArr?.map((vault) => (
            <div key={vault.id} className="vault">
              <p><b>{truncateString(vault?.customer?.name, 6)}</b></p>
              <p>{vault?.vault_id}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
