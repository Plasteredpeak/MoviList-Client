import axios from "axios";
import {
  activateGuestSession,
  getGuestLoginMessage,
  getGuestSignupMessage,
  isGuestCredentials,
  isGuestModeEnabled,
} from "./guestMode";

const BackendURL = import.meta.env.VITE_BACKEND_URL;

export const login = async (data) => {
  if (isGuestModeEnabled()) {
    if (isGuestCredentials(data)) {
      activateGuestSession();

      return {
        success: true,
        data: {
          token: localStorage.getItem("token"),
          user: JSON.parse(localStorage.getItem("user")),
        },
      };
    }

    return {
      success: false,
      data: getGuestLoginMessage(),
    };
  }

  try {
    const response = await axios.post(`${BackendURL}/users/login`, data);
    return response.data;
  } catch (error) {
    return error?.response?.data ?? "Unable to reach the backend.";
  }
};

export const signup = async (data) => {
  if (isGuestModeEnabled()) {
    return {
      success: false,
      data: getGuestSignupMessage(),
    };
  }

  try {
    const response = await axios.post(`${BackendURL}/users/signup`, data);
    return response.data;
  } catch (error) {
    return error?.response?.data ?? "Unable to reach the backend.";
  }
};
