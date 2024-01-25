import React, { useEffect } from 'react'
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import * as api from "./api"
import { useNavigate} from 'react-router-dom';
import StateWarning from './StateWarning';


const WarningForm = ({formData,setFormData, setFormVisible, setToggle}) => {
  const navigate = useNavigate()

    const {
      setWarning,setDateError, warningError, subjectError, descriptionError

   } = StateWarning();
    const loadWarning = async () => {
        const result = await api.loadWarning()
        setWarning(result);
      };

      useEffect(() => {
        loadWarning()
      },[])

      const getCurrentDate = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = `${now.getMonth() + 1}`.padStart(2, '0');
        const day = `${now.getDate()}`.padStart(2, '0');
        return `${year}-${month}-${day}`;
      };
      
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'createdDate') {
          const isValidDate = value === getCurrentDate();
          setDateError(!isValidDate);
        }
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
          [name]: value,
        });
      };

     
    
      const saveWarning = async () => {
    
        await api.saveWarning(formData);
        navigate("/hr/employee/warning");
        
        setFormData({
          warningId: "",
          warningToEmployee: "",
          warningType: "",
          subject: "",
          warningByEmployee: "",
          warningDate: "",
          description: "",
        });
      };

      const handleSubmit = (e) => {
     
        api.loadWarning();
      }
      const cancelButton =() => {
        setFormVisible(false)
        setToggle(false)
        setFormData({warningId: "",
        warningToEmployee: "",
        warningType: "",
        subject: "",
        warningByEmployee: "",
        warningDate: "",
        description: "",})
      }

      let buttonClick = formData.warningId.length>0 && 
                        formData.warningToEmployee.length>0 && formData.warningType.length>0 && 
                        formData.subject.length>0 && formData.warningByEmployee.length>0 && formData.warningDate.length>0 && formData.description.length>0
  return (
    <form onSubmit={handleSubmit}>
              <div className="data-input-fields">
              <TextField
                margin="dense"
                label="Warning ID"
                type="text"
                fullWidth
                name="warningId"
                id="warningId"
                value={formData.warningId}
                onChange={(e) => handleInputChange(e)}
                required
               
              />

              
              
              <TextField
              margin="dense"
                label="Warning to employee"
                type="text"
                fullWidth
                name="warningToEmployee"
                id="warningToEmployee"
                value={formData.warningToEmployee}
                onChange={(e) => handleInputChange(e)}
                required
              >
                
              </TextField>
              </div>

              <div className="data-input-fields">
              <TextField
                margin="dense"
                label="Warning Type"
                type="text"
                fullWidth
                name="warningType"
                id="warningType"
                value={formData.warningType}
                onChange={(e) => handleInputChange(e)}
                required
                error={warningError}
  helperText={warningError && 'Please enter a warning text between 2 and 100 characters.'}
                
              />
              <TextField
                margin="dense"
                label="Subject"
                type="text"
                fullWidth
                name="subject"
                id="subject"
                value={formData.subject}
                onChange={(e) => handleInputChange(e)}
                required
                error={subjectError}
  helperText={subjectError && 'Please enter a subject between 2 and 100 characters.'}


                
              />
              </div>
              <div style={{display:"flex"}}>
              <TextField
                margin="dense"
                label="Warning By Employee"
                type="text"
                fullWidth
                name="warningByEmployee"
                id="warningByEmployee"
                value={formData.warningByEmployee}
                onChange={(e) => handleInputChange(e)}
                required
                error={warningError}
  helperText={warningError && 'Please enter a description between 2 and 200 characters.'}
                
              />
              <TextField
                margin="dense"
                label="Warning date"
                type="date"
                fullWidth
                name="warningDate"
                id="warningDate"
                value={formData.warningDate}
                onChange={(e) => handleInputChange(e)}
                required
                InputLabelProps={{
                  shrink: true,
                }}
                
              />
              </div>
              <TextField
                margin="dense"
                label="Description"
                type="text"
                fullWidth
                name="description"
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange(e)}
                required
                error={descriptionError}
  helperText={descriptionError && 'Please enter a description between 2 and 200 characters.'}
                
              />
              <div className="data-buttons">
              
              <Button id="input-btn-submit"
          className="submit"
                  onClick={saveWarning}
                  disabled={buttonClick? false: true}
                  variant="outlined"
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
};


    

export default WarningForm;