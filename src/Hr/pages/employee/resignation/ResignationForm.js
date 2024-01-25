import React, { useEffect } from 'react'
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import * as api from "./api"
import { useNavigate } from 'react-router-dom';
import StateResignation from './StateResignation';


const ResignationForm = ({setFormVisible,setToggle,formData,setFormData}) => {

    const navigate = useNavigate()


    const {setOpen, setResignation
    } = StateResignation()

    const loadResignation = async () => {
        const result = await api.loadResignation()
        setResignation(result);
      };

      useEffect(() => {
        loadResignation()
       
      },[])
  
    
      const saveResignation= async () => {
    
        await api.saveResignation(formData);
        navigate("/hr/employee/resignation");
        
        setFormData({
           employeeName: "",
             resignationDate: "",
            noticeDate: "",
            resignationReason: "",
        });
      };

      const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
    
      const handleInputChange = (e) => {
        const { name, value } = e.target; // Destructure name and value from the event target
        setFormData({
          ...formData,
          [name]: value,
        });
      };

      const handleSubmit = (e) => {
        // Handle form submission logic here
        console.log("Form submitted:", formData);
        handleClose();
      };
    
       
      
        const cancelButton = ()=>
        {
          setFormVisible(false);
          setToggle(false);
          setFormData({
           employeeName: "",
           resignationDate: "",
           noticeDate: "",
           resignationReason: "",
            });
          };
          let buttonClick = formData.employeeName.length>0 &&
          formData.resignationDate.length>0 &&
          formData.noticeDate.length>0 &&
          formData.resignationReason.length>0;
      
    
      
  
    
    
  return (
    <form onSubmit={handleSubmit}>
      <div className="data-input-fields">
    <TextField
      margin="dense"
      label="employee name"
      type="text"
      fullWidth
      name="employeeName"
      id="employeeName"
      value={formData.employeeName}
      onChange={(e) => handleInputChange(e)}
      required
    />

      <TextField
        margin="dense"
        label="Notice Date"
        type="date"
        fullWidth
        name="noticeDate"
        id="noticeDate"
        value={formData.noticeDate}
        onChange={(e) => handleInputChange(e)}
        required
        
        InputLabelProps={{
          shrink: true,
        }}
      />
      </div>
 <div style={{ display: "flex" }}>
      <TextField
        margin="dense"
        label="Resignation Date"
        type="date"
        fullWidth
        name="resignationDate"
        id="resignationDate"
        value={formData.resignationDate}
        onChange={(e) => handleInputChange(e)}
        required
        
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
      margin="dense"
      label="Resignation reason"
      type="text"
      fullWidth
      name="resignationReason"
      id="resignationReason"
      value={formData.resignationReason}
      onChange={(e) => handleInputChange(e)}
      required
     
    />
    </div>
    
   <div className="data-buttons">
        <Button
          id="input-btn-submit"
          className="submit"
          variant="outlined"
          type="submit"
          onClick={saveResignation}
          disabled={buttonClick? false : true}
        >
          Submit
        </Button>
        <Button
         id="input-btn-cancel"
         className="cancel"
          variant="outlined"
          onClick={cancelButton}
        >
          Cancel
        </Button>
      </div>
  </form>
                    
  )
}

export default ResignationForm