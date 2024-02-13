import axios from 'axios';

export const saveComplaint = async (formData) => {
    try{
        await axios.post(
            "http://13.126.190.50:8082/complaints/create/complaints",
            formData
          );
    } catch(error) {
        console.error("saveComplaint",error)
    }
}

export const deleteProject = async (id) => {
    try{
        await axios.delete(`http://13.126.190.50:8082/complaints/delete/${id}`)
    } catch(error) {
        console.error("Error deleting project",error)
    }
};

export const loadComplaint = async () => {
    try {
       const result =  await axios.get(
            "http://13.126.190.50:8082/complaints/get/complaints",
            {
              validateStatus: () => {
                return true;
              },
            }
        
          );
          return result.data
    } catch (error) {
        console.error("Error load complaint", error)
    }
}

