import PostTweet from '@/components/PostTweet';
import Tweet from '@/components/Tweet';
import Trending from '@/components/Trending';
import FollowRecomendation from '@/components/FollowRecomendation';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/redux/store';

export default function Home() {
  let token = Boolean(useSelector((state: RootState) => state.token));
  const router = useRouter();
  useEffect(()=>{
    if(token == false){
      router.push("/login")
    }
  },[])
  return (
    <>
      <section className="w-full p-3 xl:max-w-[1280px] mx-auto -translate-y-[5vh] my-28 mx-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 w-full px-4">
          <div className="flex flex-col gap-3 col-span-2 row-start-2 lg:row-start-1">
            <PostTweet/>
            <Tweet />
          </div>
          <div className="flex flex-col gap-3 row-start-1">
            <Trending/>
            <FollowRecomendation/>
          </div>
        </div>
      </section>
    </>
  );
}
