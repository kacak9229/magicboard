import { useState } from "react";
import { useS3Upload } from "next-s3-upload";
import {
  CheckIcon,
  HandThumbUpIcon,
  UserIcon,
  DocumentArrowUpIcon,
} from "@heroicons/react/20/solid";
import Modal from "../main/Modal";
import { trpc } from "../../utils/trpc";
import { formatDate } from "../../utils/date";
import SpinningCircle from "../SpinningCircle";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const eventTypes = {
  applied: { icon: UserIcon, bgColorClass: "bg-gray-400" },
  advanced: { icon: HandThumbUpIcon, bgColorClass: "bg-blue-500" },
  completed: { icon: CheckIcon, bgColorClass: "bg-green-500" },
};

const timeline = [
  {
    id: 1,
    type: eventTypes.applied,
    content: "Uploaded",
    target: "uber_logo.png",
    date: "Sep 20",
    datetime: "2020-09-20",
  },
];

interface Props {
  isBountyDone?: boolean;
  setShowAlert?: any;
  processing?: any;
  setProcessing?: any;
  hunterId?: any;
  mission: any;
  hunterName?: string;
  isHunter?: boolean;
  isPoster?: boolean;
  files?: any;
  onAcceptBounty?: () => void;
}

export default function Timeline({
  isBountyDone,
  setShowAlert,
  processing,
  setProcessing,
  hunterId,
  mission,
  hunterName,
  isHunter,
  isPoster,
  files,
  onAcceptBounty,
}: Props) {
  const [modal, setModal] = useState(false);

  const utils = trpc.useContext();

  const { uploadToS3 } = useS3Upload({ endpoint: "/api/files-bucket" });

  const uploadFile = trpc.hunter.uploadFile.useMutation({
    async onSuccess() {
      await utils.hunter.byFiles.invalidate();
      await utils.hunter.byMission.invalidate({
        hunterId: hunterId,
        bountyId: mission?.bounty.id,
      });
    },
  });

  const handleFileChange = async (e: any) => {
    setProcessing(true);
    const file = e.target.files[0];

    try {
      const { url } = await uploadToS3(file);

      const completeURL = url.replace(
        "https://magicboard-cloudfront-v1.s3.us-east-1.amazonaws.com/",
        "https://d715xmgfzhry2.cloudfront.net/"
      );

      const response = await uploadFile.mutateAsync({
        missionId: mission.id,
        hunterId: hunterId,
        fileName: file.name,
        fileUrl: completeURL,
      });

      if (response?.status) {
        setShowAlert(true);
        setProcessing(false);
        setTimeout(() => {
          setShowAlert(false);
        }, 5000);

        e.target.value = null;
      }
    } catch (err) {
      setProcessing(false);
      console.log(err);

      e.target.value = null;
    }
  };

  return (
    <section
      aria-labelledby="timeline-title"
      className="lg:col-span-1 lg:col-start-3"
    >
      <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
        <h2 id="timeline-title" className="text-lg font-medium text-gray-900">
          Timeline
        </h2>

        {/* Modal */}
        {modal && !isHunter ? (
          <Modal
            title={`Accept this ${hunterName} work?`}
            description={`Once you have accepted this work, other works from other hunters will be declined.`}
            onCancel={() => setModal(false)}
            onAccept={onAcceptBounty}
          />
        ) : (
          <></>
        )}

        {/* Activity Feed */}
        <div className="mt-6 flow-root">
          <ul role="list" className="-mb-8">
            {files?.map((file: any, fileIdx: number) => (
              <li key={file.id}>
                <div className="relative pb-8">
                  {fileIdx !== files.length - 1 ? (
                    <span
                      className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                      aria-hidden="true"
                    />
                  ) : null}
                  <div className="relative flex space-x-3">
                    <div>
                      <span
                        className={classNames(
                          "flex h-8 w-8 items-center justify-center rounded-full ring-8 ring-white"
                        )}
                      >
                        <DocumentArrowUpIcon />
                      </span>
                    </div>
                    <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                      <div>
                        <a
                          href={file.fileUrl}
                          className="border-b-2 border-indigo-600 text-indigo-600"
                        >
                          {file.fileName}
                        </a>
                      </div>
                      <div className="whitespace-nowrap text-right text-sm text-gray-500">
                        {/* <time dateTime={file.datetime}>{file.date}</time> */}
                        {formatDate(file.createdAt)}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="justify-stretch mt-6 flex flex-col">
          {" "}
          {isBountyDone ? (
            <></>
          ) : isPoster ? (
            <button
              onClick={() => setModal(true)}
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent  bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700 shadow-sm  hover:bg-indigo-200 focus:outline-none focus:ring-2
            focus:ring-indigo-500 focus:ring-offset-2"
            >
              Accept Bounty
            </button>
          ) : isHunter ? (
            <label htmlFor="file-upload">
              <span
                className="inline-flex w-full cursor-pointer items-center justify-center rounded-md border  border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700  shadow-sm hover:bg-indigo-200 focus:outline-none
            focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                {processing ? (
                  <>
                    <SpinningCircle />
                    <span>Uploading ....</span>
                  </>
                ) : (
                  <span>Upload Bounty</span>
                )}
              </span>

              <input
                id="file-upload"
                onChange={handleFileChange}
                name="file-upload"
                type="file"
                className="sr-only"
                disabled={processing}
              />
            </label>
          ) : (
            <></>
          )}
        </div>
      </div>
    </section>
  );
}
