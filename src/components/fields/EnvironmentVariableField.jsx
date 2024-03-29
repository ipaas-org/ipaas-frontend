import { useEffect, useState } from "react";

const EnvironmentVariable = function ({
  id,
  deleteVariable,
  sendEnvCallback,
  forceValidate,
  defaultKey = "",
  value: defaultValue = "",
  keyExplanation = "",
  allowKeyChange = true,
  canRemove = true,
}) {
  const [env, setEnv] = useState({ key: defaultKey, value: defaultValue });
  const [isError, setIsError] = useState({
    variableKey: false,
    variableValue: false,
  });
  const [error, setError] = useState({});

  useEffect(() => {
    console.log(">>>> SETTING DEFAULT ENV VALUES ");
    setEnv({ key: defaultKey, value: defaultValue });
  }, []);

  function validateKey(e) {
    const value = e.target.value;
    let error = "";
    if (!value) {
      error = "Key is required";
      setIsError((prev) => {
        return { ...prev, variableKey: true };
      });
      setError((prev) => {
        return { ...prev, variableKey: error };
      });
    } else if (!value.match("^[a-zA-Z0-9_-]*$")) {
      error = "Key must be letters, numbers, - or _";
      setIsError((prev) => {
        return { ...prev, variableKey: true };
      });
      setError((prev) => {
        return { ...prev, variableKey: error };
      });
    } else {
      setIsError((prev) => {
        return { ...prev, variableKey: false };
      });
    }

    setEnv((prev) => {
      return { key: value, value: prev.value };
    });
    return error;
  }

  function validateValue(e) {
    const value = e.target.value;
    let error = "";
    if (!value) {
      error = "Value is required";
      setIsError((prev) => {
        return { ...prev, variableValue: true };
      });
      setError((prev) => {
        return { ...prev, variableValue: error };
      });
    } else {
      setIsError((prev) => {
        return { ...prev, variableValue: false };
      });
    }

    setEnv((prev) => {
      return { key: prev.key, value: value };
    });
    return error;
  }

  // function showTooltip(e) {
  //   const tooltip = document.getElementById("tooltip" + id);
  //   tooltip.classList.remove("scale-0");
  //   tooltip.classList.add("scale-100");
  // }

  // function hideTooltip(e) {
  //   const tooltip = document.getElementById("tooltip" + id);
  //   tooltip.classList.remove("scale-100");
  //   tooltip.classList.add("scale-0");
  // }

  useEffect(() => {
    sendEnvCallback(id, env, !isError.variableKey && !isError.variableValue);
  }, [env, isError]);

  useEffect(() => {
    validateKey({ target: { value: env.key } });
    validateValue({ target: { value: env.value } });
  }, [forceValidate]);

  return (
    <div className="mb-2">
      <div
        // onMouseEnter={showTooltip}
        // onMouseLeave={hideTooltip}
        // id={id}
        className="flex items-center gap-2"
      >
        {allowKeyChange ? (
          <input
            placeholder="VARIABLE_KEY"
            type="text"
            value={env.key}
            onChange={validateKey}
            onBlur={validateKey}
            // onSubmit={validateKey}
            spellCheck="false"
            className="w-full rounded border-[1.5px] border-light-gray"
          />
        ) : (
          <input
            placeholder="VARIABLE_KEY"
            type="text"
            value={env.key}
            disabled={true}
            onChange={validateKey}
            onBlur={validateKey}
            // onSubmit={validateKey}
            spellCheck="false"
            className="w-full rounded border-[1.5px] border-light-gray"
          />
        )}

        <input
          // name={`env.${id}.value`}
          placeholder="somevalue"
          // onBlur={validateKey}
          onChange={validateValue}
          onBlur={validateValue}
          type="text"
          value={env.value}
          spellCheck="false"
          className="w-full rounded border-[1.5px] border-light-gray"
        />

        {canRemove && (
          <button
            type="button"
            onClick={deleteVariable}
            className="rounded border-[1.5px] border-light-gray p-2 transition-all hover:bg-light-gray"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              className="h-6 w-6 fill-none stroke-gray"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
        )}
      </div>
      <div
        // onMouseEnter={showTooltip}
        // onMouseLeave={hideTooltip}
        id={id}
        className=" flex items-center gap-2"
      >
        <p className="w-full text-sm font-medium text-red-500">
          {isError.variableKey && error.variableKey}
        </p>
        <p className="w-full text-sm font-medium text-red-500">
          {isError.variableValue && error.variableValue}
        </p>
      </div>
      {/* {keyExplanation !== "" && (
        <span
          id={"tooltip" + id}
          class="bg-gray-800 absolute top-10 scale-0 rounded p-2 text-xs text-black transition-all">
          {keyExplanation}
        </span>
      )} */}
    </div>
  );
};

