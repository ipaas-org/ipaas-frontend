import { Field, useFormikContext } from "formik";
import { API } from "../../utils/api";
import { getAccessToken } from "../../utils/tokens";
import { useEffect, useRef, useState } from "react";

const NameField = ({
  touched,
  errors,
  kind,
  isSubmitting,
  defaultValue = "",
  disabled = false,
}) => {
  const lastInputForName = useRef();
  const { setFieldValue } = useFormikContext();
  const [isValidatingName, setIsValidatingName] = useState(false);
  const [name, setName] = useState({
    name: defaultValue,
    error: "Name is required",
  });

  useEffect(() => {
    let err = validateName(name.name);

    if (err) {
      touched.name = true;
      errors.name = err;
    }
  }, [isSubmitting]);

  useEffect(() => {
    if (name.name !== "") {
      setFieldValue("name", name.name);
    }
  }, [name, setFieldValue]);

  useEffect(() => {
    if (defaultValue !== "") {
      setFieldValue({ name: defaultValue, error: "" });
    } else {
      setFieldValue({ name: "", error: "Name is required" });
    }
  }, []);

  function validateName(value) {
    let error;
    if (value === name.name) {
      return name.error;
    }
    clearTimeout(lastInputForName.current);

    if (defaultValue !== "" && defaultValue === value) {
      // console.log("bruh same stuff");
      setName({ name: defaultValue, error: "" });
      setIsValidatingName(false);
      return;
    }
    // console.log("validating name:", value);

    if (!value) {
      error = "Project name is required";
      // console.log("error:", error);
      setName({ name: value, error: error });
      return error;
    }
    if (!value.match("^[a-zA-Z0-9_-]*$")) {
      error = "Project name can not contain special characters except - and _";
      // console.log("error:", error);
      setName({ name: value, error: error });
      return error;
    }

    return new Promise((resolve, reject) => {
      setIsValidatingName(true);
      lastInputForName.current = setTimeout(async () => {
        const accessToken = getAccessToken();
        const response = await API.post(
          "/validate/name",
          {
            kind: kind,
            name: value,
          },
          {
            headers: {
              Authorization: "Bearer " + accessToken,
            },
          }
        );
        let resp = await response.data;
        let data = resp.data;
        // console.log("response:", resp);
        if (data.is_error) {
          error = "error validating name";
          console.error("error:", response.data);
          setName({ name: value, error: error });
          resolve(error);
        } else if (data.valid) {
          // console.log("VALID");
          setName({ name: value, error: error });
          resolve();
        } else {
          error = "name is not available";
          setName({ name: value, error: error });
          resolve(error);
        }
        setIsValidatingName(false);
      }, 300);
    });
  }

  return (
    <>
      <div className="mb-2">project name:</div>
      <Field
        validate={validateName}
        disabled={disabled}
        spellCheck="false"
        type="text"
        name="name"
        className="w-full rounded border-[1.5px] border-light-gray"
      />
      {isValidatingName && (
        <div className="mt-6 flex items-center justify-center space-x-2 dark:invert">
          <span className="">Checking</span>
          <div className="h-1 w-1 animate-bounce rounded-full bg-black [animation-delay:-0.3s]"></div>
          <div className="h-1 w-1 animate-bounce rounded-full bg-black [animation-delay:-0.15s]"></div>
          <div className="h-1 w-1 animate-bounce rounded-full bg-black"></div>
        </div>
      )}
      {/* {!isValidating && ( */}
      <p className="text-sm font-medium text-red-500">
        {touched.name && errors.name}
      </p>
    </>
  );
};

export default NameField;
