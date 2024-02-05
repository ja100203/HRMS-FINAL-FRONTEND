import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import * as api from "./api";
import { useNavigate } from "react-router-dom";
import StateLeave from "./StateLeave";

const LeaveForm = ({ formData, setFormData, setFormVisible, setToggle }) => {
  const navigate = useNavigate();

  const {
    setDateError,
    setLeave,
    setName,
    nameError,
    setAddress,
    setEmailError,
  } = StateLeave();

  const loadLeave = async () => {
    const result = await api.loadLeave();
    setLeave(result);
  };

  useEffect(() => {
    loadLeave();
  },[]);

  const validateEmail = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@] + \.[^\s@]+$/;
    return emailRegex.test(input);
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = `${now.getMonth() + 1}`.padStart(2, "0");
    const day = `${now.getDate()}`.padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "createdDate") {
      const isValidDate = value === getCurrentDate();
      setDateError(!isValidDate);
    }
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      [name]: value,
    });
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const enforceMaxLength = (value, maxLength) => {
    return value.length <= maxLength ? value : value.slice(0, maxLength);
  };

  const saveLeave = async () => {
    await api.saveLeave(formData);
    navigate("/hr/timesheet/leave");

    setFormData({
      leaveType: "",
      startDate: "",
      endDate: "",
      employeeName: "",
      leaveReason: "",
      description: "",
      appliedOn: "",
    });
  };

  const handleSubmit = (e) => {
    loadLeave();
  };

  const Type = [
    {
      value: "Choose",
      label: "Select Leave Type",
    },
    {
      value: "Sick Leave",
      label: "Sick Leave",
    },
    {
      value: "Annual Leave",
      label: "Annual Leave",
    },
    {
      value: "Casual Leave",
      label: "Casual Leave",
    },
    {
      value: "Sick Leave",
      label: "Sick Leave",
    },
    {
      value: "Maternity Leave",
      label: "Maternity Leave",
    },
    {
      value: "Paternity Leave",
      label: "Paternity Leave",
    },
  ];

  let buttonCheck = formData.leaveType.length>0 &&
                    formData.startDate.length>0 &&
                    formData.endDate.length>0 &&
                    formData.employeeName.length>0 &&
                    formData.leaveReason.length>0 &&
                    formData.description.length>0 &&
                    formData.appliedOn.length>0

  const cancelButton = () => {
    setFormVisible(false);
    setToggle(false);
    setFormData({
      leaveType: "",
      startDate: "",
      endDate: "",
      employeeName: "",
      leaveReason: "",
      description: "",
      appliedOn: "",
    });
  };  
  console.log(formData)

  return (
    <form onSubmit={handleSubmit}>
      <div className="data-input-fields">
        <TextField
          id="leaveType"
          margin="dense"
          select
          //  label="Priority"
          // type="text"
          fullWidth
          defaultValue="Choose"
          SelectProps={{
            native: true,
          }}
          value={formData.leaveType}
          onChange={(e) => handleInputChange(e)}
          name="leaveType"
        >
          {Type.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>

        <TextField
          margin="dense"
          label="Start Date"
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
          label="End Date"
          type="date"
          fullWidth
          name="endDate"
          id="endDate"
          value={formData.endDate}
          onChange={(e) => {
            handleInputChange(e);
            handleEmailChange(e);
          }}
          required
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <div className="data-input-fields">
        <TextField
          id="employeeName"
          margin="dense"
          type="text"
          label="employeeName"
          fullWidth
          name="employeeName"
          value={formData.employeeName}
          onChange={(e) => handleInputChange(e)}
          required
          InputProps={{
            minLength: 0, // Set your minimum length here
            maxLength: 20, // Set your maximum length here
          }}
          onInput={(e) => {
            e.target.value = enforceMaxLength(e.target.value, 20);
            handleNameChange(e);
          }}
          helperText={nameError ? "Please Enter min 0 to Max 20 Character" : ""}
        ></TextField>
        <TextField
          margin="dense"
          label="Leave Reason"
          type="text"
          fullWidth
          name="leaveReason"
          id="leaveReason"
          value={formData.leaveReason}
          onChange={(e) => handleInputChange(e)}
          required
          InputProps={{
            minLength: 0, // Set your minimum length here
            maxLength: 100, // Set your maximum length here
          }}
          onInput={(e) => {
            e.target.value = enforceMaxLength(e.target.value, 100);
            handleNameChange(e);
          }}
        />
      </div>
      <div className="data-input-fields">
        <TextField
          id="description"
          margin="dense"
          type="text"
          label="Description"
          fullWidth
          name="description"
          value={formData.description}
          onChange={(e) => handleInputChange(e)}
          required
          InputProps={{
            minLength: 2, // Set your minimum length here
            maxLength: 200, // Set your maximum length here
          }}
          onInput={(e) => {
            e.target.value = enforceMaxLength(e.target.value, 200);
            handleNameChange(e);
          }}
        ></TextField>
        <TextField
          margin="dense"
          label="Applied On"
          type="date"
          fullWidth
          name="appliedOn"
          id="appliedOn"
          value={formData.appliedOn}
          onChange={(e) => handleInputChange(e)}
          required
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>


      <div className="data-buttons">
        <Button
          id="input-btn-submit"
          className="submit"
          type="submit"
          onClick={saveLeave}
          variant="outlined"
          disabled={buttonCheck?false:true}
        >
          Submit
        </Button>
        <Button
          id="input-btn-cancel"
          className="cancel"
          onClick={cancelButton}
          variant="outlined"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default LeaveForm;
