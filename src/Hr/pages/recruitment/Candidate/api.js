import axios from 'axios';

export const saveCandidate = async (formData) => {
    try{
        await axios.post(
            "http://13.126.190.50:5000/candidates/create/candidates",
            formData
          );
    } catch(error) {
        console.error("saveCandidates",error)
    }
}

export const deleteCandidate = async (id) => {
    try{
        await axios.delete(`http://13.126.190.50:5000/candidates/delete/${id}`)
    } catch(error) {
        console.error("Error deleting Candidate",error)
    }
};

export const loadCandidate = async (id) => {
    try {
       const result =  await axios.get(
        `http://13.126.190.50:5000/candidates/download/${id}`,
            {
              validateStatus: () => {
                return true;
              },
            }
        
          );
          return result.data
    } catch (error) {
        console.error("Error load Candidate", error)
    }
}
