import {useEffect} from "react";
import {Field, useFormikContext} from "formik";

const BranchField = ({branches}) => {
  const {setFieldValue} = useFormikContext();

  useEffect(() => {
    if (branches.length > 0) {
      setFieldValue("branch", branches[0]);
    }
  }, [branches, setFieldValue]);

  if (!!branches.length) {
    return (
      <Field
        as="select"
        name="branch"
        className="w-full rounded border-[1.5px] border-light-gray">
        {branches.map((branch) => (
          <option value={branch} key={branch}>
            {branch}
          </option>
        ))}
      </Field>
    );
  } else {
    return (
      <Field
        as="select"
        name="branch"
        className="w-full rounded border-[1.5px] border-light-gray"
        disabled></Field>
    );
  }
};

export default BranchField;
