import {useState} from "react";
import {Formik, Form} from "formik";
import {API} from "../../utils/api";
import BranchField from "../fields/BranchField";
import {EnviromentVariableField} from "../fields/EnvironmentVariableField";
import {getAccessToken} from "../../utils/tokens";
import RepositoryField from "../fields/RepositoryField";
import NameField from "../fields/NameField";
import PortField from "../fields/PortField";

const ApplicationModal = function ({setShowModal}) {
  const [branches, setBranches] = useState([]);
  const [envVariables, setEnvVariables] = useState([]);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClose = function (e) {
    if (e.target.classList.contains("closer")) {
      setShowModal(false);
    }
  };

  const handleEnvVariablesCallback = function (env, isError) {
    setIsFormValid(!isError);
    setEnvVariables(env);
  };

  const submitForm = function (values) {
    setIsSubmitting(true);
    console.log("values:", values);
    console.log("isFormValid:", isFormValid);
    console.log("envVariables:", envVariables);
    if (
      !isFormValid ||
      values.repo === "" ||
      values.name === "" ||
      values.port === ""
    ) {
      alert("form is not valid");
      setIsSubmitting(false);
      return;
    }

    console.log("valid form, submitting...");
    // return {form: "form is not valid"};

    let envs = [];
    envVariables.forEach((env) => {
      envs.push({key: env.env.key, value: env.env.value});
    });

    if (envs.length !== 0) {
      values.envs = envs;
    }
    values.port = values.port.toString();
    console.log(values);
    const accessToken = getAccessToken();
    API.post("/application/new/web", values, {
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

  return (
    <div
      onClick={handleClose}
      className="closer absolute inset-0 z-40 flex items-center justify-center bg-black bg-opacity-25">
      <div className="custom-shadow max-h-[90%] w-[90%] overflow-y-scroll rounded-xl bg-white px-8 lg:w-1/2">
        <div className="py-8 text-xl font-semibold">new application</div>
        <Formik
          initialValues={{
            repo: "",
            branch: "",
            name: "",
            port: "",
          }}>
          {({errors, touched, values}) => (
            <Form>
              {/* repo */}
              <div className="mb-5">
                <RepositoryField
                  isSubmitting={isSubmitting}
                  setBranches={setBranches}
                  errors={errors}
                  touched={touched}
                />
              </div>
              {/* branches */}
              <div className="mb-5">
                <div className="mb-1">select branch:</div>
                <BranchField isSubmitting={isSubmitting} branches={branches} />
              </div>
              {/* name */}
              <div className="mb-5">
                <NameField
                  isSubmitting={isSubmitting}
                  touched={touched}
                  errors={errors}
                  kind="web"
                />
              </div>
              {/* port */}
              <div className="mb-5">
                <PortField
                  isSubmitting={isSubmitting}
                  touched={touched}
                  errors={errors}
                />
              </div>
              {/* envs */}
              <div className="mb-4">
                <EnviromentVariableField
                  envCallback={handleEnvVariablesCallback}
                  title={"environment variables:"}
                />
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

export default ApplicationModal;
