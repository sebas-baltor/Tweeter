import { RootState } from "@/lib/redux/store";
import { BiImageAdd, BiWorld } from "react-icons/bi";
import { BsFillPeopleFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Field, Form, Formik } from "formik";
import Dropzone from "react-dropzone";
import { ITweetAssetPreview, ITweetCreate } from "@/lib/Interface/Tweet";
import * as Yup from "yup";
import { useState, useRef } from "react";
import Image from "next/image";
export default function PostTweet() {
  const profile = useSelector((state: RootState) => state.profile);
  const initialValues: ITweetCreate = {
    content: "",
    isRetweet: "0",
    originalTweetId: "",
    visibility: "1",
  };
  const [tweetAsset, setTweetAsset] = useState<ITweetAssetPreview>({
    url: "",
    asset: new Blob(),
  });
  const [replyValue, setReplyValue] = useState<1 | 0>(1);
  const replyBox = useRef<HTMLInputElement>(null);
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        console.log(values);
      }}
      validationSchema={Yup.object().shape({
        content: Yup.string().required("required"),
      })}
    >
      <div className="p-4 rounded-lg bg-white flex flex-col gap-3 shadow-lg">
        <span className="font-bold">Tweet something</span>
        <hr className="bg-gray-100" />
        <Form className="w-full">
          <div className="flex">
            <img
              className="h-8 w-8 rounded-lg mr-2 block"
              src={`http://localhost:3001${profile.avatarPath}`}
              alt="Profile"
            />
            <div className="flex flex-col gap-4 w-full">
              <Field
                type="text"
                placeholder="what's happening?"
                className="w-full outline-none bg-transparent"
                name="content"
              />
              {tweetAsset?.url !== "" ? (
                <div className="w-full h-64 relative bg-white rounded-md flex justify-center items-center">
                  <Image
                    src={tweetAsset?.url}
                    alt="profile photo"
                    className="w-full h-full object-cover rounded-md"
                    height={100}
                    width={100}
                  />
                </div>
              ) : (
                <></>
              )}
            </div>
            {/* <input
            type="text"
            placeholder="what's happening?"
            className="w-full outline-none bg-transparent"
          /> */}
          </div>
          <div className="flex justify-between itmes-center mt-3">
            <div className="flex gap-3">
              <Dropzone
                accept={{ "image/*": [".png", ".jpeg", ".jpg", ".svg"] }}
                multiple={false}
                onDrop={(acceptedFiles) => {
                  // url to preview a image
                  const objectUrl = URL.createObjectURL(acceptedFiles[0]);
                  // stored in state
                  setTweetAsset({
                    ...tweetAsset,
                    asset: acceptedFiles[0],
                    url: objectUrl,
                  });
                }}
              >
                {({ getRootProps, getInputProps }) => (
                  <section className="cursor-pointer flex items-center justify-center">
                    <div {...getRootProps()}>
                      <input {...getInputProps()} className="outline-none" />
                      <span className="outline-none text-gray-300 hover:text-blue-500 text-xl">
                        <BiImageAdd />
                      </span>
                    </div>
                  </section>
                )}
              </Dropzone>

              <div className="flex gap-1 flex-nowrap items-center outline-none text-gray-300 hover:text-blue-500 relative">
                <div
                  className="flex items-center gap-1"
                  onClick={() => {
                    replyBox.current?.classList.toggle("hidden");
                  }}
                >
                  <BiWorld />
                  {replyValue == 1 ? "Everyone" : "People you follow"} can reply
                </div>
                <div
                  className="hidden text-black absolute p-4 rounded-lg bg-white top-[100%] left-0 shadow-lg"
                  ref={replyBox}
                >
                  <span className="font-bold">Who can reply?</span>
                  <p className="md:whitespace-nowrap mb-3">
                    Choose who can reply to this Tweet
                  </p>

                  <label
                    className="flex gap-4 flex-nowrap items-center px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-blue-600 rounded-md"
                    onClick={() => {
                      replyBox.current?.classList.add("hidden")
                      setReplyValue(1);
                    }}
                  >
                    <BiWorld />
                    Everyone
                    <Field type="radio" name="visibility" value="1" hidden />
                    {/* <input type="radio" name="hola" hidden /> */}
                  </label>
                  <label
                    className="flex gap-4 flex-nowrap items-center px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-blue-600 rounded-md whitespace-nowrap"
                    onClick={() => {
                      replyBox.current?.classList.add("hidden")
                      setReplyValue(0);
                    }}
                  >
                    <BsFillPeopleFill />
                    People you follow
                    <Field type="radio" name="visibility" value="0" hidden />
                    {/* <input type="radio" name="hola" hidden /> */}
                  </label>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue-600 px-6 py-1 text-white rounded-lg"
            >
              Tweet
            </button>
          </div>
        </Form>
      </div>
    </Formik>
  );
}
