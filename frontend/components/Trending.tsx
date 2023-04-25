export default function Trending() {
  return (
    <div className="p-4 rounded-lg bg-white flex flex-col gap-3">
      <span className="font-bold">Trends for you</span>
      <hr className="bg-gray-100" />
      <div className="flex flex-col gap-2">
        <button className="px-4 py-2 text-gray-700 rounded-md text-start hover:bg-gray-100">
          <div className="hover:text-blue-500 text-left font-bold">#programming</div>
          <span className="text-sm">213k Tweets</span>
        </button>
        <button className="px-4 py-2 text-gray-700 rounded-md text-start hover:bg-gray-100">
          <div className="hover:text-blue-500 text-left font-bold">#programming</div>
          <span className="text-sm">213k Tweets</span>
        </button>
        <button className="px-4 py-2 text-gray-700 rounded-md text-start hover:bg-gray-100">
          <div className="hover:text-blue-500 text-left font-bold">#programming</div>
          <span className="text-sm">213k Tweets</span>
        </button>
      </div>
    </div>
  );
}
