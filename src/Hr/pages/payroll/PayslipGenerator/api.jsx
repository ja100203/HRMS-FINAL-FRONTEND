import axios from 'axios';

export const savePayslipGenerator = async (formData) => {
    try{
        await axios.post(
            "http://13.126.190.50:8085/payslipGenerator/create/payslipGenerator",
            formData
          );
    } catch(error) {
        console.error("savePayroll",error)
    }
}

export const deletePayslipGenerator = async (id) => {
    try{
        await axios.delete(`http://13.126.190.50:8085/payslipGenerator/delete/${id}`)
        loadPayslipGenerator();
    } catch(error) {
        console.error("Error deleting Payroll",error)
    }
};

export const loadPayslipGenerator = async () => {
    try {
       const result =  await axios.get(
            "http://13.126.190.50:8085/payslipGenerator/get/payslipGenerator",
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