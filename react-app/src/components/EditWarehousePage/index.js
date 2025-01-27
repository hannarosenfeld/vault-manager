import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllFieldsThunk } from "../../store/field";
import { deleteWarehouseThunk } from "../../store/warehouse";
import { EditWarehouseModal } from "./editWarehouseModal";
import OpenModalButton from "../OpenModalButton";
import fieldGenerator from "./fieldGenerator"


export default function EditWarehousePage() {
    const dispatch = useDispatch();
    const { warehouseId } = useParams(); 
    const navigate = useNavigate();
    const warehouse = useSelector(state => state.warehouse[warehouseId])
    const allFields = useSelector((state) => state.field[warehouseId]);
    const [loadedWarehouseFields, setLoadedWarehouseFields] = useState(false);
    const [fields, setFields] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [show, setShow] = useState(false);

    // Delete Warehouse Modal
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const openDeleteModal = () => setIsDeleteModalOpen(true);
    const closeDeleteModal = () => setIsDeleteModalOpen(false);
    const confirmDelete = async () => {
      setIsDeleteModalOpen(false);
      // Perform delete action here
      await dispatch(deleteWarehouseThunk(warehouseId));
      navigate("/");
    };
  

    useEffect(() => {
        setFields(null);
        setLoadedWarehouseFields(false)
        const fields = dispatch(getAllFieldsThunk(warehouseId))

        Promise.all([fields])
            .then(() => setLoadedWarehouseFields(true))
            .catch(() => console.log("🚨 fields could not be loaded!"))
    }, [dispatch, warehouseId])

    useEffect(() => {
        let sortedFields;
        if (loadedWarehouseFields) {
            // setFields(Object.values(allFields).sort((a,b) => a.name - b.name))
            let fieldsArr = (Object.values(allFields))

            sortedFields = fieldsArr.sort(function (a, b) {
                // Split the field names into alphabetical and numeric parts
                const [, aAlpha, aNum] = a.name.match(/^([A-Za-z]+)(\d+)$/);
                const [, bAlpha, bNum] = b.name.match(/^([A-Za-z]+)(\d+)$/);
            
                // Compare alphabetical parts first
                if (aAlpha !== bAlpha) {
                    return aAlpha.localeCompare(bAlpha);
                }
                
                // If alphabetical parts are equal, compare numeric parts as numbers
                return parseInt(aNum) - parseInt(bNum);
            });
            
        }

        setFields(sortedFields)
    }, [loadedWarehouseFields, allFields])

    return (
        <div>
        <div style={{display: 'flex', alignItems: "column", height: "100%"}}>
        <div className="wrapper" style={{width: "100%",height: "100%", display: "flex", alignItems:"center", alignContent: "center",  flexDirection:"column", margin: "0 auto"}}>
            <div style={{display: "flex", width: "100%", margin: "0 auto", alignSelf: "center", marginTop: "1em", }}>
            <div className="leftButtons" style={{display: "flex", alignItems: "center", flexDirection:"column", margin: "auto"}}>
                <OpenModalButton 
                    buttonText={<span class="material-symbols-outlined">add</span>}
                    onItemClick={() => setIsModalOpen(false)}
                    modalComponent={<EditWarehouseModal dir="left" opperation="add" warehouseId={warehouseId} />}
                />
                <OpenModalButton 
                    buttonText={<span class="material-symbols-outlined">remove</span>}
                    onItemClick={() => setIsModalOpen(false)}
                    modalComponent={<EditWarehouseModal dir="left" opperation="subtract" warehouseId={warehouseId} />}
                />
            </div>

            {/* 🚨 I cannot figure out how to center the warehouse. there is always some space on the right 🚨 */}
            <div style={{width: "75%", display: "flex", alignItems: "center", alignContent: "center"}}>
                <div style={{width: "100%", margin: "0 auto", alignSelf: "center"}}>
                    {fields && warehouse ? fieldGenerator(fields, warehouse) : null}
                </div>
            </div>

            <div className="rightButtons" style={{display: "flex", alignItems: "center", flexDirection:"column", margin: "auto"}}>
                <OpenModalButton 
                    buttonText={<span class="material-symbols-outlined">add</span>}
                    onItemClick={() => setIsModalOpen(false)}
                    modalComponent={<EditWarehouseModal dir="right" opperation="add" warehouseId={warehouseId} />}
                />
                <OpenModalButton 
                    buttonText={<span class="material-symbols-outlined">remove</span>}
                    onItemClick={() => setIsModalOpen(false)}
                    modalComponent={<EditWarehouseModal dir="right" opperation="subtract" warehouseId={warehouseId} />}
                />
            </div>
            {/* <div style={{display: "flex", flexDirection: "column", width: "100%", alignItems: "center"}}> */}
            {/* {fields ? fieldGenerator(fields): null} */}
            
            {/* </div> */}
            </div>
            <div className="bottomButtons" style={{display: "flex", alignItems: "center", gap: '1em'}}>
                <OpenModalButton 
                    buttonText={<span class="material-symbols-outlined">add</span>}
                    onItemClick={() => setIsModalOpen(false)}
                    modalComponent={<EditWarehouseModal dir="bottom" opperation="add" warehouseId={warehouseId}/>}
                />
                <OpenModalButton 
                    buttonText={<span class="material-symbols-outlined">remove</span>}
                    onItemClick={() => setIsModalOpen(false)}
                    modalComponent={<EditWarehouseModal dir="bottom" opperation="subtract" warehouseId={warehouseId}/>}
                />
            </div>
            </div>          
        </div>
        <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100px",
      }}
    >
      <button
        onClick={openDeleteModal}
        style={{
          padding: "10px 20px",
          backgroundColor: "#f44336",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        DELETE
      </button>

      {isDeleteModalOpen && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: "1000",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              textAlign: "center",
            }}
          >
            <p>Are you sure you want to delete the warehouse?</p>
            <div style={{ marginTop: "20px" }}>
              <button
                onClick={confirmDelete}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#f44336",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  marginRight: "10px",
                  cursor: "pointer",
                }}
              >
                Yes
              </button>
              <button
                onClick={closeDeleteModal}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#ddd",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
        </div>
    )
}