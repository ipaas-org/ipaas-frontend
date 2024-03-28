import { getAccessToken } from "../../utils/tokens";
import { API } from "../../utils/api";
import { useMemo, useState } from "react";
import LogModal from "./LogModal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpdateApplicationModal from "./UpdateApplicationModal";

const successToastOptions = (message) => {
  return {
    render: message,
    type: "success",
    autoClose: 3000,
    closeButton: true,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    isLoading: false,
  };
};

const errorToastOptions = (message) => {
  return {
    render: message,
    type: "error",
    autoClose: 5000,
    closeButton: true,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    isLoading: false,
    draggable: true,
  };
};

const ApplicationItem = function ({ application }) {
  const { name, dnsName, state, id } = application;
  const [showLogModal, setShowLogModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const handleopen = function (e) {
    if (e.target === e.currentTarget) {
      console.log("dnsname", dnsName);
      window.open("https://" + dnsName, "_blank");
    }
  };

  function handleLogModal(e) {
    e.stopPropagation();
    setShowLogModal(true);
  }

  function rolloutApplication(e) {
    const toastId = toast.loading("Rolling update...");

    const accessToken = getAccessToken();
    if (!accessToken) {
      toast.update(toastId, errorToastOptions("error getting access token"));
      return;
    }
    console.log("rolling out application: " + id);

    API.get("application/" + id + "/rollout", {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((response) => {
        console.log("response", response);
        toast.update(
          toastId,
          successToastOptions("application updated correctly")
        );
      })
      .catch((error) => {
        console.log("error rolling update", error);
        var message = `error rolling update:
        ${error.response.data.details}`;
        toast.update(toastId, errorToastOptions(message));
      });
    e.stopPropagation();
  }

  function deleteApplication(e) {
    const toastId = toast.loading("Deleting application...");

    const accessToken = getAccessToken();
    console.log("deleting application: " + id);

    API.delete("application/" + id + "/delete", {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((response) => {
        console.log("response", response);
        toast.update(toastId, successToastOptions("application deleted"));
      })
      .catch((error) => {
        console.log("error deleting application", error);
        var msg = `error deleting application: 
        ${error.response.data.details}`;
        toast.update(toastId, errorToastOptions(msg));
      });
    e.stopPropagation();
  }

  return (
    <div
      // onClick={handleopen}
      // target="_blank"
      className="grid grid-cols-4 px-8 py-6 transition-all"
    >
      <div className="col-span-3">
        <div className="flex items-center">
          {state === "pending" && (
            <div className="mr-2 rounded bg-zinc-400 px-2 text-sm font-medium text-white">
              pending...
            </div>
          )}
          {state === "rollingOut" && (
            <div className="mr-2 rounded bg-zinc-400 px-2 text-sm font-medium text-white">
              rolling out...
            </div>
          )}
          {state === "starting" && (
            <div className="mr-2 rounded bg-sky-600 px-2 text-sm font-medium text-white">
              starting...
            </div>
          )}
          {state === "running" && (
            <div className="mr-2 rounded bg-green-600 px-2 text-sm font-medium text-white">
              running
            </div>
          )}
          {state === "building" && (
            <div className="mr-2 rounded bg-yellow-400 px-2 text-sm font-medium text-white">
              building...
            </div>
          )}
          {state === "crashed" && (
            <div className="mr-2 rounded bg-red-400 px-2 text-sm font-medium text-white">
              crashed
            </div>
          )}
          {state === "deleting" && (
            <div className="mr-2 rounded bg-red-400 px-2 text-sm font-medium text-white">
              deleting...
            </div>
          )}
          {state === "failed" && (
            <div className="mr-2 rounded bg-red-400 px-2 text-sm font-medium text-white">
              failed
            </div>
          )}
          <h4 className=" cursor-pointertruncate text-ellipsis text-lg">
            {name}
          </h4>
        </div>
        {/* <div className="mt-1 flex items-center gap-1">
          <div className="h-4 w-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-full w-full fill-none stroke-gray">
              {visibility.toLowerCase() === "private" ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                />
              )}
            </svg>
          </div>
          <h6 className="text-sm text-gray">
            {visibility.replace(visibility[0], visibility[0].toUpperCase())}
          </h6>
        </div> */}
      </div>
      <div className="z-10 flex items-center justify-end">
        {/* open application */}
        <span
          title="open application"
          onClick={handleopen}
          className="rounded-md p-2 hover:bg-light-gray"
        >
          <svg
            className="pointer-events-none h-6 w-6 fill-none stroke-black"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
            />
          </svg>
        </span>
        {/* rollout */}
        <span
          title="rollout update"
          className="rounded-md p-2 hover:bg-light-gray"
          onClick={(e) => rolloutApplication(e)}
        >
          <svg
            className="pointer-events-none h-6 w-6 fill-none stroke-black"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
        </span>
        {/* update */}
        <span
          title="update application"
          onClick={(e) => {
            setShowUpdateModal(true);
            e.stopPropagation();
          }}
          className="rounded-md p-2 hover:bg-light-gray"
        >
          <svg
            className="pointer-events-none h-6 w-6 fill-none stroke-black"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
        </span>
        {/* logs */}
        <span
          title="logs"
          onClick={(e) => handleLogModal(e)}
          className="rounded-md p-2 hover:bg-light-gray"
        >
          <svg
            className="pointer-events-none h-6 w-6 fill-none stroke-black"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z"
            />
          </svg>
        </span>
        {/* delete */}
        <span
          title="delete"
          className="rounded-md p-2 hover:bg-light-gray"
          onClick={(e) => deleteApplication(e)}
        >
          <svg
            className="pointer-events-none h-6 w-6 fill-none stroke-black"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            ></path>
          </svg>
        </span>
      </div>
      <div>
        {showLogModal && (
          <LogModal applicationID={id} setShowModal={setShowLogModal} />
        )}
        {showUpdateModal && (
          <UpdateApplicationModal
            appID={id}
            repo={application.githubRepo}
            branch={application.githubBranch}
            name={name}
            port={application.listeningPort}
            envs={application.envs}
            setShowModal={setShowUpdateModal}
          />
        )}
      </div>
    </div>
  );
};

export default ApplicationItem;
