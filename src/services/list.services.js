import axios from "axios";
import {
  isGuestModeEnabled,
  isGuestToken,
  readGuestList,
  resolveGuestListItem,
  writeGuestList,
} from "./guestMode";

const BackendURL = import.meta.env.VITE_BACKEND_URL;

export const addToUserList = async (token, data) => {
  if (isGuestModeEnabled() && !token) {
    return {
      success: false,
      data: {
        message: "Please log in with guest / guest to use the demo list.",
      },
    };
  }

  if (isGuestModeEnabled() && isGuestToken(token)) {
    const list = readGuestList();
    const existingIndex = list.findIndex(
      (item) => item.mediaId === data.mediaId && item.type === data.type,
    );
    const existingItem = existingIndex >= 0 ? list[existingIndex] : null;
    const nextItem = resolveGuestListItem(data, existingItem);

    if (existingIndex >= 0) {
      list[existingIndex] = {
        ...existingItem,
        ...nextItem,
      };
    } else {
      list.unshift(nextItem);
    }

    writeGuestList(list);

    return {
      success: true,
      data: nextItem,
    };
  }

  try {
    const response = await axios.post(`${BackendURL}/list/add`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error.response);
    return error?.response?.data ?? "Unable to reach the backend.";
  }
};

export const getUserList = async (token) => {
  if (isGuestModeEnabled() && !token) {
    return {
      success: false,
      data: {
        message: "Please log in with guest / guest to view the demo list.",
      },
    };
  }

  if (isGuestModeEnabled() && isGuestToken(token)) {
    return {
      success: true,
      data: readGuestList(),
    };
  }

  try {
    const response = await axios.get(`${BackendURL}/list`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
    return error?.response?.data ?? "Unable to reach the backend.";
  }
};

export const removeFromList = async (token, listId) => {
  if (isGuestModeEnabled() && !token) {
    return {
      success: false,
      data: {
        message: "Please log in with guest / guest to use the demo list.",
      },
    };
  }

  if (isGuestModeEnabled() && isGuestToken(token)) {
    const nextList = readGuestList().filter((item) => item.id !== listId);
    writeGuestList(nextList);

    return {
      success: true,
      data: { message: "Movie removed from list" },
    };
  }

  try {
    const response = await axios.delete(`${BackendURL}/list/remove/${listId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    return error?.response?.data ?? "Unable to reach the backend.";
  }
};

export const updateList = async (token, listId, data) => {
  if (isGuestModeEnabled() && !token) {
    return {
      success: false,
      data: {
        message: "Please log in with guest / guest to use the demo list.",
      },
    };
  }

  if (isGuestModeEnabled() && isGuestToken(token)) {
    const list = readGuestList();
    const itemIndex = list.findIndex((item) => item.id === listId);

    if (itemIndex === -1) {
      return {
        success: false,
        data: { message: "Movie not found" },
      };
    }

    list[itemIndex] = {
      ...list[itemIndex],
      ...data,
    };
    writeGuestList(list);

    return {
      success: true,
      data: list[itemIndex],
    };
  }

  try {
    const response = await axios.patch(
      `${BackendURL}/list/update/${listId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    return error?.response?.data ?? "Unable to reach the backend.";
  }
};
