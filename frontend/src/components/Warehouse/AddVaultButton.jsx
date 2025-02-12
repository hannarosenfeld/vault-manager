export default function AddVaultButton({ type }) {
  const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1);

  return (
    <div className="flex gap-2 text-xs h-full items-center">
      <button className="text-blue-500">+ Add {capitalizedType}</button>
    </div>
  );
}
