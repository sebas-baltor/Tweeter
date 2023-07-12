import Tweet from "@/components/Tweet";
import TweetFilter from "@/components/TweetFilter";
export default function Bookmark() {
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
