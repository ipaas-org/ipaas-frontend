import {Field, useFormikContext} from "formik";
const ServiceSelectField = ({services, touched, errors, serviceCallback}) => {
  const {setFieldValue} = useFormikContext();

  const handleServiceChange = function (e) {
    let value = e.target.value;
    setFieldValue("service", value);
    serviceCallback(value);
  };

  return (
    <>
      <div className="mb-2">Service:</div>
      {services.length > 0 ? (
        <Field
          as="select"
          onChange={handleServiceChange}
          // onChange={formik.handleChange}
          // onBlur={formik.handleBlur}
          name="service"
          className="w-full rounded border-[1.5px] border-light-gray">
          {services.map((service) => (
            <option key={service.code}>{service.name}</option>
          ))}
        </Field>
      ) : (
        <select
          name="service"
          className="w-full rounded border-[1.5px] border-light-gray"
          disabled></select>
      )}
      <p className="text-sm font-medium text-red-500">
        {touched.service && errors.service}
      </p>
    </>
  );
};

export default ServiceSelectField;
