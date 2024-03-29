import axios from "axios";

const url = "http://13.126.190.50:5000";

export const saveBalance = async (formData) => {
  try {
    await axios.post(`${url}/openingbalance/create/openingBalance`, formData);
  } catch (error) {
    console.error("saveBalance", error);
  }
};

export const loadBalance = async () => {
  try {
    const result = await axios.get(`${url}/openingbalance/get/openingBalance`, {
      validateStatus: () => {
        return true;
      },
    });
    return result.data;
  } catch (error) {
    console.error("Error load department", error);
  }
};

export const deleteBalance = async (id) => {
  try {
    await axios.delete(`${url}/openingbalance/delete/${id}`);
  } catch (error) {
    console.error("Error deleting balance", error);
  }
};
