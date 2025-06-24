
interface Props {
  value: string;
}

export default function DisplayMode({value}: Props) {
  return (
    <div className="min-h-[40px] px-3 py-2 border border-gray-200 rounded-md bg-gray-50 flex items-center">
      {value ? (
        <span className="text-gray-900">{value}</span>
      ) : (
        <span className="text-gray-400 italic">No selection made</span>
      )}
    </div>
  )
}