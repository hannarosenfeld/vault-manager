import { useSelector } from 'react-redux';

export default function Stage() {
  const stagedVaults = useSelector((state) => state.stage.stagedVaults);

  return (
    <div
      className="max-w-3xl mx-auto border-8 border-solid border-yellow-500 p-5"
      style={{
        borderImage: "repeating-linear-gradient(-55deg, #000, #000 20px, #ffb101 20px, #ffb101 40px) 10",
      }}
    >
      <h1 className="text-2xl font-bold mb-4">Staged Vaults</h1>
      {Object.keys(stagedVaults).length === 0 ? (
        <p className="text-gray-500">No staged vaults available.</p>
      ) : (
        <div className="flex flex-wrap gap-4">
          {Object.values(stagedVaults).map((vault) => (
            <div
              key={vault.id}
              className="flex flex-col justify-center items-center p-2 border-2 border-gray-800 rounded shadow cursor-pointer hover:bg-gray-100 bg-yellow-500 w-[calc(33.333%-1rem)]"
            >
              <h2 className="text-xs font-semibold">#{vault.id}</h2>
              <p className="text-xs text-gray-700 text-center">{vault.customer_name}</p>
              {vault.order_name && (
                <p className="text-xs text-gray-700 text-center">[{vault.order_name}]</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}