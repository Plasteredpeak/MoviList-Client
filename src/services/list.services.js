import axios from "axios";

const BackendURL = import.meta.env.VITE_BACKEND_URL;

export const addToUserList = async (token, data) => {
  try {
    const response = await axios.post(`${BackendURL}/list/add`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error.response);
    return error.response.data;
  }
};

export const getUserList = async (token, userId) => {
  try {
    const response = await axios.get(`${BackendURL}/list/${userId}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const removeFromList = async (token, listId) => {
  try {
    const response = await axios.delete(`${BackendURL}/list/remove/${listId}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateList = async (token, listId, data) => {
  try {
    const response = await axios.patch(
      `${BackendURL}/list/update/${listId}`,
      data,
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
