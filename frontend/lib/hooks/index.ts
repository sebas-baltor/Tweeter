import { useSelector } from "react-redux/es/hooks/useSelector";
import { useRouter } from "next/router";
import { RootState } from "../redux/store";
export function IsUserLogged(): Boolean {
  //   const router = useRouter();
  let user = Boolean(useSelector((state: RootState) => state.profile));
  let token = Boolean(useSelector((state: RootState) => state.token));
  //   if (user == false || token == false) {
  //     router.push("/login");
  //   }
  return user == false || token == false ? false : true;
}
