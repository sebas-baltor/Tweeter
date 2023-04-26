import Comment from "@/components/Comment";
import { RiMessage3Line } from "react-icons/ri";
import {
  AiOutlineRetweet,
  AiOutlineHeart,
  AiOutlineSend,
} from "react-icons/ai";
import { BiImageAdd } from "react-icons/bi";
import { BiBookmark } from "react-icons/bi";
export default function Tweet() {
  return (
    <div className="flex flex-col items-center min-h-screen">
      <div className="w-full">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <img
                  className="h-8 w-8 rounded-lg mr-2"
                  src="https://picsum.photos/id/1005/200"
                  alt="Profile"
                />
                <span className="text-sm text-gray-600 font-semibold flex flex-col">
                  John Doe
                  <span className="text-gray-300 text-xs">
                    26 afousto at 20:46
                  </span>
                </span>
              </div>
            </div>
            <div className="mt-4">
              <p className="mt-2 text-gray-600">
                Nulla facilisi. In consequat massa quis enim ornare auctor.
                Fusce tincidunt in leo eget mattis. Donec at mi eu ligula
                sollicitudin auctor. Aliquam erat volutpat.
              </p>
              <div className="mt-4">
                <img
                  className="w-full object-cover rounded-lg"
                  src="https://picsum.photos/id/1011/600/400"
                  alt="Tweet"
                />
                <div className="flex justify-end gap-3 mt-3 text-xs">
                  <span className="text-gray-300">449 Comments</span>
                  <span className="text-gray-300">49k Retweets</span>
                  <span className="text-gray-300">224 saved</span>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <hr className="bg-gray-300 mb-1" />
              <div className="flex justify-between items-center">
                <button className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md flex gap-2 items-center">
                  <RiMessage3Line />
                  <span className="hidden md:block">Comment</span>
                </button>
                <button className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md flex gap-2 items-center hover:text-green-500">
                  <AiOutlineRetweet />
                  <span className="hidden md:block">Retweets</span>
                </button>
                <button className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md flex gap-2 items-center hover:text-red-500">
                  <AiOutlineHeart />
                  <span className="hidden md:block">Likes</span>
                </button>
                <button className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md flex gap-2 items-center hover:text-blue-500">
                  <BiBookmark />
                  <span className="hidden md:block">Saved</span>
                </button>
              </div>
              <hr className="bg-gray-300 mt-1" />
            </div>
            <div className="mt-4 flex gap-3">
              <img
                className="h-8 w-8 rounded-lg mr-2 block"
                src="https://picsum.photos/id/1005/200"
                alt="Profile"
              />
              <form className=" flex gap-3 w-full ">
                <div className="w-full bg-gray-100 rounded-lg flex items-center justify-between px-2 text-gray-400">
                  <input
                  placeholder="Tweet you reply"
                    type="text"
                    className="outline-none bg-transparent  w-[90%]"
                  />
                  <BiImageAdd />
                </div>
                <button className="bg-blue-600 p-2 text-white rounded-lg flex items-center justify-center">
                  <AiOutlineSend />
                </button>
              </form>
            </div>

            <div className="mt-4">
              <hr className="bg-gray-300 mb-4"/>
              <div className="flex flex-col gap-3">
                <Comment/>
                <Comment/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
