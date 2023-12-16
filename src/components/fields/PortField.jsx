import {Field, useFormikContext} from "formik";
import {useEffect, useState} from "react";

const PortField = ({touched, errors, isSubmitting}) => {
  const [port, setPort] = useState({port: "", error: "Port is required"});
  const {setFieldValue} = useFormikContext();

  useEffect(() => {
    let err = validatePort(port.port);
    if (err) {
      touched.port = true;
      errors.port = err;
    }
  }, [isSubmitting]);

  function validatePort(value) {
    let error;
    if (!value) {
      error = "Port is required";
      setPort({port: "", error: error});
      return error;
    }
    if (value < 20) {
      error = "Port must be grater than 20";
      setPort({port: "", error: error});
      return error;
    }
    if (value > 65536) {
      error = "Port must be less than 65536";
      setPort("");

      return error;
    }
    setPort({port: value, error: ""});
  }

  return (
    <>
      <div className="mb-1">port:</div>
      <Field
        name="port"
        placeholder="8080"
        type="number"
        validate={validatePort}
        className="w-full rounded border-[1.5px] border-light-gray"
      />
      <p className="text-sm font-medium text-red-500">
        {touched.port && errors.port}
      </p>
    </>
  );
};

export default PortField;
