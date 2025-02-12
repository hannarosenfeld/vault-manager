export default function VaultInfo({ vault }) {
  return (
    <div className="flex gap-2 text-xs h-full items-center">
      <div>{vault.position}</div>
      <div className="flex gap-1">
        <div>{vault.customer_name}</div>
        <div>{vault.name}</div>
        <div className="font-semibold text-red-600">{vault.type}</div>
      </div>
    </div>
  );
}
