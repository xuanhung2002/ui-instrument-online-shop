import axios from "axios";
import { API_GET_ITEM_BY_ID, API_LOGIN, API_REGISTER } from "./api";

const loginApi = (username, password) => {
  return axios.post(API_LOGIN, { username, password });
};

const getDetailsItemApi = (itemId) => {
  return axios.get(API_GET_ITEM_BY_ID + itemId);
};

const registerApi = (name, email, username, password) => {
  return axios.post(API_REGISTER, { name, email, username, password });
};

// const addItemToCart
export { loginApi };
export { getDetailsItemApi };
export { registerApi };
