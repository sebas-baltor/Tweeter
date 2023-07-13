export type Tweet = {
  _id: string;
  from: string;
  publishDate: Date;
  content: string;
  likes: Array<string>;
  imgPath: string;
  isRetweet: number;
  originalTweet?: Tweet;
  retweetsNumber: number;
};
