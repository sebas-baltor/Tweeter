import { AiOutlineSearch } from "react-icons/ai";
import { IoPersonAddSharp } from "react-icons/io5";
import Tweet from "@/components/Tweet";
import ExploreFilter from "@/components/ExploreFilter";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
export default function Explore() {
  let token = Boolean(useSelector((state: RootState) => state.token));
  const router = useRouter();
  useEffect(()=>{
    if(token == false){
      router.push("/login")
    }
  },[])
  return (
    <section className="w-full p-3 xl:max-w-[1280px] mx-auto -translate-y-[5vh] my-28 mx-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 w-full px-4">
        <div>
          <ExploreFilter />
        </div>
        <div className="col-span-2 flex flex-col gap-3">
          <form className="flex p-3 bg-white rounded-lg shadow-lg gap-3 items-center">
            <label className="relative rounded-md w-full">
              <AiOutlineSearch className="absolute inset-y-1/2 -translate-y-1/2 left-2 text-gray-500 " />
              <input placeholder="Search" type="text" className="outline-none w-full pl-4 py-1 pl-8 text-gray-500 rounded-md hover:bg-gray-100 focus:bg-gray-100"/>
            </label>
              <button className="bg-blue-600 px-6 py-1 text-white rounded-lg">
                Search
              </button>
          </form>
          <Tweet />
        </div>
      </div>
    </section>
  );
}
