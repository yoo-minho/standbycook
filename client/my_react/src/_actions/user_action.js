import axios from "axios";
import { LOGIN_USER, REGISTER_USER, AUTH_USER } from "./types";

export function auth() {
  return new Promise((resolve) => {
    const request = axios.post("/api/recipe/auth").then((response) => response.data);
    resolve({
      type: AUTH_USER,
      payload: request,
    });
  });
}

export function signUp(signUpData) {
  const request = axios.post("/api/recipe/signUp", signUpData).then((response) => response.data);
  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function registerUser(dataToSubmit) {
  const request = axios
    .post("/api/users/register", dataToSubmit)
    .then((response) => response.data);
  return {
    type: REGISTER_USER,
    payload: request,
  };
}