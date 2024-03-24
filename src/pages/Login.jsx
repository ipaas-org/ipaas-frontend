import {useState} from "react";
import {API} from "../utils/api";
import STORE from "../utils/store";
import {refreshTokens, retriveTokens, deleteTokens} from "../utils/tokens";
import ErrorMessage from "../components/ErrorMessage";

const Login = function ({setLoggedIn}) {
  const [error, setError] = useState({isError: false, message: ""});
  const [acceptWarning, setAcceptWarning] = useState(false);

  let accessToken = STORE.Storage.Get("accessToken");
  let accessTokenExpiration = STORE.Storage.Get("accessTokenExpiration");
  let refreshToken = STORE.Storage.Get("refreshToken");
  let refreshTokenExpiration = STORE.Storage.Get("refreshTokenExpiration");
  const now = new Date();

  if (accessToken && accessTokenExpiration) {
    let expirationDate = new Date(accessTokenExpiration);
    // console.log("expirationDate:", expirationDate);
    // console.log("now:", now);
    // console.log("expirationDate > now:", expirationDate > now);
    if (expirationDate > now) {
      console.log("accessToken valid");
      setLoggedIn(true);
      return;
    }
  }

  const successCallback = function () {
    setLoggedIn(true);
    setError({isError: false});
  };

  const errorCallback = function () {
    setError({isError: trsetAcceptWarning, setErrorue});
  };

  if (refreshToken && refreshTokenExpiration) {
    let expirationDate = new Date(refreshTokenExpiration);
    if (expirationDate > now) {
      refreshTokens(refreshToken, successCallback, errorCallback);
    } else {
      deleteTokens();
    }
  }

  console.log("url:", window.location.href);
  if (window.location.href.includes("key")) {
    const url = new URL(window.location.href);
    const key = url.searchParams.get("key");
    console.log("key:", key);
    retriveTokens(key, setError, setLoggedIn);
    // window.location.replace("/");
  }

  const handleLogin = async function () {
    if (!acceptWarning) {
      console.log("needs to accept warning");
      setError({
        isError: true,
        message: "you must accept the warning to continue",
      });
      return;
    }

    const response = await API.get("login", {
      headers: {
        "X-Login-Kind": "frontend",
      },
    });
    // console.log("reponse:", response);
    let data = await response.data;
    console.log("login data:", data);
    window.location.replace(data.data);
    // setLoggedIn(true);
  };
  return (
    <div className="flex h-screen items-center justify-center px-2">
      <div className="w-full md:w-1/2">
        <h1 className="text-center text-6xl font-bold md:text-8xl">CARGOWAY</h1>
        <p className="mt-1 text-center text-xl">
          Applications ready for takeoff
        </p>
        <button
          onClick={handleLogin}
          className="mt-8 w-full rounded-md bg-blue py-2 text-lg font-medium text-white transition-all hover:-translate-y-1">
          Login with GitHub
        </button>
        <div className="mt-8">
          {error.isError ? <ErrorMessage message={error.message} /> : null}
        </div>
        {!acceptWarning ? (
          <>
            <br />
            <AlphaWarning
              setAcceptWarning={setAcceptWarning}
              setError={setError}
            />
          </>
        ) : null}
      </div>{" "}
    </div>
  );
};

export default Login;

const AlphaWarning = function ({setAcceptWarning, setError}) {
  return (
    <div role="alert">
      <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
        Alpha
      </div>
      <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
        <p>
          This version of cargoway is currently in alpha so the interface or api
          might change wihouth worrying about keeping retro-compatibility <br />
          The cargoway team is not able to garantee uptime or data retention.
          <br />
          <b>DO NOT CURRENTLY USE CARGOWAY FOR ANY PRODUCTION APPLICATION</b>
          <br />
          <br />
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md"
            onClick={() => {
              setAcceptWarning(true);
              setError({isError: false, message: ""});
            }}>
            I understand
          </button>
        </p>
      </div>
    </div>
  );
};
