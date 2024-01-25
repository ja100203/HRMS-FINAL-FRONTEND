import axios from 'axios';

export const saveUser = async (formData) => {
    try{
        await axios.post(
            "http://13.126.190.50:5000/users/create/user",
            formData
          );
    } catch(error) {
        console.error("saveUser",error)
    }
}

export const deleteUser = async (id) => {
    try{
        await axios.delete(`http://13.126.190.50:5000/users/delete/${id}`)
    } catch(error) {
        console.error("Error deleting User",error)
    }
};

export const loadUser = async () => {
    try {
       const result =  await axios.get(
            "http://13.126.190.50:5000/user/get/user",
            {
              validateStatus: () => {
                return true;
              },
            }
        
          );
          return result.data
    } catch (error) {
        console.error("Error load user", error)
    }
}