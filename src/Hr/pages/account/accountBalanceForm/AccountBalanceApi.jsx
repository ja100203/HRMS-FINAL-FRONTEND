import axios from "axios";

const url = "http://13.126.190.50:8093"

export const saveAccountBalance = async (formData) => {
    try{
        await axios.post(
            `${url}/accountBalance/create/accountBalance`,
            formData
          );
    } catch(error) {
        console.error("saveAccountBalance",error)
    }
}


  export const loadAccountBalance = async () => {
    try {
       const result =  await axios.get(
            `${url}/accountBalance/get/accountBalance`,
            {
              validateStatus: () => {
                return true;
              },
            }
        
          );
          return result.data
    } catch (error) {
        console.error("Error load Account Balance", error)
    }
}

export const fetchEmployee = async () => {
  try {
      const response = await axios.get(
          "http://13.126.190.50:8092/employee/get/employee"
        );
        return response.data
  } catch (error){
      console.error("Error fetching employee data", error);
      return []
  }
}
export const fetchDepartment = async () => {
  try {
      const response = await axios.get(
          "http://13.126.190.50:8091/department/get/department"
        );
        return response.data
  } catch (error){
      console.error("Error fetching department data", error);
      return []
  }
}

export const deleteAccountBalance = async (id) => {
    try{
        await axios.delete(`${url}/accountBalance/delete/${id}`)
    } catch(error) {
        console.error("Error deleting Account Balance",error)
    }
};