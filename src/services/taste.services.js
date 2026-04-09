import axios from "axios";
import {
  isGuestModeEnabled,
  isGuestToken,
  readGuestTaste,
  writeGuestTaste,
} from "./guestMode";

const BackendURL = import.meta.env.VITE_BACKEND_URL;

export const getTaste = async (token) => {
  if (isGuestModeEnabled() && !token) {
    return {
      success: false,
      data: { message: "Please log in with guest / guest to view demo taste data." },
    };
  }

  if (isGuestModeEnabled() && isGuestToken(token)) {
    return {
      success: true,
      data: readGuestTaste(),
    };
  }

  try {
    const response = await axios.get(`${BackendURL}/taste`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    return error?.response?.data ?? "Unable to reach the backend.";
  }
};

export const updateTaste = async (token, data) => {
  if (isGuestModeEnabled() && !token) {
    return {
      success: false,
      data: { message: "Please log in with guest / guest to use demo taste data." },
    };
  }

  if (isGuestModeEnabled() && isGuestToken(token)) {
    writeGuestTaste(data);

    return {
      success: true,
      data,
    };
  }

  try {
    const response = await axios.patch(`${BackendURL}/taste/update`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    return error?.response?.data ?? "Unable to reach the backend.";
  }
};
