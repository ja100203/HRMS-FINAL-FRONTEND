import axios from 'axios';

export const saveAddbank = async (formData) => {
    try{
        await axios.post(
            "http://13.126.190.50:8092/addbank/create/addbank",
            formData
          );
    } catch(error) {
        console.error("saveAddBank",error)
    }
}

export const deleteBank = async (id) => {
    try{
        await axios.delete(`http://13.126.190.50:8092/addbank/delete/${id}`)
    } catch(error) {
        console.error("Error deleting addbank",error)
    }
};

export const loadAddbank = async () => {
    try {
       const result =  await axios.get(
            "http://13.126.190.50:8092/addbank/get/addbank",
            {
              validateStatus: () => {
                return true;
              },
            }
        
          );
          return result.data
    } catch (error) {
        console.error("Error loading addbank", error)
    }
}

export const loadBankById = async (id) => {
    try {
       const result =  await axios.get(
            `http://13.126.190.50:8092/addbank/get/${id}`,
            {
              validateStatus: () => {
                return true;
              },
            }
        
          );
          return result.data
    } catch (error) {
        console.error("Error loading addbank", error)
    }
}

export const updateBank = async (formData, id) => {
    try {
        const result = await axios.patch(
          `http://13.126.190.50:8092/addbank/update/${id}`,
          formData
        );
    
        return result.data;
      } catch (error) {
        console.error('Error updating Bank Details:', error);
        throw error;
      }
};


