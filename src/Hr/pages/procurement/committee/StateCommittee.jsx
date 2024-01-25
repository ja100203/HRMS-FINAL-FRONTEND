import {useState} from 'react'

const StateCommittee = () => {
    const [committe, SetCommittee] = useState([]);
    const [open, setOpen] = useState(false);
    const [recDelete,setRecDelete] =useState("")
    const [pdfFile,setPdfFile] = useState("")
    const [nameError, setNameError] = useState("")
    const [formData, setFormData] = useState({
        name: "",
       signature: "",
      });
  return {
   nameError, setNameError, pdfFile,setPdfFile,open,setOpen,recDelete,setRecDelete,formData,setFormData,committe,SetCommittee
  }
}

export default StateCommittee