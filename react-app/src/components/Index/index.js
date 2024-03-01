import Warehouse from "../Warehouse";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { getAllWarehousesThunk } from "../../store/warehouse";
import { useEffect } from "react";


export default function Index() {
    const dispatch = useDispatch();
    const warehousesObj = useSelector(state => state.warehouse);
    const warehouses = Object.values(warehousesObj);

    useEffect(() => {
        dispatch(getAllWarehousesThunk());
    }, [])

    return(
        <div className="wrapper" style={{marginTop: "1em"}}>
            {/* <Warehouse warehouseId="1"/> */}
            <div style={{display: "flex", gap: "1em"}}>
            {warehouses.map(warehouse => (
                <div className="card" style={{width: "18rem"}}>
                    {/* <img src="..." class="card-img-top" alt="..." /> */}
                    <div class="card-body">
                        <NavLink to={`/warehouse/${warehouse.id}`}>
                        <h5 class="card-title">{warehouse.name}</h5>
                        </NavLink>
                        {/* <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a> */}
                    </div>
                </div>
            ))}
            </div>
        </div>
    )
}