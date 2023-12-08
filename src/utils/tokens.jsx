import {API} from "./api";
import STORE from "./store";

const refreshTokens = function (t, setError, setLoggedIn) {
  API.post("/token/refresh", {
    refresh_token: t,
  })
    .then((response) => {
      const accessToken = response.data.data.access_token;
      const refreshToken = response.data.data.refresh_token;
      const accessTokenExpiration = response.data.data.access_token_expires_in;
      const refreshTokenExpiration =
        response.data.data.refresh_token_expires_in;
      setTokens(
        accessToken,
        accessTokenExpiration,
        refreshToken,
        refreshTokenExpiration
      );
      setError(false);
      setLoggedIn(true);
    })
    .catch((error) => {
      console.log("error:", error);
      setError(true);
    });
};

const retriveTokens = function (key, setError, setLoggedIn) {
  API.post("retriveTokens", {key: key})
    .then((response) => {
      console.log(response);
      // console.log("response:", response);
      const accessToken = response.data.data.access_token;
      const refreshToken = response.data.data.refresh_token;
      const accessTokenExpiration = response.data.data.access_token_expires_in;
      const refreshTokenExpiration =
        response.data.data.refresh_token_expires_in;

      setTokens(
        accessToken,
        accessTokenExpiration,
        refreshToken,
        refreshTokenExpiration
      );
      setLoggedIn(true);
    })
    .catch((error) => {
      console.log("error:", error);
      setError(true);
    });
};

const deleteTokens = function () {
  STORE.Storage.Del("accessToken");
  STORE.Storage.Del("accessTokenExpiration");
  STORE.Storage.Del("refreshToken");
  STORE.Storage.Del("refreshTokenExpiration");
};

const setTokens = function (
  accessToken,
  accessTokenExpiration,
  refreshToken,
  refreshTokenExpiration
) {
  STORE.Storage.Set("accessToken", accessToken);
  STORE.Storage.Set("refreshToken", refreshToken);
  STORE.Storage.Set("accessTokenExpiration", accessTokenExpiration);
  STORE.Storage.Set("refreshTokenExpiration", refreshTokenExpiration);
};

const getAccessToken = function () {
  return STORE.Storage.Get("accessToken");
};

export {getAccessToken, refreshTokens, retriveTokens, deleteTokens, setTokens};
