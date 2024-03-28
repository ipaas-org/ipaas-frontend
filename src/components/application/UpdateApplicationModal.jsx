import { useEffect, useState, useMemo } from "react";
import { Formik, Form } from "formik";
import { API } from "../../utils/api";
import { EnviromentVariableField } from "../fields/EnvironmentVariableField";
import { getAccessToken } from "../../utils/tokens";
import NameField from "../fields/NameField";
import PortField from "../fields/PortField";

const UpdateApplicationModal = function ({
  appID,
  repo,
  branch,
  name,
  port,
  envs,
  setShowModal,
}) {
  //   const [envForField, setEnvForField] = useState([]);
  const [envVariables, setEnvVariables] = useState([]);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [forceValidate, setForceValidate] = useState(false);

  const handleClose = function (e) {
    if (e.target.classList.contains("closer")) {
      setShowModal(false);
    }
  };

  const envsForUpdate = useMemo(() => {
    return envs?.map((env) => {
      return {
        key: env.key,
        defaultKey: env.key,
        value: env.value,
      };
    });
  }, [envs]);

  const handleEnvVariablesCallback = function (env, isError) {
    setIsFormValid(!isError);
    setEnvVariables(env);
  };

  const submitForm = function (values) {
    console.log("IM SUBMITTING");
    // setForceValidate(true);
    setIsSubmitting(true);
    console.log("values:", values);
    console.log("isFormValid:", isFormValid);
    console.log("envVariables:", envVariables);
    console.log("envsForUpdate:", envsForUpdate);
    if (!isFormValid) {
      alert("form is not valid");
      setIsSubmitting(false);
      return;
    }
    console.log("valid form, submitting...");

    const updateVals = {};
    // if (values.name !== name) {
    //   updateVals.name = values.name;
    // }

    if (values.port !== port) {
      updateVals.port = values.port.toString();
    }

    if (envVariables.length !== 0) {
      if (envsForUpdate == undefined) {
        updateVals.envs = envVariables.map((env) => {
          return { key: env.env.key, value: env.env.value };
        });
      } else if (envVariables.length !== envsForUpdate.length) {
        console.log("DIFFERENTTT envs:", envVariables, "envs:", envsForUpdate);
        updateVals.envs = envVariables.map((env) => {
          return { key: env.env.key, value: env.env.value };
        });
      } else {
        let isDifferent = false;
        envVariables.forEach((env, index) => {
          if (
            env.key !== envsForUpdate[index].key ||
            env.value !== envsForUpdate[index].value
          ) {
            console.log(
              "DIFFERENTTT env:",
              env,
              "envs[index]:",
              envsForUpdate[index]
            );
            isDifferent = true;
          }
        });
        if (isDifferent) {
          updateVals.envs = envVariables.map((env) => {
            return { key: env.env.key, value: env.env.value };
          });
        }
      }
    } else {
      updateVals.envs = [];
    }

    if (Object.keys(updateVals).length === 0) {
      setShowModal(false);
      return;
    }

    console.log(updateVals);
    const accessToken = getAccessToken();
    API.patch("/application/" + appID + "/update", updateVals, {
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

  function forceRestart() {
    const accessToken = getAccessToken();
    API.get("/application/" + appID + "/redeploy", {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log("error:", error);
        // setError(true);
      });
  }

  return (
    <div
      onClick={handleClose}
      className="closer absolute inset-0 z-40 flex items-center justify-center bg-black bg-opacity-25"
    >
      <div className="custom-shadow max-h-[90%] w-[90%] overflow-y-scroll rounded-xl bg-white px-8 lg:w-1/2">
        <button
          onClick={forceRestart}
          className="w-full my-8 rounded bg-blue py-2 text-white"
        >
          Force Restart
        </button>
        <div className="pb-8 text-xl font-semibold">Update Application</div>
        <Formik
          initialValues={{
            name: name,
            port: port,
          }}
        >
          {({ errors, touched, values }) => (
            <Form>
              {/* repo */}
              <div className="mb-5">
                <div className="mb-1">repository link:</div>
                <input
                  disabled={true}
                  type="text"
                  placeholder="user/repo"
                  value={repo}
                  className="w-full rounded border-[1.5px] border-light-gray bg-light-gray"
                />
              </div>
              <div className="mb-5">
                <div className="mb-1">branch:</div>
                <input
                  disabled={true}
                  className="w-full rounded border-[1.5px] border-light-gray bg-light-gray"
                  value={branch}
                />
              </div>
              {/* name */}
              <div className="mb-5">
                <div className="mb-1">
                  project name: ( will soon be allowed )
                </div>
                <input
                  disabled={true}
                  className="w-full rounded border-[1.5px] border-light-gray bg-light-gray"
                  value={name}
                />
              </div>
              {/* port */}
              <div className="mb-5">
                <PortField
                  isSubmitting={isSubmitting}
                  touched={touched}
                  errors={errors}
                  defaultValue={port}
                />
              </div>
              {/* envs */}
              <div className="mb-4">
                <EnviromentVariableField
                  forceValidate={forceValidate}
                  defaultEnvs={envsForUpdate}
                  envCallback={handleEnvVariablesCallback}
                  title={"environment variables:"}
                />
              </div>
              {isSubmitting ? (
                <div className="mt-6 flex items-center justify-center space-x-2 py-6 text-lg font-semibold dark:invert">
                  <span className="">Updating</span>
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

export default UpdateApplicationModal;