const EnviromentVariableField = ({
  envCallback,
  forceValidate,
  title,
  defaultEnvs,
  canAdd = true,
}) => {
  const [envVars, setEnvVars] = useState([]);
  const [envVariablesCounter, setEnvVariablesCounter] = useState(0);
  const [envs, setEnvs] = useState([]);
  const [shouldValidate, setShouldValidate] = useState(false);

  useEffect(() => {
    console.log("FORCING VALIDATION");
    setShouldValidate(forceValidate);
  }, [forceValidate]);

  useEffect(() => {
    if (defaultEnvs) {
      setEnvVars([]);
      setEnvs([]);
      defaultEnvs?.forEach((env) => {
        addEnvVariable(
          env.key,
          env.allowKeyChange,
          env.defaultKey,
          env.value,
          env.forceValidate,
          env.keyExplanation,
          env.canRemove
        );
      });
    }
  }, [defaultEnvs]);

  const getEnvCallback = (id, env, isValid) => {
    setEnvs((prev) => {
      let newEnvs = [...prev];
      console.log("get env callback:", id, env, isValid);
      console.log("current envs in", title, ":", prev);

      const index = newEnvs.findIndex((item) => item.id === id);
      if (index !== -1) {
        newEnvs[index] = { ...newEnvs[index], env, isValid };
      } else {
        newEnvs.push({ id, env, isValid });
      }
      console.log("new envs in", title, ":", newEnvs);
      return newEnvs;
    });
  };

  useEffect(() => {
    let isError = false;
    envs.forEach((e) => {
      isError = !e.isValid;
    });

    console.log("sending to env callback");
    console.log("envs:", envs);
    console.log("envvars:", envVars);
    console.log("isError:", isError);
    envCallback(envs, isError);
  }, [envs]);

  const deleteVariable = (id) => {
    console.log("delete variable of id:", id);
    console.log("envs:", envs);
    console.log("envVars:", envVars);
    setEnvVars((current) => {
      return current.filter((env) => env.id !== id);
    });
    setEnvs((current) => {
      return current.filter((e) => {
        console.log("envs e", e);
        if (e.id === id) {
          console.log("found");
        }
        return e.id !== id;
      });
    });
  };

  const addEnvVariable = (
    id = "",
    allowKeyChange = true,
    defaultKey = "",
    defaultValue = "",
    forceValidate = false,
    // callback = getEnvCallback,
    keyExplanation = "",
    canRemove = true
  ) => {
    const newId = envVariablesCounter;
    // console.log("key", key);
    // console.log("newId", newId);
    if (id === "") {
      // console.log("key is ''");
      id = newId;
    }
    // console.log("key after", key);
    let e = {
      id: id,
      key: id,
      value: defaultValue,
      allowKeyChange: allowKeyChange,
      defaultKey: defaultKey,
      forceValidate: forceValidate,
      sendEnvCallback: getEnvCallback,
      keyExplanation: keyExplanation,
      canRemove: canRemove,
      deleteVariable: () => {
        deleteVariable(id);
      },
    };
    setEnvVars((current) => {
      return current.concat(e);
    });
    // setEnvs((current) => {
    //   return current.concat({
    //     id: id,
    //     env: {key: id, value: ""},
    //     isValid: false,
    //   });
    // });
    setEnvVariablesCounter(newId + 1);
  };

  return (
    <div className="mb-1">
      {title}
      {envVars.map((env) => (
        <EnvironmentVariable
          id={env.key}
          key={env.key}
          deleteVariable={env.deleteVariable}
          sendEnvCallback={env.sendEnvCallback}
          forceValidate={env.forceValidate}
          defaultKey={env.defaultKey}
          value={env.value}
          keyExplanation={env.keyExplanation}
          allowKeyChange={env.allowKeyChange}
          canRemove={env.canRemove}
        />
      ))}
      {canAdd && (
        <button
          type="button"
          onClick={() => {
            addEnvVariable("", true, "", "", false, "", true);
          }}
          className="w-full rounded border-[1.5px] border-light-gray py-2 transition-all hover:bg-light-gray"
        >
          new env variable
        </button>
      )}
    </div>
  );
};

export { EnviromentVariableField, EnvironmentVariable as EnviromentVariable };
