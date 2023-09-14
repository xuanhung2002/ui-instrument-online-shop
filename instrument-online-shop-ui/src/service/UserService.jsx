import axios from "axios";
import { API_GET_ITEM_BY_ID, API_LOGIN } from "./api";

const loginApi = (username, password) => {
  return axios.post(API_LOGIN, { username, password });
};

const getDetailsItemApi = (itemId) => {
  return axios.get(API_GET_ITEM_BY_ID + itemId);
};

// const addItemToCart
export { loginApi };
export { getDetailsItemApi };
