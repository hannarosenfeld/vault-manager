function WarehouseStatsPage({ warehouse }) {
  const warehouseName = warehouse.name;
  const warehouseFields = Object.values(warehouse.fields);
  const warehouseVaults = warehouseFields.filter(field => Object.keys(field.vaults).length);
  const warehouseVaultsArr = warehouseVaults.flatMap(field => Object.values(field.vaults));

  const numberOfPotentialSpaces = warehouseFields.length * 4; // Assuming each field can have 4 vaults
  const numberOfAllVaults = warehouseVaultsArr.length;
  const numberOfEmptyVaults = warehouseVaultsArr.filter(vault => vault.customer_name === "EMPTY").length;

  console.log("🍓 warehouseVaultsArr", warehouseVaultsArr);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{warehouseName}</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left">Metric</th>
            <th className="py-2 px-4 border-b">Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-2 px-4 border-b text-left">Number of Potential Spaces</td>
            <td className="py-2 px-4 border-b">{numberOfPotentialSpaces}</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b text-left">Number of All Vaults</td>
            <td className="py-2 px-4 border-b">{numberOfAllVaults}</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b text-left">Number of Empty Vaults</td>
            <td className="py-2 px-4 border-b">{numberOfEmptyVaults}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default WarehouseStatsPage;