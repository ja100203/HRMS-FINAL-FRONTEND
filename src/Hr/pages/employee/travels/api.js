import axios from 'axios';

export const saveTravel = async (formData) => {
    try{
        await axios.post(
            "http://13.126.190.50:5000/travels/create/travels",
            formData
          );
    } catch(error) {
        console.error("saveTravel",error)
    }
}

export const deleteTravel = async (id) => {
    try{
        await axios.delete(`http://13.126.190.50:5000/travels/delete/${id}`)
    } catch(error) {
        console.error("Error deleting trvel",error)
    }
};

export const loadTravel= async () => {
    try {
       const result =  await axios.get(
            "http://13.126.190.50:5000/travels/get/travels",
            {
              validateStatus: () => {
                return true;
              },
            }
        
          );
          return result.data
    } catch (error) {
        console.error("Error load travel", error)
    }
}
export const fetchEmployee = async () => {
    try {
        const response = await axios.get(
            "http://13.126.190.50:5000/employee/get/employee"
          );
          return response.data
    } catch (error){
        console.error("Error fetching company data", error);
        return []
    }
}



