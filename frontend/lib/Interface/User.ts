export interface IUserCreate{
    name:string,
    bio:string,
    phone:string,
    email:string,
    password:string,
}
export interface IUserLogin{
    email:string,
    password:string
}