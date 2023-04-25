export default function TweetFilter() {
  return (
    <div className="bg-white p-4 rounded-lg flex flex-col gap-2 overflow-hidden">
     <button className="group px-4 py-2 text-gray-700 rounded-md">
        <div className="relative group-hover:text-blue-500 text-left">
          Tweets
          <span className="w-6 h-full rounded-sm bg-blue-500 absolute left-0 -translate-x-[212%] opacity-0 group-hover:opacity-100"></span>
        </div>
      </button>
      <button className="group px-4 py-2 text-gray-700 rounded-md">
        <div className="relative group-hover:text-blue-500 text-left">
          Tweets & replies
          <span className="w-6 h-full rounded-sm bg-blue-500 absolute left-0 -translate-x-[212%] opacity-0 group-hover:opacity-100"></span>
        </div>
      </button>
      <button className="group px-4 py-2 text-gray-700 rounded-md">
        <div className="relative group-hover:text-blue-500 text-left">
          Media
          <span className="w-6 h-full rounded-sm bg-blue-500 absolute left-0 -translate-x-[212%] opacity-0 group-hover:opacity-100"></span>
        </div>
      </button>
      <button className="group px-4 py-2 text-gray-700 rounded-md">
        <div className="relative group-hover:text-blue-500 text-left">
          Likes
          <span className="w-6 h-full rounded-sm bg-blue-500 absolute left-0 -translate-x-[212%] opacity-0 group-hover:opacity-100"></span>
        </div>
      </button>
    </div>
  );
}
