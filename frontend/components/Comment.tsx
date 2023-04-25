import { AiOutlineHeart } from "react-icons/ai";
export default function Comment() {
  return (
    <div className="flex">
      <img
        className="h-8 w-8 rounded-lg mr-2 block"
        src="https://picsum.photos/id/1005/200"
        alt="Profile"
      />
      <div>
        <div className="bg-gray-100 rounded-lg w-full p-2">
          <div>
            <span className="font-bold text-md">Name</span>{" "}
            <span className="text-gray-300 text-xs">26 agosto at 20:46</span>
          </div>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium ad soluta voluptate, autem aperiam officiis maiores ipsam suscipit, ducimus nostrum natus repudiandae aut illum accusantium dolor deserunt voluptas optio quis.</p>
        </div>
        <div className="flex gap-3">
          <button className="text-gray-300 text-xs flex gap-1 items-center hover:text-red-500">
            <AiOutlineHeart />
            Like
          </button>
          <span className="text-gray-300 text-xs">12k likes</span>
        </div>
      </div>
    </div>
  );
}
