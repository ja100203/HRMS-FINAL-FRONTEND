import axios from 'axios';

export const saveWarning = async (formData) => {
    try{
        await axios.post(
            "http://13.126.190.50:8082/warnings/create/warnings",
            formData
          );
    } catch(error) {
        console.error("saveWarning",error)
    }
}

export const deleteWarning = async (id) => {
    try{
        await axios.delete(`http://13.126.190.50:8082/warnings/delete/${id}`)
    } catch(error) {
        console.error("Error deleting project",error)
    }
};

export const loadWarning = async () => {
    try {
       const result =  await axios.get(
            "http://13.126.190.50:8082/warnings/get/warnings",
            {
              validateStatus: () => {
                return true;
              },
            }
        
          );
          return result.data
    } catch (error) {
        console.error("Error load warning", error)
    }
}

