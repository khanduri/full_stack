import axios from "axios";

import { getStoredToken, deleteToken } from "utils/authentication";

// export const BASE_URL = "http://localhost:5000";
export const BASE_URL = process.env.REACT_APP_API_DOMAIN;

let API = generateAPIInstance(getStoredToken());
function generateAPIInstance(jwt_token) {
  let instance = axios.create({
    baseURL: process.env.REACT_APP_API_DOMAIN + "/api/v1",
    // baseURL: "http://divshow-api.bytebeacon.com" + "/api/v1",
    headers: {
      Authorization: "Bearer " + jwt_token,
    },
  });
  return instance;
}

export function handleError(error, history) {
  if (error.response === undefined) {
    console.log("Something went wrong! Error response came back undefined.");
    console.log(error);
    return;
  }

  const status_code = error.response.status;
  if (status_code === 401) {
    alert("Login Expired! Please login again.");
    deleteToken();
    history.push("/");
  } else if (status_code === 500) {
    console.log(error.response);
    alert(error.response.data.data.message);
  } else {
    console.log(error.response);
    alert(error.response.data.data.message);
  }
}

export default API;
