import Tweet from "@/components/Tweet";
import TweetFilter from "@/components/TweetFilter";
import { RootState } from "@/lib/redux/store";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { IoPersonAddSharp } from "react-icons/io5";
import { useSelector } from "react-redux";

export default function Profile() {
  let profile = useSelector((state: RootState) => state.profile);
  let token = Boolean(useSelector((state: RootState) => state.token));
  const router = useRouter();
  useEffect(() => {
    if (token == false) {
      router.push("/login");
    }
  }, []);
  return (
    <div>
      <section className="w-full h-[40vh] object-cover overflow-hidden">
        <img
          className="w-full h-full"
          src={`http://localhost:3001${profile.backgroundPath}`}
          alt="bg"
        />
      </section>
      <section className="w-full p-3 xl:max-w-[1280px] mx-auto -translate-y-[5vh]">
        <div className="px-4">
          <div className="p-4 bg-white rounded-lg shadow-lg flex flex-wrap md:flex-nowrap lg:flex-row gap-4 mb-6 justify-between">
            <div className="w-36 h-36 rounded-lg p-1 bg-white -translate-y-[30%]">
              <img
                className="w-full h-full rounded-lg  object-cover"
                src={`http://localhost:3001${profile.avatarPath}`}
                alt="profile photo"
              />
            </div>
            <button className="bg-blue-600 px-6 py-1 max-h-8 md:hidden text-white rounded-lg flex gap-1 items-center flex-nowrap">
              <IoPersonAddSharp />
              follow
            </button>
            <div className="flex-col w-full">
              <div className="flex justify-between gap-4">
                <div className="flex gap-3 items-center">
                  <h2 className="font-bold text-xl">{profile.name}</h2>
                  <p>
                    <span className="font-bold">2.666</span> following
                  </p>
                  <p>
                    <span className="font-bold">2.666</span> followers
                  </p>
                </div>
                <div>
                  <button className="hidden bg-blue-600 px-6 py-1  text-white rounded-lg md:flex gap-1 items-center flex-nowrap">
                    <IoPersonAddSharp />
                    follow
                  </button>
                </div>
              </div>
              <div className="text-xl w-full md:w-1/2">{profile.bio}</div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full px-4">
          <div className="flex flex-col gap-3">
            <TweetFilter />
          </div>
          <div className="flex flex-col gap-3 col-span-2 mb-24">
            <Tweet />
          </div>
        </div>
      </section>
    </div>
  );
}
