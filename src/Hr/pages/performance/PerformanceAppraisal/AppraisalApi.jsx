import axios from "axios";

const url = "http://13.126.190.50:8083"

export const savePerformances = async (formData) => {
    try{
        await axios.post(
            `${url}/performanceappraisal/create/performanceappraisal`,
            formData
          );
    } catch(error) {
        console.error("savePerformances",error)
    }
}

export const loadPerformances = async () => {
  try {
     const result =  await axios.get(
          `${url}/performanceappraisal/get/performanceappraisal`,
          {
            validateStatus: () => {
              return true;
            },
          }
      
        );
        return result.data
  } catch (error) {
      console.error("Error load performances", error)
  }
}

export const deleteAppraisal = async (id) => {
  try{
      await axios.delete(`${url}/performanceappraisal/delete/${id}`)
  } catch(error) {
      console.error("Error deleting performances",error)
  }
};