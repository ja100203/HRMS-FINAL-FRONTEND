import {useState} from 'react'
import TicketView from "../tickets/mainfile/TicketView";

const StateTicket = () => {
    const [formVisible, setFormVisible] = useState(false);
    const [toggle, setToggle] = useState(false);
    const  [formErrors,setFormerrors]=useState([]);
    const[formControl,setFormControl]=useState(false);
    const [ticket, setTicket] = useState([]);
    const [employee, setEmployee] = useState([]);
    const [recDelete, setRecDelete] = useState("");
   
   

    const [formData, setFormData] = useState({
        ticketsCode: "",
        subject: "",
        employeeName: "",
        priority: "",
        date: "",
      });
    return {
       formData,setFormData, formVisible,formErrors,setFormerrors,setFormVisible,toggle,setToggle,ticket, setTicket,employee, formControl,setFormControl,setEmployee,recDelete,setRecDelete
 
    }
}

export default StateTicket