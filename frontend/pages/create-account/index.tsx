import { Formik, Form, Field, ErrorMessage } from "formik";
import { IUserCreate } from "@/lib/Interface/User";
import { ICreateAccountImages } from "@/lib/Interface/Images";
import Dropzone from "react-dropzone";
import * as Yup from "yup";
import { AiFillCamera } from "react-icons/ai";
import { useState } from "react";
import Image from "next/image";
export default function Login() {
  // formik initial state
  const initialValues: IUserCreate = {
    name: "",
    bio: "",
    phone: "",
    email: "",
    password: "",
  };
  // preview string of the images
  const [preview, setPreview] = useState<ICreateAccountImages>({
    previewBackgroundPhoto: "",
    previewProfilePhoto: "",
    profilePhotoPath: "",
    backgroundPhotoPath: "",
  });
  return (
    <div className="min-h-screen flex justify-center items-center mx-4 my-20">
      <div className="w-full md:max-w-screen-sm lg:max-w-screen-md bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-center font-bold text-6xl mb-12">Create Account</h3>
        <div>
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => {
              console.log(values);
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string().required("required"),
              bio: Yup.string().required("required"),
              phone: Yup.string()
                .matches(
                  /^\+(?:[0-9]●?){6,14}$/gm,
                  "It must have this patron '+ lada number' with any space in between"
                )
                .min(6, "It must have 6 number and")
                .max(14, "It mustn't exceed 14 numbers")
                .required("required"),
              email: Yup.string()
                .matches(
                  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/,
                  "invalid email"
                )
                .required("required"),
              password: Yup.string()
                .min(8, "It must contain at least 8 characters")
                .required("required")
                .matches(
                  /^.*((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
                  "It must contain a number, a uppercase and a special character"
                ),
            })}
          >
            <Form className="w-full md:w-2/3 lg:w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="lg:col-span-2">
                Profile Photo
                <Dropzone
                  accept={{ "image/*": [".png", ".jpeg", ".jpg", ".svg"] }}
                  multiple={false}
                  onDrop={(acceptedFiles) => {
                    // url to preview a image
                    const objectUrl = URL.createObjectURL(acceptedFiles[0]);
                    // stored in state
                    setPreview({
                      ...preview,
                      previewProfilePhoto: objectUrl,
                      profilePhotoPath: acceptedFiles[0].name,
                    });
                  }}
                >
                  {({ getRootProps, getInputProps }) => (
                    <section className="bg-blue-50 rounded-md px-3 py-2 outline-none w-full border-blue-600 border-2 text-blue-600 border-dotted cursor-pointer overflow-hidden">
                      <div
                        {...getRootProps()}
                        className="flex gap-4 items-center"
                      >
                        <div className="w-36 h-24 relative bg-white rounded-md flex justify-center items-center">
                          {preview.previewProfilePhoto !== "" ? (
                            <Image
                              src={preview.previewProfilePhoto}
                              alt="profile photo"
                              className="w-full h-full object-cover rounded-md"
                              height={100}
                              width={100}
                            />
                          ) : (
                            <></>
                          )}
                          <AiFillCamera className="text-6xl opacity-30 absolute" />
                        </div>
                        <input {...getInputProps()} className="outline-none" />
                        <p className="text-center w-full">
                          Click or drop the file to update you profile photo
                        </p>
                      </div>
                    </section>
                  )}
                </Dropzone>
              </div>
              <label>
                Name
                <Field
                  className="bg-blue-50 rounded-md px-3 py-2 outline-none w-full border-blue-600 focus:border-2 text-blue-600"
                  name="name"
                />
                <span className="text-red-500 text-xs">
                  <ErrorMessage name="name" />
                </span>
              </label>
              <label className="lg:col-span-2 lg:row-start-4">
                Bio
                <Field
                  className=" bg-blue-50 rounded-md px-3 py-2 outline-none w-full border-blue-600 focus:border-2 text-blue-600"
                  name="bio"
                  as="textarea"
                />
                <span className="text-red-500 text-xs">
                  <ErrorMessage name="bio" />
                </span>
              </label>
              <label>
                Phone
                <Field
                  className="bg-blue-50 rounded-md px-3 py-2 outline-none w-full border-blue-600 focus:border-2 text-blue-600"
                  name="phone"
                />
                <span className="text-red-500 text-xs">
                  <ErrorMessage name="phone" />
                </span>
              </label>
              <label>
                Email
                <Field
                  className="bg-blue-50 rounded-md px-3 py-2 outline-none w-full border-blue-600 focus:border-2 text-blue-600"
                  name="email"
                />
                <span className="text-red-500 text-xs">
                  <ErrorMessage name="email" />
                </span>
              </label>
              <label>
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
              <div className="lg:col-span-2">
                Background Photo
                <Dropzone
                  accept={{ "image/*": [".png", ".jpeg", ".jpg", ".svg"] }}
                  multiple={false}
                  onDrop={(acceptedFiles) => {
                    const objectUrl = URL.createObjectURL(acceptedFiles[0]);

                    setPreview({
                      ...preview,
                      previewBackgroundPhoto: objectUrl,
                      backgroundPhotoPath: acceptedFiles[0].name,
                    });
                  }}
                >
                  {({ getRootProps, getInputProps }) => (
                    <section className="bg-blue-50 rounded-md px-3 py-2 outline-none w-full border-blue-600 border-2 text-blue-600 border-dotted cursor-pointer overflow-hidden">
                      <div
                        {...getRootProps()}
                        className="flex flex-col gap-4 items-center"
                      >
                        <div className="w-full h-24 bg-white rounded-md flex justify-center items-center">
                          {preview.previewBackgroundPhoto !== "" ? (
                            <Image
                              src={preview.previewBackgroundPhoto}
                              alt="background photo"
                              className="w-full h-full object-cover rounded-md"
                              height={100}
                              width={100}
                            />
                          ) : (
                            <></>
                          )}
                          <AiFillCamera className="text-6xl opacity-30 absolute" />
                        </div>
                        <input {...getInputProps()} className="outline-none" />
                        <p className="text-center">
                          Click or drop the file to update you background photo
                        </p>
                      </div>
                    </section>
                  )}
                </Dropzone>
              </div>
              <div className="flex justify-between items-center gap-4 mt-4 lg:col-span-2">
                <a href="/login" className="text-blue-600">
                  Do you have an account?
                </a>

                <button
                  type="submit"
                  className="bg-blue-600 px-6 py-2 text-white rounded-lg"
                >
                  Create
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}
