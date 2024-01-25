import axios from "axios";


export const saveEmployees = async (formData) => {
    try{
        await axios.post(
            "http://13.126.190.50:5000/employee/create/employee",
            formData,{headers: {
                'Content-Type': 'multipart/form-data'
              }}
          );
    } catch(error) {
        console.error("Error in saving Employees",error)
    }
}

export const deleteEmployee = async (id) => {
    try{
        await axios.delete(`http://13.126.190.50:5000/employee/delete/${id}`)
    } catch(error) {
        console.error("Error deleting employee",error)
    }
};

export const loademployees = async () => {
    try{
        const result = await axios.get(
            "http://13.126.190.50:5000/employee/get/employee",
            {
              validateStatus: () => {
                return true;
              },
            }
          );
          return result.data;
    }catch (error) {
        console.log("Error Loading Employee Details", error);
    }
  };

  

