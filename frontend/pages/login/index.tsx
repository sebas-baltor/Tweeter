import { Formik, Form, Field, ErrorMessage } from "formik";
import { IUserLogin } from "@/lib/Interface/User";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { useLogin, useProfile } from "@/lib/hooks/clientFetch";
import { setToken, setUser } from "@/lib/redux/slice";

export default function Login() {
  let dispatch = useDispatch();
  let token = Boolean(useSelector((state: RootState) => state.token));
  const router = useRouter();
  useEffect(() => {
    if (token == true) {
      router.push("/");
    }
  }, []);
  // formik initial state
  const initialValues: IUserLogin = {
    email: "",
    password: "",
  };

  return (
    <div className="min-h-screen flex justify-center items-center mx-4 my-16">
      <div className="w-full md:max-w-[500px] bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-center font-bold text-6xl mb-12">Login</h3>
        <div>
          <Formik
            initialValues={initialValues}
            onSubmit={async (values, { resetForm }) => {
              let {access_token} = await useLogin(values);
              let profile = await useProfile(access_token);
              console.log(profile);
              if (access_token && profile.error != "") {
                dispatch(setToken(access_token));
                dispatch(setUser(profile));
                resetForm();
                router.push("/");
              }
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .matches(
                  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/,
                  "invalid email"
                )
                .required("required"),
              password: Yup.string()
                .min(8, "It must contain at least 8 characters")
                .required("required"),
            })}
          >
            <Form className="w-full flex flex-col gap-4">
              <label className="w-full">
                Email
                <Field
                  className="bg-blue-50 rounded-md px-3 py-2 outline-none w-full border-blue-600 focus:border-2 text-blue-600"
                  name="email"
                />
                <span className="text-red-500 text-xs">
                  <ErrorMessage name="email" />
                </span>
              </label>
              <label className="w-full">
                Password
                <Field
                  className="bg-blue-50 rounded-md px-3 py-2 outline-none w-full border-blue-600 focus:border-2 text-blue-600"
                  name="password"
                  type="password"
                />
                <span className="text-red-500 text-xs">
                  <ErrorMessage name="password" />
                </span>
              </label>
              <div className="flex justify-between items-center w-full mt-4 gap-4">
                <a href="/create-account" className="text-blue-600">
                  Do you want to create an account?
                </a>
                <button
                  type="submit"
                  className="bg-blue-600 px-6 py-2 text-white rounded-lg"
                >
                  Login
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}
