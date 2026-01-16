import axios from "axios";
const BASE = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const API = axios.create({ baseURL: BASE });

// attach token helper
export const setAuthToken = (token) => {
  if (token) API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete API.defaults.headers.common["Authorization"];
};

// auth
export const registerUser = (payload) => API.post("/auth/register", payload);
export const loginUser = (payload) => API.post("/auth/login", payload);

// feedback
export const sendFeedback = (payload) => API.post("/feedback", payload);

// presets
export const savePreset = (payload) => API.post("/presets", payload);
export const getPresets = () => API.get("/presets");

// contact
export const sendContact = (payload) => API.post("/contact", payload);

// subscription
export const createCheckout = (payload) => API.post("/subscription/create-checkout-session", payload);
export const recordSubscription = (payload) => API.post("/subscription/record", payload);

// export default API in case needed
export default API;
