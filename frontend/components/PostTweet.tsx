import { BiImageAdd, BiWorld } from "react-icons/bi";
import { BsFillPeopleFill } from "react-icons/bs";
export default function PostTweet(){
    return(
        <div className="p-4 rounded-lg bg-white flex flex-col gap-3 shadow-lg">
              <span className="font-bold">Tweet something</span>
              <hr className="bg-gray-100" />
              <form className="w-full">
                <div className="flex">
                  <img
                    className="h-8 w-8 rounded-lg mr-2 block"
                    src="https://picsum.photos/id/1005/200"
                    alt="Profile"
                  />
                  <input
                    type="text"
                    placeholder="what's happening?"
                    className="w-full outline-none bg-transparent"
                  />
                </div>
                <div className="flex justify-between itmes-center">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="outline-none text-gray-300 hover:text-blue-500"
                    >
                      <BiImageAdd />
                    </button>

                    <div className="flex gap-1 flex-nowrap items-center outline-none text-gray-300 hover:text-blue-500 relative">
                      <BiWorld />
                      Everyone can replay
                      <div className="text-black absolute p-4 rounded-lg bg-white top-[100%] left-0 shadow-lg">
                        <span className="font-bold">Who can reply?</span>
                        <p className="md:whitespace-nowrap mb-3">Choose who can reply to this Tweet</p>

                        <label className="flex gap-4 flex-nowrap items-center px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-blue-600 rounded-md">
                          <BiWorld />
                          Everyone
                          <input type="radio" name="hola" hidden/>
                        </label>
                        <label className="flex gap-4 flex-nowrap items-center px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-blue-600 rounded-md whitespace-nowrap">
                          <BsFillPeopleFill />
                          People you follow
                          <input type="radio" name="hola" hidden/>
                        </label>
                      </div>
                    </div>
                  </div>
                  <button type="submit" className="bg-blue-600 px-6 py-1 text-white rounded-lg">
                    Tweet
                  </button>
                </div>
              </form>
            </div>
    )
}