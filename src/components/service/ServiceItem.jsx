import {getAccessToken} from "../../utils/tokens";
import {API} from "../../utils/api";

const ServiceItem = function ({service, database}) {
  const {name, state, kind, dnsName, id} = database;

  const handleopen = function () {
    if (kind !== "managment") return;
    console.log("dnsname", dnsName);
    window.open("http://" + dnsName, "_blank");
  };

  return (
    <div
      onClick={handleopen}
      className={
        "grid grid-cols-4 px-8 py-6 transition-all hover:bg-hover-blue" +
        (kind === "managment" ? " cursor-pointer" : "")
      }>
      <div className="col-span-3">
        <div className="flex items-center">
          {state === "pending" && (
            <div className="bg-gray-400 mr-2 rounded px-2 text-sm font-medium text-white">
              pending
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

          <h4 className="truncate text-ellipsis text-lg">{name}</h4>
        </div>

        <h6 className="mt-1 text-sm text-gray">{service.name}</h6>
      </div>
      <div className="z-10 flex items-center justify-end">
        <span
          onClick={(e) => {
            const accessToken = getAccessToken();
            console.log("deleting service: " + id);
            alert("deleting service: " + name);
            API.delete("application/delete/" + id, {
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
                alert("error deleting service: " + id);
              });
            // inutile se il db non è cliccabile come le applicazioni
            e.stopPropagation();
          }}
          className="cursor-pointer rounded-md p-2 hover:bg-light-gray">
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

export default ServiceItem;
