import { Formik, Form } from "formik";
import { useEffect, useState, useMemo } from "react";
// import * as Yup from "yup";
import { API } from "../../utils/api";
import { EnviromentVariableField } from "../fields/EnvironmentVariableField";
import NameField from "../fields/NameField";
import ServiceSelectField from "../fields/ServiceSelectField";
import { getAccessToken } from "../../utils/tokens";

const ServiceModal = function ({ setShowModal, templates }) {
  // const [serviceKind, setServiceKind] = useState("storage");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormValid, setIsFormValid] = useState({});
  const serviceKind = "storage";
  const [serviceEnvs, setServiceEnvs] = useState({});
  const [service, setService] = useState(templates[0]);
  const [envVariables, setEnvVariables] = useState({});

  const handleClose = function (e) {
    if (e.target.classList.contains("closer")) {
      setShowModal(false);
    }
  };

  const handleRequiredEnvVariablesCallback = function (requiredEnvs, isError) {
    console.log("received required envs:", requiredEnvs, isError);

    if (requiredEnvs.length === 0) {
      setEnvVariables((prev) => {
        return { optionals: prev.optionals, required: [] };
      });

      setIsFormValid((prev) => {
        return { optionals: prev.optionals, required: true };
      });
    } else {
      setEnvVariables((prev) => {
        return { optionals: prev.optionals, required: requiredEnvs };
      });

      setIsFormValid((prev) => {
        return { optionals: prev.optionals, required: !isError };
      });
    }
  };

  const handleOptionalsEnvVariablesCallback = function (
    optionalsEnvs,
    isError
  ) {
    console.warn("received optionals envs:", optionalsEnvs, isError);
    // console.log("envs leng", env.length);

    if (optionalsEnvs.length === 0) {
      setEnvVariables((prev) => {
        return { required: prev.required, optionals: [] };
      });

      setIsFormValid((prev) => {
        return { required: prev.required, optionals: true };
      });
    } else {
      setEnvVariables((prev) => {
        return { required: prev.required, optionals: optionalsEnvs };
      });

      setIsFormValid((prev) => {
        return { required: prev.required, optionals: !isError };
      });
    }
  };

  const handleServiceCallback = function (name) {
    let service = templates.find((service) => service.name === name);
    setService(service);
  };

  const submitForm = function (values) {
    setIsSubmitting(true);
    // console.log("values:", values);
    // console.log("isFormValid:", isFormValid);
    // console.log("envVariables:", envVariables);
    if (!isFormValid.optionals || !isFormValid.required || values.name === "") {
      alert("form is not valid");
      setIsSubmitting(false);
      return;
    }

    console.log("valid form, submitting...");

    let envs = [];
    envVariables.required.forEach((env) => {
      envs.push({ key: env.env.key, value: env.env.value });
    });

    envVariables.optionals.forEach((env) => {
      envs.push({ key: env.env.key, value: env.env.value });
    });

    if (envs.length !== 0) {
      values.envs = envs;
    }
    values.templateCode = service.code;
    console.log(values);
    const accessToken = getAccessToken();
    API.post("/application/new/template", values, {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((response) => {
        console.log(response);
        setShowModal(false);
      })
      .catch((error) => {
        console.log("error:", error);
        // setError(true);
      });
    setIsSubmitting(false);
    // setShowModal(false);
  };

  let optionalsEnvs = useMemo(() => {
    if (serviceEnvs.optionals == null) {
      return [];
    }
    return serviceEnvs.optionals.map((env) => {
      return {
        key: env.key,
        value: "",
        allowKeyChange: false,
        defaultKey: env.key,
        canRemove: true,
        keyExplanation: env.key + ": " + env.value,
      };
    });
  }, [serviceEnvs.optionals]);

  let requiredEnvs = useMemo(() => {
    if (serviceEnvs.required == null) {
      return [];
    }
    return serviceEnvs.required.map((env) => {
      return {
        key: env.key,
        value: "",
        allowKeyChange: false,
        defaultKey: env.key,
        canRemove: false,
        keyExplanation: env.key + ": " + env.value,
      };
    });
  }, [serviceEnvs.required]);

  useEffect(() => {
    console.log("services in modal:", templates);
  }, []);

  useEffect(() => {
    console.log("envs in modal:", serviceEnvs);
  }, [serviceEnvs]);

  useEffect(() => {
    console.log(
      "new required and optionals envs:",
      requiredEnvs,
      optionalsEnvs
    );
    if (requiredEnvs.length === 0) {
      setIsFormValid((prev) => {
        return { optionals: prev.optionals, required: true };
      });
    }
  }, [requiredEnvs, optionalsEnvs]);

  useEffect(() => {
    console.log("selected service in modal:", service);
    setEnvVariables({ required: [], optionals: [] });
    setServiceEnvs({
      required: service.requiredEnvs,
      optionals: service.optionalEnvs,
    });
    setIsFormValid({ required: false, optionals: false });
  }, [service]);

  return (
    <div
      onClick={handleClose}
      className="closer absolute inset-0 z-40 flex items-center justify-center bg-black bg-opacity-25"
    >
      <div className="custom-shadow max-h-[90%] w-[90%] overflow-y-scroll rounded-xl bg-white px-8 lg:w-1/2">
        <div className="py-8 text-xl font-semibold">new service</div>
        <Formik
          initialValues={{
            name: "",
            service: templates[0],
          }}
        >
          {({ errors, touched, values }) => (
            <Form>
              {/* service */}
              <div className="mb-5">
                <ServiceSelectField
                  services={templates}
                  touched={touched}
                  errors={errors}
                  serviceCallback={handleServiceCallback}
                />
              </div>
              {/* name */}
              <div className="mb-5">
                <NameField
                  isSubmitting={isSubmitting}
                  errors={errors}
                  touched={touched}
                  kind={serviceKind}
                />
              </div>
              {/* required envs */}
              <div className="mb-5">
                {requiredEnvs?.length > 0 && (
                  <EnviromentVariableField
                    defaultEnvs={requiredEnvs}
                    title={"Required Envs"}
                    envCallback={handleRequiredEnvVariablesCallback}
                    forceValidate={true}
                    canAdd={false}
                  />
                )}
              </div>
              {/* optional envs */}
              <div className="mb-5">
                {/* {optionalsEnvs?.length > 0 && ( */}
                <EnviromentVariableField
                  defaultEnvs={optionalsEnvs}
                  title={"Optional Envs"}
                  envCallback={handleOptionalsEnvVariablesCallback}
                  forceValidate={false}
                />
                {/* )} */}
              </div>
              {isSubmitting ? (
                <div className="mt-6 flex items-center justify-center space-x-2 py-6 text-lg font-semibold dark:invert">
                  <span className="">Creating</span>
                  <div className="h-1 w-1 animate-bounce rounded-full bg-black [animation-delay:-0.3s]"></div>
                  <div className="h-1 w-1 animate-bounce rounded-full bg-black [animation-delay:-0.15s]"></div>
                  <div className="h-1 w-1 animate-bounce rounded-full bg-black"></div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2 py-6 text-lg font-semibold">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="closer w-full rounded py-2 transition-all hover:bg-light-gray"
                  >
                    cancel
                  </button>
                  <button
                    // onClick={formik.handleSubmit}
                    type="button"
                    onSubmit={() => submitForm(values)}
                    onClick={() => submitForm(values)}
                    className="w-full rounded bg-blue py-2 text-white"
                  >
                    create
                  </button>
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ServiceModal;
