import { useEffect, useRef, useState } from "react";
import { Field, useFormikContext } from "formik";
import { API } from "../../utils/api";
import { getAccessToken } from "../../utils/tokens";

const RepositoryField = ({
  touched,
  errors,
  setBranches,
  isSubmitting,
  disabled = false,
  defaultValue = "",
}) => {
  const { setFieldValue } = useFormikContext();
  const [repo, setRepo] = useState({
    repo: defaultValue,
    error: "Repository link is required",
  });
  const lastInputForRepository = useRef();
  const [isValidatingRepository, setIsValidatingRepository] = useState(false);

  useEffect(() => {
    let err = validateRepository(repo.repo);
    if (err) {
      touched.repo = true;
      errors.repo = err;
    }
  }, [isSubmitting]);

  useEffect(() => {
    if (repo.repo !== "") {
      setFieldValue("repo", repo.repo);
    }
  }, [repo, setFieldValue]);

  function validateRepository(value) {
    let error;
    // console.log("value in validate", value.repo);
    if (value === repo.repo) {
      return repo.error;
    }

    clearTimeout(lastInputForRepository.current);

    if (!value) {
      error = "Repository link is required";
      // console.log("error:", error);
      setRepo({ repo: "", error: error });
      setBranches([]);
      return error;
    } else if (!value.match("([A-Za-z0-9-])+/([A-Za-z0-9-])+")) {
      error = "Link must be a valid GitHub repo link <user>/<repo>";
      // console.log("error:", error);
      setRepo({ repo: value, error: error });
      setBranches([]);
      return error;
    }

    return new Promise((resolve, reject) => {
      setIsValidatingRepository(true);
      //request
      lastInputForRepository.current = setTimeout(async () => {
        // await sleep(1);
        const accessToken = getAccessToken();
        const response = await API.post(
          "/validate/repo",
          {
            repo: value,
          },
          {
            headers: {
              Authorization: "Bearer " + accessToken,
            },
          }
        );
        let resp = await response.data;
        let data = resp.data;
        if (data.is_error) {
          error = "error validating repository";
          setRepo({ repo: value, error: error });
          setBranches([]);
          resolve(error);
        } else if (data.valid) {
          let b = [];
          setRepo({ repo: value, error: "" });
          data.branches.forEach((branch) => {
            if (branch === data.defaultBranch) {
              b.unshift(branch);
            } else {
              b.push(branch);
            }
          });
          setBranches(b);
          resolve();
        } else {
          error =
            "repository is not valid, check if you have access to it or if you misspelled it";
          setRepo({ repo: value, error: error });
          // console.log("removing branches");
          setBranches([]);
          resolve(error);
        }
        setIsValidatingRepository(false);
      }, 300);
    });
  }

  return (
    <>
      <div className="mb-1">repository link:</div>
      <Field
        disabled={disabled}
        validate={validateRepository}
        spellCheck="false"
        type="text"
        placeholder="user/repo"
        name="repo"
        className="w-full rounded border-[1.5px] border-light-gray"
      />
      {isValidatingRepository && (
        <div className="mt-6 flex items-center justify-center space-x-2 dark:invert">
          <span className="">Checking</span>
          <div className="h-1 w-1 animate-bounce rounded-full bg-black [animation-delay:-0.3s]"></div>
          <div className="h-1 w-1 animate-bounce rounded-full bg-black [animation-delay:-0.15s]"></div>
          <div className="h-1 w-1 animate-bounce rounded-full bg-black"></div>
        </div>
      )}
      <p className="text-sm font-medium text-red-500">
        {touched.repo && errors.repo}
      </p>
    </>
  );
};

export default RepositoryField;
