import {useState} from 'react'

const StateUnit = () => {
    const [unit, SetUnit] = useState([]);
    const [open, setOpen] = useState(false);
    const [recDelete,setRecDelete] =useState("")
    const [nameError, setNameError] = useState("")
    const [formData, setFormData] = useState({
        name: "",
       signature: "",
      });
  return {
   nameError, setNameError,open,setOpen,recDelete,setRecDelete,formData,setFormData,unit,SetUnit
  }
}

export default StateUnit