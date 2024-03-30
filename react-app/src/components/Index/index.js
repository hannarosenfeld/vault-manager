import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { getAllWarehousesThunk } from "../../store/warehouse";
import { useEffect } from "react";


export default function Index({ company }) {
    const dispatch = useDispatch();
    const warehousesObj = useSelector(state => state.warehouse);
    const warehouses = Object.values(warehousesObj);

    useEffect(() => {
        console.log("🥰", company)
    }, [company])

    useEffect(() => {
        dispatch(getAllWarehousesThunk());
    }, [dispatch])

    return(
        <div className="wrapper" style={{marginTop: "1em"}}>
            <div style={{display: "flex", gap: "1em"}}>
            {warehouses.map(warehouse => (
                <div className="card" style={{width: "18rem"}}>
                    <div class="card-body">
                        <NavLink to={`/${company.name}/warehouse/${warehouse.id}`}>
                        <h5 class="card-title">{warehouse.name}</h5>
                        </NavLink>
                    </div>
                </div>
            ))}
            </div>
        </div>
    )
}