import React, { useEffect } from 'react'
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";

import { useNavigate} from 'react-router-dom';
import * as api from "./announcementapi"
import StateAnnouncement from './StateAnnouncement';
import { FormControl, MenuItem, Select, InputLabel } from "@mui/material";
const AnnouncementForm = ({formData,setFormData,setFormVisible, setToggle }) => {
    let navigation = useNavigate();
    const {
        summaryError,
        setSummaryError,
       
        titleError,
        setTitleError,
        dateError,
        setDateError,

        company,
        setCompany,
   
        setDepartment,
        location,
        setLocation,
        
       
       
       
      } = StateAnnouncement();

      const Type = [
        {
          value: "Choose",
          label: "Select Depatment Name",
        },
        {
          value: "Human Resources Department",
          label: "Human Resources Department",
        },
        {
          value: "Marketing Department",
          label: "Marketing Department",
        },
        {
          value: "Finance Department",
          label: "Finance Department",
        },
        {
          value: "Information Technology Department",
          label: "Information Technology Department",
        },
        {
          value: "Customer Service Department",
          label: "Customer Service Department",
        },
        {
          value: "Research and Development Department",
          label: "Research and Development Department",
        },
        {
          value: "Legal Department",
          label: "Legal Department",
        },
      ];
    
      
    

  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = `${now.getMonth() + 1}`.padStart(2, "0");
    const day = `${now.getDate()}`.padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

      const handleInputChange = (e) => {
        const { name, value } = e.target;
    
        // const isValidLengthSum = value.length >= 2 && value.length <= 200;
        // const hasNoNumbersSum = !/\d/.test(value); // Check for the presence of numbers
        // setSummaryError(!isValidLengthSum || !hasNoNumbersSum);
    
        // const isValidLength = value.length >= 2 && value.length <= 50;
        // const hasNoNumbers = !/\d/.test(value); // Check for the presence of numbers
        // setTitleError(!isValidLength || !hasNoNumbers);
    
        // const isValidDate = value === getCurrentDate();
        // setDateError(!isValidDate);
    
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };
    
      const saveAnnouncements = async () => {
        await api.saveAnnouncements(formData)
        navigation("/hr/organisation/announcements");
        setFormData({
          title: "",
          startDate: "",
          endDate: "",
          companyName: "",
          locationName: "",
          departmentName: "",
          summary: "",
          description: "",
          createdDate: "",
        });
      };

      useEffect(() => {
        const fetchCompany = async () => {
        
          const response = await api.fetchCompanies()
          setCompany(response);
       
      };
    
      const fetchLocation = async () => {
     
          const response = await api.fetchLocations()
          setLocation(response);
       
      };
      const fetchDepartment = async () => {
        
          const response = await api.fetchDepartment()
          setDepartment(response);
        };
        
        fetchCompany();
        fetchLocation();
        fetchDepartment();
      }, []);
    
      
     
      

      const handleSubmit = (e) => {
        
        
      };



      const cancelButton = () => {
        setFormVisible(false);
        setToggle(false);
        setFormData({
          title: "",
          startDate: "",
          endDate: "",
          companyName: "",
          locationName: "",
          departmentName: "",
          summary: "",
          description: "",
          createdDate: "",
        });
      };
    
      let buttonCheck =
        formData.title.length > 0 &&
       formData.endDate.length>0 &&       
        formData.summary.length > 0 &&
        formData.createdDate.length > 0 &&
        formData.description.length > 0;
  return (
    <form onSubmit={handleSubmit}>
    <div className="data-input-fields">
      <TextField
        margin="dense"
        label="Title"
        type="text"
        fullWidth
        name="title"
        id="title"
        value={formData.title}
        onChange={(e) => handleInputChange(e)}
        required
        // error={titleError}
        // helperText={titleError && "Title must be between 2 and 50 characters"}
      />
      <TextField
        margin="dense"
        label="Start-Date"
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
        label="End-date"
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
        label="Created Date"
        type="date"
        fullWidth
        name="createdDate"
        id="createdDate"
        value={formData.createdDate}
        onChange={(e) => handleInputChange(e)}
        required
        InputLabelProps={{
          shrink: true,
        }}
        // error={dateError}
        // helperText={dateError ? "Please select the current date" : ""}
      />
    </div>
    <div className="data-input-fields">
      <TextField
        id="departmentName"
        margin="dense"
        select
        label="Department Name"
        fullWidth
        defaultValue="Choose"
        SelectProps={{
          native: true,
        }}
        InputLabelProps={{
          shrink: true,
        }}
        value={formData.departmentName}
        onChange={(e) => handleInputChange(e)}
        name="departmentName"
      >
        {Type.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </TextField>

      <FormControl fullWidth>
        <InputLabel id="demo-location-select-label">Location Name</InputLabel>
        <Select
          labelId="demo-location-select-label"
          id="locationName"
          value={formData.locationName}
          name="locationName"
          label="Location Name"
          onChange={(e) => handleInputChange(e)}
        >
          {location && location .map((item, index) => {
            return (
              <MenuItem key={index} value={item.locationName }>
                {item.locationName }
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel id="demo-company-select-label">Company Name</InputLabel>
        <Select
          labelId="demo-company-select-label"
          id="selectedEmployee"
          value={formData.companyName}
          name="companyName"
          label="Company Name"
          onChange={(e) => handleInputChange(e)}
        >
          {company && company.map((item, index) => {
            return (
              <MenuItem key={index} value={item.companyName}>
                {item.companyName}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>

    <div className="data-input-fields">
      <TextField
        margin="dense"
        label="Summary"
        type="text"
        fullWidth
        name="summary"
        id="summary"
        value={formData.summary}
        onChange={(e) => handleInputChange(e)}
        required
        // error={summaryError}
        // helperText={
        //   summaryError
        //     ? "Summary must be between 2 and 200 characters and should not contain numbers"
        //     : ""
        // }
      />
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
      />
    </div>
    
      <div
        className="data-buttons"
      >
        <Button
          variant="outlined"
          type="submit"
          onClick={saveAnnouncements}
          disabled={buttonCheck ? false : true}
          id="input-btn-submit"
        >
          Submit
        </Button>
        <Button variant="outlined" id="input-btn-cancel" onClick={cancelButton}>
          Cancel
        </Button>
      </div>
  </form>
  );
};

export default AnnouncementForm;
