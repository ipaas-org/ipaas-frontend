import Header from "../components/header/Header";
import ApplicationContainer from "../components/application/ApplicationContainer";
import ServiceContainer from "../components/service/ServiceContainer";
import { API } from "../utils/api";
import { getAccessToken } from "../utils/tokens";
import { ToastContainer, Zoom } from "react-toastify";
import { useEffect, useMemo, useState } from "react";

const Dashboard = function ({ setLoggedIn }) {
  const [applications, setApplications] = useState([]);
  const [services, setServices] = useState([]);
  const [servs, setServs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [servicesFingerPrint, setServicesFingerPrint] = useState("");

  useMemo(() => {
    console.log("updating applications");
    console.log("servs", servs);
    let apps = [];
    let s = [];
    servs?.forEach((app) => {
      if (app.kind === "web") {
        apps.push(app);
      } else {
        s.push(app);
      }
    });
    console.log("apps", apps);
    console.log("servs", s);
    setApplications(apps);
    setServices(s);
  }, [servicesFingerPrint]);

  if (window.location.href.includes("key")) {
    window.location.href = "/dashboard";
  }

  const getApplications = () => {
    setLoading(true);
    const accessToken = getAccessToken();

    API.get("application/list/all", {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((response) => {
        // console.log("all", response.data.data);
        let fingerPrint = "";
        if (!response.data.data) {
          setServs(null);
          setServicesFingerPrint("");
          return;
        }
        response.data.data
          .toSorted((a, b) => {
            if (a.id < b.id) {
              return -1;
            }
            if (a.id > b.id) {
              return 1;
            }
            return 0;
          })
          .forEach((srv) => {
            let envlen = 0;
            if (srv.envs) {
              envlen = srv.envs.length;
            }
            fingerPrint += `${srv.id}-${srv.state}-${srv.listeningPort}-${envlen}`;
          });
        // console.log(fingerPrint);
        setServs(response.data.data);
        setServicesFingerPrint(fingerPrint);
      })
      .catch((error) => {
        console.error(error);
        setError(error.response.details);
      });
    setLoading(false);
  };

  useEffect(() => {
    getApplications();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      getApplications();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen px-2 md:px-10 lg:px-20">
      <ToastContainer
        position="bottom-right"
        // autoClose={5000}
        // hideProgressBar={false}
        // newestOnTop={false}
        // closeOnClick={true}
        // rtl={false}
        // pauseOnFocusLoss
        // draggable
        // pauseOnHover
        // theme="light"
        transition={Zoom}
      />
      <Header setLoggedIn={setLoggedIn} />
      <main className="grid gap-5 md:h-5/6 md:grid-cols-12">
        <ApplicationContainer
          error={error}
          loading={loading}
          applications={applications}
        />
        <ServiceContainer error={error} loading={loading} services={services} />
      </main>
    </div>
  );
};

export default Dashboard;
