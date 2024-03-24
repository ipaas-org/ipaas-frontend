import moment from "moment";
const DATA = "data_";

var STORE = {
  Config: {
    API: "http://localhost:8082/api/v1/",
  },
  Storage: {
    Clear: function () {
      return window.localStorage.clear();
    },
    Get: function (key) {
      return window.localStorage.getItem(key);
    },
    GetBool: function (key) {
      let data = window.localStorage.getItem(key);
      if (data === "true") {
        return true;
      }
      return false;
    },
    Set: function (key, value) {
      window.localStorage.setItem(key, value);
    },
    Del: function (key) {
      window.localStorage.removeItem(key);
    },
    DelObject: function (key) {
      window.localStorage.removeItem(DATA + key);
      window.localStorage.removeItem(DATA + key + "_ct");
    },
    GetObject: function (key) {
      let jsonData = null;
      try {
        jsonData = JSON.parse(window.localStorage.getItem(DATA + key));
        // console.log(
        //   "%cGET OBJECT:",
        //   "background: lightgreen; color: black",
        //   key,
        //   jsonData
        // );
      } catch (e) {
        console.log(e);
        return undefined;
      }

      if (jsonData === null) {
        return undefined;
      }

      return jsonData;
    },
    SetObject: function (key, object) {
      try {
        console.log(
          "%cSET OBJECT:",
          "background: lightgreen; color: black",
          key,
          object
        );
        let data = JSON.stringify(object);
        window.localStorage.setItem(DATA + key, data);
        window.localStorage.setItem(DATA + key + "_ct", moment().unix());
      } catch (e) {
        console.log(e);
        alert(e);
      }
    },
  },
  SessionCache: {
    Clear: function (key) {
      return window.sessionStorage.clear();
    },
    Get: function (key) {
      return window.sessionStorage.getItem(key);
    },
    GetBool: function (key) {
      let data = window.sessionStorage.getItem(key);
      if (data === "true") {
        return true;
      }
      return false;
    },
    Set: function (key, value) {
      window.sessionStorage.setItem(key, value);
    },
    Del: function (key) {
      window.sessionStorage.removeItem(key);
    },
    DelObject: function (key) {
      window.sessionStorage.removeItem(DATA + key);
      window.sessionStorage.removeItem(DATA + key + "_ct");
    },
    GetObject: function (key) {
      let jsonData = null;
      try {
        jsonData = JSON.parse(window.sessionStorage.getItem(DATA + key));
        console.log(
          "%cGET OBJECT:",
          "background: lightgreen; color: black",
          key,
          jsonData
        );
      } catch (e) {
        console.log(e);
        return undefined;
      }

      if (jsonData === null) {
        return undefined;
      }

      return jsonData;
    },
    SetObject: function (key, object) {
      try {
        console.log(
          "%cSET OBJECT:",
          "background: lightgreen; color: black",
          key,
          object
        );
        let data = JSON.stringify(object);
        window.sessionStorage.setItem(DATA + key, data);
        window.sessionStorage.setItem(DATA + key + "_ct", moment().unix());
      } catch (e) {
        console.log(e);
        alert(e);
      }
    },
  },
};

export default STORE;
