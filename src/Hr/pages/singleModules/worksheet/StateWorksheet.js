import { useState } from 'react';


const StateWorksheet = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [project, setProject] = useState([]);
  const [employeeName, setEmployeeName] = useState([]);
  const [recDelete, setRecDelete] = useState("");
  const [dateError, setDateError] = useState(false);
  const [worksheet, setWorksheet] = useState([]);
  const [description,setDesciption] = useState([]);
  const [formData, setFormData] = useState({
    workSheetTitle: "",
    startDate: "",
    endDate: "",
    estimatedHour: "",
    project: "",
    employeeName: "",
    assignedTo: "",
    description: "",
    taskName: "",
    challengepart: "",
    workProgress: "",
    createdDate: "",
  });


  return {
    formData,
    setFormData,
    worksheet,
    setWorksheet,
    formVisible,
    setFormVisible,
    toggle,
    setToggle,
    project,
    setProject,
    employeeName,
    setEmployeeName,
    recDelete,
    setRecDelete,
    dateError,
    setDateError,
    description,
    setDesciption
  }
}

export default StateWorksheet;
