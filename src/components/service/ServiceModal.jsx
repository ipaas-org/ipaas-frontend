import {Formik, Form} from "formik";
import {useEffect, useState, useMemo} from "react";
// import * as Yup from "yup";
import {API} from "../../utils/api";
import {
  EnviromentVariable,
  EnviromentVariableField,
} from "../fields/EnvironmentVariableField";
import NameField from "../fields/NameField";
import ServiceSelectField from "../fields/ServiceSelectField";
import {getAccessToken} from "../../utils/tokens";

const ServiceModal = function ({setShowModal, templates}) {
  // const [serviceKind, setServiceKind] = useState("storage");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormValid, setIsFormValid] = useState({});
  const serviceKind = "storage";
  const [envs, setEnvs] = useState({});
  const [service, setService] = useState(templates[0]);
  const [envVariables, setEnvVariables] = useState({});

  const handleClose = function (e) {
    if (e.target.classList.contains("closer")) {
      setShowModal(false);
    }
  };

  const handleRequiredEnvVariablesCallback = function (env, isError) {
    // console.log("received required envs:", env, isError);

    if (env.length === 0) {
      setIsFormValid((prev) => {
        return {optionals: prev.optionals, required: true};
      });
      setEnvVariables((prev) => {
        return {optionals: prev.optionals, required: []};
      });
    } else {
      setEnvVariables((prev) => {
        return {optionals: prev.optionals, required: env};
      });
      setIsFormValid((prev) => {
        return {optionals: prev.optionals, required: !isError};
      });
    }
  };

  const handleOptionalsEnvVariablesCallback = function (env, isError) {
    // console.log("received optionals envs:", env, isError);
    // console.log("envs leng", env.length);

    if (env.length === 0) {
      console.log("no errors");
      setIsFormValid((prev) => {
        return {required: prev.required, optionals: true};
      });
      setEnvVariables((prev) => {
        return {required: prev.required, optionals: []};
      });
    } else {
      setEnvVariables((prev) => {
        return {required: prev.required, optionals: env};
      });
      setIsFormValid((prev) => {
        return {required: prev.required, optionals: !isError};
      });
    }
  };
  const handleServiceCallback = function (name) {
    let service = templates.find((service) => service.name === name);
    setService(service);
  };

  const submitForm = function (values) {
    setIsSubmitting(true);
    console.log("values:", values);
    console.log("isFormValid:", isFormValid);
    console.log("envVariables:", envVariables);
    if (!isFormValid.optionals || !isFormValid.required || values.name === "") {
      alert("form is not valid");
      setIsSubmitting(false);
      return;
    }

    console.log("valid form, submitting...");

    let envs = [];
    envVariables.required.forEach((env) => {
      envs.push({key: env.env.key, value: env.env.value});
    });

    envVariables.optionals.forEach((env) => {
      envs.push({key: env.env.key, value: env.env.value});
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

  const optionalsEnvs = useMemo(() => {
    console.log("recalcolating optional envs");
    if (envs.optionals === null) {
      return [];
    }
    return envs.optionals?.map((env) => {
      return {
        key: env.key,
        allowKeyChange: false,
        defaultKey: env.key,
        canRemove: true,
        keyExplanation: env.key + ": " + env.value,
      };
    });
  }, [envs.optionals]);

  const requiredEnvs = useMemo(() => {
    console.log("recalcolating required envs");
    if (envs.required === null) {
      return [];
    }
    return envs.required?.map((env) => {
      return {
        key: env.key,
        allowKeyChange: false,
        defaultKey: env.key,
        canRemove: false,
        keyExplanation: env.key + ": " + env.value,
      };
    });
  }, [envs.required]);

  useEffect(() => {
    console.log("services in modal:", templates);
  }, []);

  useEffect(() => {
    console.log("envs in modal:", envs);
  }, [envs]);

  useEffect(() => {
    console.log(
      "new required and optionals envs:",
      requiredEnvs,
      optionalsEnvs
    );
  }, [requiredEnvs, optionalsEnvs]);

  useEffect(() => {
    console.log("selected service in modal:", service);
    // setService;
    setEnvs({
      required: service.requiredEnvs,
      optionals: service.optionalEnvs,
    });
  }, [service]);

  return (
    <div
      onClick={handleClose}
      className="closer absolute inset-0 z-40 flex items-center justify-center bg-black bg-opacity-25">
      <div className="custom-shadow max-h-[90%] w-[90%] overflow-y-scroll rounded-xl bg-white px-8 lg:w-1/2">
        <div className="py-8 text-xl font-semibold">new service</div>
        <Formik
          initialValues={{
            name: "",
            service: templates[0],
          }}>
          {({errors, touched, values}) => (
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
                {/* {requiredEnvs?.length > 0 && ( */}
                <EnviromentVariableField
                  defaultEnvs={requiredEnvs}
                  title={"Required Envs"}
                  envCallback={handleRequiredEnvVariablesCallback}
                  forceValidate={true}
                  canAdd={false}
                />
                {/* )} */}
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
                    className="closer w-full rounded py-2 transition-all hover:bg-light-gray">
                    cancel
                  </button>
                  <button
                    // onClick={formik.handleSubmit}
                    type="button"
                    onSubmit={() => submitForm(values)}
                    onClick={() => submitForm(values)}
                    className="w-full rounded bg-blue py-2 text-white">
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
