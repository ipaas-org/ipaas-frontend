import { useEffect, useState } from "react";
import { getAccessToken } from "../../utils/tokens";
import { API } from "../../utils/api";

// const fromTimestampToRfc3339Nano = (timestamp) => {
//   const nsReg = /(\d*)(\d{9})/;
//   const ts = String(timestamp).replace(nsReg, "$1");
//   const ns = String(timestamp).replace(nsReg, "$2");
//   if (
//     !timestamp ||
//     parseInt(timestamp) < 999999999 ||
//     !ts.length ||
//     !ns.length
//   ) {
//     return null;
//   }
//   return new Date(parseInt(ts + "000")).toISOString().replace(".000", `.${ns}`);
// };

const LogModal = ({ applicationID, setShowModal }) => {
  const [metaLog, setMetaLog] = useState({
    isError: false,
    message: "default",
  });
  const [logs, setLogs] = useState([]);
  const [subTitle, setSubTitle] = useState("");
  const handleClose = function (e) {
    if (e.target.classList.contains("closer")) {
      setShowModal(false);
    }
  };

  const getLogs = () => {
    // applicationID = "66016c0842dfb5dbbb351e8e";
    const accessToken = getAccessToken();
    // if (!accessToken) return;
    var params = {};
    var headers = {
      Authorization: "Bearer " + accessToken,
    };
    if (metaLog.message !== "default" && metaLog.shown !== 0) {
      //   params = {
      //     from: metaLog.toNano,
      //   };
      headers = {
        Authorization: "Bearer " + accessToken,
        "X-Last-Log-Nano": metaLog.lastTimestampNano,
      };
    }
    API.get("application/" + applicationID + "/logs", {
      params: params,
      headers: headers,
    })
      .then((response) => {
        if (response.data.message === "no new logs") {
          console.log("no new logs");
          return;
        }

        if (response.data.data.returnedLogs == 0) {
          console.log("no logs");
          setSubTitle("Currently there are no logs");
          return;
        }

        var logs = {
          isError: false,
          fromNano: response.data.data.from,
          toNano: response.data.data.to,
          lastTimestampNano: response.data.data.lastTimestamp,
          shown: response.data.data.returnedLogs,
          total: response.data.data.totalLogs,
        };

        console.log("logs", logs);
        if (response.data.data.returnedLogs === 0) {
          logs.message = "No logs returned.";
        } else {
          logs.message = "";
          logs.content = response.data.data.content;
        }

        setMetaLog(logs);
      })
      .catch((error) => {
        console.log(error);
        setMetaLog({
          isError: true,
          message: `Error fetching logs: ${error.response.data.details}`,
        });
      });
  };

  useEffect(() => {
    getLogs();
  }, []);

  useEffect(() => {
    if (metaLog.message === "default") return;

    if (metaLog.isError) {
      setSubTitle("Error fetching logs: " + metaLog.message);
      return;
    }
    console.log("metaLog", metaLog);
    setSubTitle(
      `Got ${metaLog.shown} logs from ${new Date(
        metaLog.fromNano
      ).toLocaleString()} to ${new Date(metaLog.toNano).toLocaleString()}`
    );

    var l = [];
    metaLog.content.forEach((log) => {
      l.push(`[${new Date(log.timestamp).toLocaleString()}] ${log.content}`);
    });
    setLogs(l);
  }, [metaLog]);

  return (
    <div
      onClick={handleClose}
      className="closer absolute inset-0 z-40 flex items-center justify-center bg-black bg-opacity-25"
    >
      <div className="custom-shadow h-[700px] max-h-[90%] w-[90%] overflow-y-scroll rounded-xl bg-white px-8 ">
        <div className="pt-8 text-xl font-semibold">Logs</div>
        <button
          className="rounded bg-blue py-1 px-3 text-base text-white"
          onClick={getLogs}
        >
          Refresh
        </button>
        <div className="py-8 text-m font-semibold">{subTitle}</div>
        <div className=" bg-gray overflow-scroll">
          <div className="px-4">
            {logs?.map((log, key) => (
              <>
                <span key={key} className="text-white whitespace-nowrap">
                  {log}
                </span>
                <br />
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogModal;
