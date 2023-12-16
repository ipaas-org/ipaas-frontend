import {useEffect, useState} from "react";
import ServiceItem from "./ServiceItem";
import ServiceModal from "./ServiceModal";
import {LoadingMessage} from "../LoadingMessage";
import ErrorMessage from "../ErrorMessage";
import {API} from "../../utils/api";

const ServiceContainer = function ({services, loading, error}) {
  const [showModal, setShowModal] = useState(false);
  const [templates, setTemplates] = useState([]);

  const getTemplates = async function () {
    const response = await API.get("/templates/list");
    const data = await response.data;
    console.log("setting templates", data.data);
    setTemplates(data.data);
  };

  useEffect(() => {
    getTemplates();
  }, []);

  return (
    <div className="custom-shadow overflow-hidden rounded-xl md:col-span-4">
      <div className="h-full w-full divide-y divide-light-gray overflow-y-auto">
        <div className="flex items-center justify-between px-8 py-6 text-xl font-semibold">
          <span>Services</span>
          <button
            onClick={() => setShowModal(true)}
            className="rounded bg-blue py-1 px-3 text-base text-white">
            new
          </button>
        </div>
        {loading && <LoadingMessage />}
        {services?.map((database, key) => (
          <ServiceItem
            service={templates.find(({code}) => code === database.basedOn)}
            database={database}
            key={key}
          />
        ))}
        {error && <ErrorMessage message={error} />}
      </div>
      {showModal && (
        <ServiceModal templates={templates} setShowModal={setShowModal} />
      )}
    </div>
  );
};

export default ServiceContainer;
