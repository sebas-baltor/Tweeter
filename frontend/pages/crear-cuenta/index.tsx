import { Formik, Form, Field } from "formik";
export default function Login() {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-full lg:max-w-screen-sm bg-white p-4 rounded-lg shadow-lg">
        <h3 className="text-center font-bold text-6xl mb-12">Crear Cuenta</h3>
        <div>
          <Formik
            initialValues={{ firstName: "" }}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            <Form className="w-full flex flex-col gap-4">
              <label className="w-full">
                Nombre
                <Field
                  className="bg-gray-100 rounded-md px-3 py-2 outline-none w-full"
                  name="firstName"
                />
              </label>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}