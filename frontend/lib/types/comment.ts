export type Comment = {
    _id:string;
    comment:string;
    tweet:string;
    publishDate:Date;
    figurePath:string
    isReplied:number;
    replies:Array<string>;
    user:string;
}