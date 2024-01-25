import React, {useState} from 'react'
import AdvanceSalaryView from './Mainfile/AdvanceSalaryView';

const StateAdvanceSalary = () => {
    const [formVisible, setFormVisible] = useState(false);
    const [toggle, setToggle] = useState(false);
    const [dueSalary, setDueSalary] = useState(0)
    const [company, setCompany] = useState([]);
    const [location, setLocation] = useState([]);
    const [recDelete, setRecDelete] = useState("");
    const [dateError, setDateError] = useState(false);
    const [department, setDepartment] = useState([]);
    const [advanceSalary, setAdvanceSalary] = useState([]);
    const [formData, setFormData] = useState({
      createdDate: "",
      employeeName: "",
      salary: "",
      advanceAmount: "",
      salaryDue: "",
      monthAndYear: "",
      });
    return {
       advanceSalary,setAdvanceSalary,formData,setFormData,dueSalary, setDueSalary,recDelete,setRecDelete,department,setDepartment, formVisible,setFormVisible,toggle,setToggle,company,setCompany,location,setLocation,dateError,setDateError
 
    }
}

export default StateAdvanceSalary