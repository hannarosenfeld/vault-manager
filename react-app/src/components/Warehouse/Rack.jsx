import { setSelectedRackAction } from "../../store/rack";
import { setSelectedFieldAction } from "../../store/field";
import { useDispatch } from "react-redux";


export default function Rack({ racksArr }) {
  const dispatch = useDispatch();
  
  const handleRackClick = (racksArr) => {
    const rack = racksArr?.find((rack) => rack.position === "3-1");
    dispatch(setSelectedRackAction(rack));
    dispatch(setSelectedFieldAction(null));
  }

  return (
    <>
      <div
        className="box w-[2em] h-[2em] bg-gray-300 flex"
        onClick={() => handleRackClick(racksArr)}
        >
        <div className="m-auto text-xs">3-1</div>
      </div>
      <div className="box w-[2em] h-[2em] bg-gray-300 flex">
        <div className="m-auto text-xs">3-2</div>
      </div>
    </>
  );
}
