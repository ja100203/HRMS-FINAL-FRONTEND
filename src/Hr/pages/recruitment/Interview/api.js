import axios from 'axios';

export const saveInterview = async (formData) => {
    try{
        await axios.post(
            "http://13.126.190.50:5000/interview/create/interview",
            formData
          );
    } catch(error) {
        console.error("saveInterview",error)
    }
}

export const deleteInterview = async (id) => {
    try{
        await axios.delete(`http://13.126.190.50:5000/interview/delete/${id}`)
    } catch(error) {
        console.error("Error deleting interview",error)
    }
};

export const loadInterview = async () => {
    try {
        const result = await axios.get(
            "http://13.126.190.50:5000/interview/get/interview",
            {
              validateStatus: () => {
                return true;
              },
            }
          );
          return result.data
    } catch (error) {
        console.error("Error load interview", error)
    }
}

