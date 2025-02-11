export const RackInfo = ({ selectedRack }) => {
  if (!selectedRack?.position) return null;

  return (
    <div className="flex">
      <div className="w-[75%]">
        {Array.from({ length: selectedRack.shelves }, (_, index) => (
          <div
            key={index}
            className={`h-min-[2em] flex justify-between items-center p-1 border-[var(--lightgrey)] 
              ${index === 0 ? "" : "border-t"} 
              ${index === selectedRack.shelves - 1 ? "" : "border-b"}`}
          >
            <span>{index + 1}</span>
          </div>
        ))}
      </div>
      <div className="w-[25%] border-l border-[var(--lightgrey)] flex items-center justify-center">
        <h2 className="font-light">{selectedRack.position}</h2>
      </div>
    </div>
  );
};

export default RackInfo;
