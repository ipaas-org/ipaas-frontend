export default function Tooltip({message, children}) {
  return (
    <div class="group relative flex">
      {children}
      <span class="bg-gray-800 absolute top-10 z-50 scale-0 rounded p-2 text-xs text-black transition-all group-hover:scale-100">
        {message}
      </span>
    </div>
  );
}
