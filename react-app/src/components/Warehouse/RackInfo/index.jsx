export const RackInfo = ({ selectedRack }) => {
    if (!selectedRack?.position) return null;
  
    return (
      <div className="flex">
        <div className="border-t border-[var(--lightgrey)] w-[75%]">
          {Array.from({ length: selectedRack.shelves }, (_, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-1 border-b border-[var(--lightgrey)] last:border-b-0"
            >
              <span className="">{index + 1}</span>
            </div>
          ))}
        </div>
        <div className="w-[25%] border-l-1 border-[var(--lightgrey)] flex items-center justify-center">
          <h2 className="font-light">{selectedRack.position}</h2>
        </div>
      </div>
    );
  };
  
  export default RackInfo;
  