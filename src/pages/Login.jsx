import {useState} from "react";
import {API} from "../utils/api";
import STORE from "../utils/store";
import {refreshTokens, retriveTokens, deleteTokens} from "../utils/tokens";
import ErrorMessage from "../components/ErrorMessage";

const Login = function ({setLoggedIn}) {
  const [error, setError] = useState(false);

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

  if (refreshToken && refreshTokenExpiration) {
    let expirationDate = new Date(refreshTokenExpiration);
    if (expirationDate > now) {
      refreshTokens(refreshToken, setError, setLoggedIn);
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
    //do request to api.ipaas.localhost/api/v1/login with axios
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
      <div className="w-full md:w-1/4">
        <h1 className="text-center text-6xl font-bold md:text-8xl">IPAAS</h1>
        <p className="mt-1 text-center text-xl">itis paleocapa as a service</p>
        <button
          onClick={handleLogin}
          className="mt-8 w-full rounded-md bg-blue py-2 text-lg font-medium text-white transition-all hover:-translate-y-1">
          accedi con GitHub
        </button>
        <div className="mt-8">
          {error ? <ErrorMessage message="c'è stato un errore" /> : null}
        </div>
      </div>
    </div>
  );
};

export default Login;
