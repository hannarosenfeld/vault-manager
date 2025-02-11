import { useState, useEffect } from "react";
import { setSelectedRackAction } from "../../store/rack";
import { setSelectedFieldAction } from "../../store/field";
import { useDispatch } from "react-redux";

export default function Rack({ racksArr, wallSide }) {
  const dispatch = useDispatch();
  const [wallSideRacks, setWallSideRacks] = useState([]);

  useEffect(() => {
    const filteredRacks = racksArr.filter((rack) => rack.wall_side === wallSide);
    setWallSideRacks(filteredRacks);
  }, [racksArr, wallSide]);

  const handleRackClick = (rack) => {
    dispatch(setSelectedRackAction(rack));
    dispatch(setSelectedFieldAction(null));
  };

  return (
    <>
      {wallSideRacks.map((rack) => (
        <div
          key={rack.id}
          className="box w-[2em] h-[2em] bg-gray-300 flex"
          onClick={() => handleRackClick(rack)} 
        >
          <div className="m-auto text-xs">{rack.position}</div>
        </div>
      ))}
    </>
  );
}
