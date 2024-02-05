import axios from "axios";

const url = "http://13.126.190.50:8081";

export const saveExpenses = async (formData) => {
  try {
    await axios.post(`${url}/expence/create/expence`, formData, {
      headers: {
        "Content-Type":
          "multipart/form-data; boundary=<calculated when request is sent>",
      },
    });
  } catch (error) {
    console.error("saveDesignation", error);
  }
};

export const loadExpenses = async () => {
  try {
    const result = await axios.get(`${url}/expence/get/expence`, {
      validateStatus: () => {
        return true;
      },
    });
    return result.data;
  } catch (error) {
    console.error("Error load department", error);
  }
};

export const deleteExpenses = async (id) => {
  try {
    await axios.delete(`${url}/expence/delete/${id}`);
  } catch (error) {
    console.error("Error deleting expence", error);
  }
};
