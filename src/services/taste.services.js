import axios from "axios";

const BackendURL = import.meta.env.VITE_BACKEND_URL;

export const getTaste = async (token) => {
  try {
    const response = await axios.get(`${BackendURL}/taste`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateTaste = async (token, data) => {
  try {
    const response = await axios.patch(`${BackendURL}/taste/update`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
