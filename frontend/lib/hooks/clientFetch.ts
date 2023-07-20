import { IUserLogin } from "../Interface/User";
const baseUrl = "http://localhost:3001";
export async function useCreateUser(data: FormData) {
  let res = await fetch(`${baseUrl}/users/create`, {
    method: "POST",
    body: data,
  });
  return res.json();
}
export async function useLogin(credentials: IUserLogin) {
  let res = await fetch(`${baseUrl}/auth/login`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(credentials),
  });
  return res.json();
}
export async function useProfile(token: string) {
  let res = await fetch(`${baseUrl}/users/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return res.json();
}
export async function usePostTweet(tweet: FormData, token:string) {
  let res = await fetch(`${baseUrl}/tweets/publish`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: tweet,
  });
  return res.json()
}
