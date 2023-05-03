import { Formik, Form, Field } from "formik";
export default function Login() {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-full lg:max-w-screen-sm bg-white p-4 rounded-lg shadow-lg">
        <h3 className="text-center font-bold text-6xl mb-12">Login</h3>
        <div>
          <Formik
            initialValues={{ firstName: "" }}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            <Form className="w-full flex flex-col gap-4">
            <label className="w-full">
                User name
                <Field
                  className="bg-gray-100 rounded-md px-3 py-2 outline-none w-full"
                  name="firstName"
                />
              </label>
              <label className="w-full">
                Password
                <Field
                  className="bg-gray-100 rounded-md px-3 py-2 outline-none w-full"
                  name="firstName"
                />
              </label>
              <div className="flex justify-end">
              <button type="submit" className="bg-blue-600 px-6 py-2 text-white rounded-lg">
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
