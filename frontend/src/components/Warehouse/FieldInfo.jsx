export default function FieldInfo({ field }) {
  return (
    <div className="h-[90%] grid grid-cols-[65%_35%]">
      <div className="grid grid-rows-3 border-r-1 border-gray-300">
        <div className="border-b-1 border-gray-300 p-2">hi</div>
        <div className="border-b-1 border-gray-300 p-2">hi</div>
        <div className="p-2">hi</div>
      </div>
      <div className="flex font-semibold text-3xl items-center justify-center p-2">{field.name}</div>
    </div>
  );
}
