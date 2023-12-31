import RootURL from "../config/config";
export const API_GET_ALL_ITEM = RootURL + "/api/item";
export const API_GET_ALL_CATEGORY = RootURL + "/api/category";
export const API_GET_ALL_BRAND = RootURL + "/api/brand";
export const API_LOGIN = RootURL + "/api/auth/login";
export const API_REGISTER = RootURL + "/api/auth/register";
export const API_GET_ITEM_BY_ID = RootURL + "/api/item/";
export const API_ADD_ITEM_TO_CART = RootURL + "/api/cart/add";
export const API_GET_ITEM_BY_CATEGORY_NAME = RootURL + "/api/item/";
export const API_GET_CART_ITEM = RootURL + "/api/cart";
export const API_REMOVE_CART_ITEM_FROM_CART = RootURL + "/api/cart/delete/";
export const API_UPDATE_CART_ITEM_QUANTITY = RootURL + "/api/cart/update";
export const API_ADD_ORDER = RootURL + "/api/order/add";
export const API_GET_ORDERS_OF_USER = RootURL + "/api/order";
export const API_GET_PAYMENT_REQ =
  RootURL + "/api/payment/create_VNPay_payment";
export const API_GET_ROLE = RootURL + "/api/auth/getRole";
export const API_SEARCH_ITEM = RootURL + "/api/item/search";
export const API_USER_CANCEL_ORDER = RootURL + "/api/order/userCancelOrder";
