import axios from 'axios';

export const  saveLoan = async (formData) => {
    try{
        await axios.post(
            "http://13.126.190.50:5000/grantloan/create/grantloan",
            formData
          );
    } catch(error) {
        console.error("saveLoan",error)
    }
}

export const deleteLoan = async (id) => {
    try{
        await axios.delete(`http://13.126.190.50:5000/grantloan/delete/${id}`)
    } catch(error) {
        console.error("Error deleting loan",error)
    }
};

export const loadLoan = async () => {
    try {
       const result =  await axios.get(
            "http://13.126.190.50:5000/grantloan/get/grantloan",
            {
              validateStatus: () => {
                return true;
              },
            }
        
          );
          return result.data
    } catch (error) {
        console.error("Error loading loan", error)
    }
}


