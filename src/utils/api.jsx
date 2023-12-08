import STORE from "./store";
import axios from "axios";

const API = axios.create({
  baseURL: STORE.Config.API,
  headers: STORE.Config.HEADERS,
});

export {API};
