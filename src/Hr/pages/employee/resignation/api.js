import axios from 'axios';

export const saveResignation = async (formData) => {
    try{
        await axios.post(
            "http://13.126.190.50:5000/resignations/create/resignations",
            formData
          );
    } catch(error) {
        console.error("saveResignation",error)
    }
}

export const deleteResignation = async (id) => {
    try{
        await axios.delete(`http://13.126.190.50:5000/resignations/delete/${id}`)
    } catch(error) {
        console.error("Error deleting department",error)
    }
};

export const loadResignation = async () => {
    try {
       const result =  await axios.get(
            "http://13.126.190.50:5000/resignations/get/resignations",
            {
              validateStatus: () => {
                return true;
              },
            }
        
          );
          return result.data
    } catch (error) {
        console.error("Error load reignation", error)
    }
}



