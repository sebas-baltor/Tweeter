import Image from 'next/image'
import { Inter } from 'next/font/google'
import PostTweet from '@/components/PostTweet';
import Tweet from '@/components/Tweet';
import Trending from '@/components/Trending';
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <section className="w-full p-3 xl:max-w-[1280px] mx-auto -translate-y-[5vh] my-28 mx-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 w-full ">
          <div className="flex flex-col gap-3 col-span-2">
            <PostTweet/>
            <Tweet />
          </div>
          <div className="flex flex-col gap-3">
            <Trending/>
            <div>who is follow you</div>
          </div>
        </div>
      </section>
    </>
  );
}
