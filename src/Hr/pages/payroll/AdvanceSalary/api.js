import axios from 'axios';

export const saveAdvanceSalary = async (formData) => {
    try{
        await axios.post(
            "http://13.126.190.50:5000/advancesalery/create/advancesalery",
            formData
          );
    } catch(error) {
        console.error("saveAdvanceSalary",error)
    }
}

export const deleteAdvanceSalary = async (id) => {
    try{
        await axios.delete(`http://13.126.190.50:5000/advancesalery/delete/${id}`)
    } catch(error) {
        console.error("Error deleting Advance Salary",error)
    }
};

export const loadAdvanceSalary = async () => {
    try {
       const result =  await axios.get(
            "http://13.126.190.50:5000/advancesalery/get/advancesalery",
            {
              validateStatus: () => {
                return true;
              },
            }
        
          );
          return result.data
    } catch (error) {
        console.error("Error load Advance Salary", error)
    }
}

export const fetchCompanies = async () => {
    try {
        const response = await axios.get(
            "http://13.126.190.50:5000/company/get/company"
          );
          return response.data
    } catch (error){
        console.error("Error fetching company data", error);
        return []
    }
}

export const fetchLocations = async () => {
    try {
        const response = await axios.get(
          "http://13.126.190.50:5000/location/get/location"
        );
       return response.data 
      } catch (error) {
        console.error("Error fetching Advance Salary data", error);
      }
}