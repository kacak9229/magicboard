import React, { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import RichTextEditor from "../../components/RichText";
import styled from "@emotion/styled";
import Layout from "../../components/main/Layout";
import SpinningCircle from "../../components/SpinningCircle";
import { useS3Upload } from "next-s3-upload";
import { trpc } from "../../utils/trpc";
import { inferProcedureInput } from "@trpc/server";
import { AppRouter } from "../../server/trpc/router/_app";
import { getSession, useSession } from "next-auth/react";
import Router from "next/router";

import "react-datepicker/dist/react-datepicker.css";
import WarningAlert from "../../components/WarningAlert";

const StyledRichTextEditor = styled(RichTextEditor)`
  & .mantine-RichTextEditor-toolbar {
    z-index: 0;
  }
`;

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/sign-in",
        permanent: false,
      },
    };
  }

  return {
    props: { getSessionv1: session },
  };
}

export default function NewBounty() {
  // const utils = trpc.useContext();
  const [message, setMessage] = useState("");
  const [alert, setAlert] = useState(false);
  const { data: session } = useSession();
  const [processing, setProcessing] = useState(false);
  const [imageProcessing, setImageProcessing] = useState(false);
  const [richTextValue, setRichTextValue] = useState(
    "<p>Write your requirements</p>"
  );
  const [startDate, setStartDate] = useState(new Date());
  const [coverPhoto, setCoverPhoto] = useState("");
  const { register, handleSubmit } = useForm();
  const { uploadToS3 } = useS3Upload({ endpoint: "/api/photos-bucket" });

  const addBounty = trpc.bounty.add.useMutation();
  const categoriesQuery = trpc.category.list.useQuery();

  // This is for rich text editor
  const handleImageUpload = useCallback(
    (file: File): Promise<string> =>
      new Promise((resolve, reject) => {
        uploadToS3(file)
          .then((result) => {
            const completeURL = result.url.replace(
              "https://magicboard-bounty-cover-photo.s3.us-east-1.amazonaws.com/",
              "https://dwq1wt0bhhx6n.cloudfront.net/"
            );
            resolve(completeURL);
          })
          .catch(() => reject(new Error("Upload failed")));
      }),
    []
  );

  const handleFileChange = async (e: any) => {
    setImageProcessing(true);
    const file = e.target.files[0];

    try {
      const { url } = await uploadToS3(file);

      const completeURL = url.replace(
        "https://magicboard-bounty-cover-photo.s3.us-east-1.amazonaws.com/",
        "https://dwq1wt0bhhx6n.cloudfront.net/"
      );

      setCoverPhoto(completeURL);
      setImageProcessing(false);
    } catch (err) {
      setImageProcessing(false);
      console.log(err);
    }
  };

  const onSubmit = async (data: any) => {
    setProcessing(true);
    type Input = inferProcedureInput<AppRouter["bounty"]["add"]>;

    if (!coverPhoto) {
      setMessage("Upload a cover photo");
      setAlert(true);
      setProcessing(false);

      return;
    }

    try {
      const input: Input = {
        title: data.title,
        dateline: startDate,
        price: Number(data.price),
        requirement: richTextValue,
        categoryId: data.category,
        coverPhoto: coverPhoto,
        maxHunters: Number(data.maxHunters),
        userId: session?.user?.id,
      };

      const newBounty = await addBounty.mutateAsync(input);

      if (newBounty) {
        setProcessing(false);
        Router.push(`/bounties/${newBounty.id}/checkout`);
      }
    } catch (err) {
      setProcessing(false);
      console.error({ err }, "Failed to add bounty");
    }
  };

  return (
    <Layout>
      <div className="">
        <div className="mt-20 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block xl:inline">Post your</span>{" "}
            <span className="block text-indigo-600 xl:inline">Bounty</span>
          </h1>
        </div>
        <div className="mx-auto max-w-3xl py-10 px-4 sm:px-6 lg:py-12 lg:px-8">
          {alert ? <WarningAlert message={message} /> : <></>}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-3 space-y-8 divide-y divide-gray-200"
          >
            <div className="space-y-8 divide-y divide-gray-200">
              <div>
                <div>
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Bounty
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    This information will be displayed publicly once you post
                  </p>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-4">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Title
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <input
                        type="text"
                        id="username"
                        {...register("title", { required: true })}
                        className="block w-full min-w-0 flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="about"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Dateline
                    </label>
                    <DatePicker
                      selected={startDate}
                      onChange={(date: Date) => setStartDate(date)}
                      className="z-auto mt-1 w-full rounded-md border border-slate-300 text-sm sm:col-span-3"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="price"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Price
                    </label>
                    <div className="relative mt-1 rounded-md shadow-sm">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <span className="text-gray-500 sm:text-sm">$</span>
                      </div>
                      <input
                        type="text"
                        {...register("price", { required: true })}
                        id="price"
                        className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="0.00"
                        aria-describedby="price-currency"
                      />
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        <span
                          className="text-gray-500 sm:text-sm"
                          id="price-currency"
                        >
                          USD
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="category"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Category
                    </label>
                    <select
                      id="category"
                      {...register("category", { required: true })}
                      className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    >
                      <option>Choose Category</option>
                      {categoriesQuery.data?.map((category: any) => (
                        <option key={category.id} value={category.id}>
                          {category.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="category"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Hunters
                    </label>
                    <select
                      id="category"
                      {...register("maxHunters", { required: true })}
                      className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    >
                      <option>Number of Hunters</option>
                      {[1, 2, 3, 4, 5].map((numOfHunters: any) => (
                        <option key={numOfHunters} value={numOfHunters}>
                          {numOfHunters}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-6">
                    <label
                      htmlFor="about"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Requirement
                    </label>
                    <div className="mt-1">
                      <StyledRichTextEditor
                        id="rte"
                        value={richTextValue}
                        onChange={setRichTextValue}
                        onImageUpload={handleImageUpload}
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Write a few sentences about your bounty requirement.
                    </p>
                  </div>

                  <div className="sm:col-span-6">
                    <label
                      htmlFor="cover-photo"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Cover photo
                    </label>
                    <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                      {coverPhoto ? (
                        <img src={coverPhoto} />
                      ) : imageProcessing ? (
                        <SpinningCircle fillColor="fill-indigo-300" />
                      ) : (
                        <div className="space-y-1 text-center">
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                            >
                              <span>Upload a file</span>

                              <input
                                id="file-upload"
                                onChange={handleFileChange}
                                name="file-upload"
                                type="file"
                                className="sr-only"
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-5">
              <div className="flex justify-end">
                {/* <button
                  type="button"
                  className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Cancel
                </button> */}
                <button
                  type="submit"
                  className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  disabled={processing}
                >
                  {processing ? <SpinningCircle /> : <></>}
                  Next
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
