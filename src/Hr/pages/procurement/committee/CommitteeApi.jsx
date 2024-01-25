import axios from "axios";

const url = "http://13.126.190.50:5000"

export const saveCommittee = async (formData) => {
    try{
        await axios.post(
            `${url}/committees/create/committees`,
            formData,{headers: {
              'Content-Type': 'multipart/form-data'
            }}
          );
    } catch(error) {
        console.error("saveCommittee",error)
    }
}

export const loadCommittee = async () => {
    try {
       const result =  await axios.get(
            `${url}/committees/get/committees`,
            {
              validateStatus: () => {
                return true;
              },
            }
        
          );
          return result.data
    } catch (error) {
        console.error("Error load committee", error)
    }
}



  export const deleteCommittee = async (id) => {
    try{
        await axios.delete(`${url}/committees/delete/${id}`)
    } catch(error) {
        console.error("Error deleting committee",error)
    }
};