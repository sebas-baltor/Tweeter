export interface ITweetCreate {
    [visibility:string]:string;
    content:string;
    isRetweet:string;
    originalTweetId:string;
}
export interface ITweetAssetPreview{
    asset:Blob;
    url:string;
}