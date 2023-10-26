import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFieldThunk } from "../../store/field";

const AddVaultButton = ({ field, position, handleOpenModal }) => {
  const dispatch = useDispatch();
  const fieldState = useSelector(state => state.field.fields);

  // console.log("🍧", field)
  // useEffect(() => {
  //   dispatch(getFieldThunk(field.id));
  // }, [dispatch])

    return (
      <div className="add-vault-button" onClick={() => handleOpenModal(position)}>
        <i className="fa-solid fa-plus" />
        <span> Add Vault</span>
      </div>
    );
  };
  
  export default AddVaultButton;