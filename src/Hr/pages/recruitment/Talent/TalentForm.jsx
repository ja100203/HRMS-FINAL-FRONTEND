import React, { useEffect } from 'react'
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import * as api from "./api"
import { useNavigate } from 'react-router-dom';
import StateTalent from './StateTalent';

const TalentForm = ({formData, setFormData, setFormVisible, setToggle}) => {

  const navigate = useNavigate();
  const {setTalent,setNameError,setRequirementsError,requirementsError,jobLocationError,setJobLocationError,nameError, setProjectNameError, projectNameError,setManagerNameError, managerNameError
  }= StateTalent()

  const loadTalent = async () => {
    const result = await api.loadTalent()
    setTalent(result);
  };

  useEffect(() => {
    loadTalent()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    validateName(value);  // Validate the name field
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleNameChange = (value) => {
    validateName(value);  // Validate the name field
    setFormData((prevData) => ({ ...prevData, name: value }));
  };

  const handleReqChange = (value) => {
    validateRequirements(value);  // Validate the requirements field
    setFormData((prevData) => ({ ...prevData, requirements: value }));
  };

  const handleProjectNameChange = (value) => {
    validateProjectName(value);  // Validate the project Name field
    setFormData((prevData) => ({ ...prevData, projectName: value }));
  };
  
const handleManagerNameChange = (value) => {
  validateManagerName(value);  // Validate the Manager Name field
  setFormData((prevData) => ({ ...prevData, managerName: value }));
};

  const handleJobLocationChange = (value) => {
    validateJobLocation(value);  // Validate the Job Location field
    setFormData((prevData) => ({ ...prevData, jobLocation: value }));
  };

  const validateName = (name) => {
    if (name.length < 2) {
      setNameError('Name must be at least 2 characters long.');
    } else if (name.length > 200) {
      setNameError('Name must be at most 200 characters long.');
    } else {
      setNameError('');
    }
  };

  const validateRequirements = (requirements) => {
    if (requirements.length < 2) {
      setRequirementsError('Requirements must be at least 2 characters long.');
    } else if (requirements.length > 100) {
      setRequirementsError('Requirements must be at most 100 characters long.');
    } else {
      setRequirementsError('');
    }
  };

  const validateProjectName = (projectName) => {
    if (projectName.length < 2) {
      setProjectNameError('Project Name must be at least 2 characters long.');
    } else if (projectName.length > 50) {
      setProjectNameError('Project Name must be at most 50 characters long.');
    } else {
      setProjectNameError('');
    }
  };

  const validateManagerName = (managerName) => {
    if (managerName.length < 2) {
      setManagerNameError('Manager Name must be at least 2 characters long.');
    } else if (managerName.length > 60) {
      setManagerNameError('Manager Name must be at most 60 characters long.');
    } else {
      setManagerNameError('');
    }
  };
  
  const validateJobLocation = (jobLocation) => {
    if (jobLocation.length < 2) {
      setJobLocationError('Job Location must be at least 2 characters long.');
    } else if (jobLocation.length > 100) {
      setJobLocationError('Job Location must be at most 100 characters long.');
    } else {
      setJobLocationError('');
    }
  };

  const enforceMaxLength = (value, maxLength) => {
    return value.slice(0, maxLength);
  };
  
  const saveTalent = async () => {

    await api.saveTalent(formData);
    alert("Talent added successfully");
    navigate("/hr/recruitment/talents");

    setFormData({
      name: "",
      requirements: "",
      projectName: "",
      managerName: "",
      startDate: "",
      endDate: "",
      jobLocation: ""
    });
  };

  const handleSubmit = (e) => {
    loadTalent();
  }

  const cancelButton = () => {
    setFormVisible(false);
    setToggle(false);
    setFormData({
      name: "",
      requirements: "",
      projectName: "",
      managerName: "",
      startDate: "",
      endDate: "",
      jobLocation: ""
    });
  };

  let buttonCheck =
    formData.name.length > 0 &&
    formData.requirements.length>0 &&       
    formData.projectName.length > 0 &&
    formData.managerName.length > 0 &&
    formData.startDate.length > 0 &&
    formData.endDate.length > 0 &&
    formData.jobLocation.length>0;
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="data-input-fields">
        <TextField
          margin="dense"
          label="Job Post Name"
          type="text"
          fullWidth
          name="name"
          id="name"
          value={formData.name}
          onChange={(e) => handleInputChange(e)}
          required
          InputProps={{
            minLength: 2,
            maxLength: 200,
          }}
          error={!!nameError}
          helperText={nameError}
          onInput={(e) => {
            const value = enforceMaxLength(e.target.value, 200);
            handleNameChange(value);
          }}
        />

        <TextField
          margin="dense"
          label="Requirement"
          type="text"
          fullWidth
          name="requirements"
          id="requirements"
          value={formData.requirements}
          onChange={(e) => handleInputChange(e)}
          required
          InputProps={{
            minLength: 2,
            maxLength: 100,
          }}
          error={!!requirementsError}
          helperText={requirementsError}
          onInput={(e) => {
            const value = enforceMaxLength(e.target.value, 100);
            handleReqChange(value);
          }}
        />

      </div>
      <div className="data-input-fields">
        <TextField
          margin="dense"
          label="Project Name"
          type="text"
          fullWidth
          name="projectName"
          id="projectName"
          value={formData.projectName}
          onChange={(e) => handleInputChange(e)}
          required
          InputProps={{
            minLength: 2,
            maxLength: 50,
          }}
          error={!!projectNameError}
          helperText={projectNameError}
          onInput={(e) => {
            const value = enforceMaxLength(e.target.value, 50);
            handleProjectNameChange(value);
          }}
        />

      </div>
      <div className="data-input-fields">
        <TextField
          margin="dense"
          label="Manager Name"
          type="text"
          fullWidth
          name="managerName"
          id="managerName"
          value={formData.managerName}
          onChange={(e) => handleInputChange(e)}
          required
          InputProps={{
            minLength: 2,
            maxLength: 60,
          }}
          error={!!managerNameError}
          helperText={managerNameError}
          onInput={(e) => {
            const value = enforceMaxLength(e.target.value, 60);
            handleManagerNameChange(value);
          }}
        />


        <TextField
          margin="dense"
          label = "Start Date"
          type="date"
          fullWidth
          name="startDate"
          id="startDate"
          value={formData.startDate}
          onChange={(e) => handleInputChange(e)}
          required
          InputLabelProps={{
          shrink: true,
        }}
        />
        <TextField
          margin="dense"
          label = "End Date"
          type="date"
          fullWidth
          name="endDate"
          id="endDate"
          value={formData.endDate}
          onChange={(e) => handleInputChange(e)}
          required
          InputLabelProps={{
          shrink: true,
        }}
        />
        <TextField
          margin="dense"
          label="Job Location"
          type="text"
          fullWidth
          name="jobLocation"
          id="jobLocation"
          value={formData.jobLocation}
          onChange={(e) => handleInputChange(e)}
          required
          InputProps={{
            minLength: 2,
            maxLength: 100,
          }}
          error={!!jobLocationError}
          helperText={jobLocationError}
          onInput={(e) => {
            const value = enforceMaxLength(e.target.value, 100);
            handleJobLocationChange(value);
          }}
        />

      </div>


      <div className="data-buttons">

        <Button id="input-btn-submit"
          variant="outlined"
          type="submit"
          onClick={saveTalent}
          disabled={buttonCheck ? false : true}
        >
          Submit
        </Button>
        <Button id="input-btn-cancel"
          variant="outlined"
          onClick={cancelButton}
        >
          Cancel
        </Button>
      </div>

    </form>

  )
}

export default TalentForm