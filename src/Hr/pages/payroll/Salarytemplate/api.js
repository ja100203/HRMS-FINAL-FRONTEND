import axios from 'axios';

export const saveSalaryTemplate = async (formData) => {
    try{
        await axios.post(
            "http://13.126.190.50:5000/salaryTemplate/create/salaryTemplate",
            formData
          );
    } catch(error) {
        console.error("savePayroll",error)
    }
}

export const deleteSalaryTemplate = async (id) => {
    try{
        await axios.delete(`http://13.126.190.50:5000/salaryTemplate/delete/${id}`)
        loadSalaryTemplate();
    } catch(error) {
        console.error("Error deleting Payroll",error)
    }
};

export const loadSalaryTemplate = async () => {
    try {
       const result =  await axios.get(
            "http://13.126.190.50:5000/salaryTemplate/get/salaryTemplate",
            {
              validateStatus: () => {
                return true;
              },
            }
          );
          return result.data
    } catch (error) {
        console.error("Error load department", error)
    }
}