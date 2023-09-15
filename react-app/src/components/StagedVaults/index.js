import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getAllStagedVaultsThunk } from "../../store/stage";

import "./StagedVaults.css"


export default function StagedVaults() {
    const dispatch = useDispatch();
    const staged = useSelector(state => state.stage.stagedVaults);
    const stagedArr = Object.values(staged);

    useEffect(() => {
        dispatch(getAllStagedVaultsThunk())
    }, [dispatch])
    
    useEffect(() => {
        console.log("🪻", staged)
    },[staged])

    return (
        <div className="page-wrapper">
            <div className="hazard-border">
                <div className="staged-containers">
                    {stagedArr?.map(vault => (
                        <div key={vault.id} className="vault">
                            <p>{vault?.customer?.name}</p>
                            <p>{vault?.vault_id}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}   