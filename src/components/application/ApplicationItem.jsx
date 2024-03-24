import {getAccessToken} from "../../utils/tokens";
import {API} from "../../utils/api";

const ApplicationItem = function ({application}) {
  const {name, dnsName, state, id} = application;

  const handleopen = function () {
    console.log("dnsname", dnsName);
    window.open("http://" + dnsName, "_blank");
  };
  return (
    <div
      onClick={handleopen}
      // target="_blank"
      className="grid cursor-pointer grid-cols-4 px-8 py-6 transition-all hover:bg-hover-blue">
      <div className="col-span-3">
        <div className="flex items-center">
          {state === "pending" && (
            <div className="mr-2 rounded bg-zinc-400 px-2 text-sm font-medium text-white">
              pending...
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
          <h4 className="truncate text-ellipsis text-lg">{name}</h4>
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
        {/* open in new tab */}
        {/* <span
          className="rounded-md p-2 hover:bg-light-gray"
          onClick={(e) => {}}>
          <svg
            className="pointer-events-none h-6 w-6 fill-none stroke-black"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            stroke-width="2">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
            />
          </svg>
        </span> */}
        {/* rollout */}
        <span className="rounded-md p-2 hover:bg-light-gray">
          <svg
            className="pointer-events-none h-6 w-6 fill-none stroke-black"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              strokeWidth="2"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
        </span>
        {/* update */}
        <span className="rounded-md p-2 hover:bg-light-gray">
          <svg
            className="pointer-events-none h-6 w-6 fill-none stroke-black"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              strokeWidth="2"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
            />
          </svg>
        </span>
        {/* logs */}
        <span className="rounded-md p-2 hover:bg-light-gray">
          <svg
            className="pointer-events-none h-6 w-6 fill-none stroke-black"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              strokeWidth="2"
              d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5"
            />
          </svg>
        </span>
        {/* delete */}
        <span
          className="rounded-md p-2 hover:bg-light-gray"
          onClick={(e) => {
            const accessToken = getAccessToken();
            console.log("deleting application: " + id);
            alert("deleting application: " + name);
            API.delete("application/" + id + "/delete", {
              headers: {
                Authorization: "Bearer " + accessToken,
              },
            })
              .then((response) => {
                console.log("response", response);
                // alert("deleted service: " + id);
              })
              .catch((error) => {
                console.log("error", error);
                alert("error deleting application: " + name);
              });
            e.stopPropagation();
          }}>
          <svg
            className="pointer-events-none h-6 w-6 fill-none stroke-black"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
          </svg>
        </span>
      </div>
    </div>
  );
};

export default ApplicationItem;
