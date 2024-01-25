import axios from "axios";

const url = "http://13.126.190.50:5000"

export const saveSubType = async (formData) => {
    try{
        await axios.post(
            `${url}/subType/create/subType`,
            formData
          );
    } catch(error) {
        console.error("saveSubType",error)
    }
}

export const loadSubType = async () => {
    try {
       const result =  await axios.get(
            `${url}/subType/get/subType`,
            {
              validateStatus: () => {
                return true;
              },
            }
        
          );
          return result.data
    } catch (error) {
        console.error("Error load subType", error)
    }
}

  export const deleteSubType = async (id) => {
    try{
        await axios.delete(`${url}/SubType/delete/${id}`)
    } catch(error) {
        console.error("Error deleting subType",error)
    }
};