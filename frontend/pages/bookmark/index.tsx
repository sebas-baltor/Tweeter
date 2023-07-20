import Tweet from "@/components/Tweet";
import TweetFilter from "@/components/TweetFilter";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { RootState } from "@/lib/redux/store";
export default function Bookmark() {
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
          <TweetFilter/>
        </div>
        <div className="col-span-2">
          <Tweet/>
        </div>
      </div>
    </section>
  );
}
