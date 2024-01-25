import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as api from "./api";
import { useNavigate } from "react-router-dom";
import StateAward from "./StateAward";

const AwardForm = ({ formData, setFormData, setOpen }) => {
  const navigate = useNavigate();

  const { setEmployeeName, setAward, setDateError, errorMsg, setErrorMsg } =
    StateAward();

  const loadAward = async () => {
    const result = await api.loadAward();
    setAward(result);
  };

  useEffect(() => {
    loadAward();
  }, []);

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
  const handleClose = () => {
    setOpen(false);
  };

  const awardType = [
    {
      award: "Employee of the Month",
      earnedOn: "November 2023",
    },
    {
      award: "Best Performer Of the Month",
      earnedOn: "November 2023",
    },
  ];

  const enforceMaxLength = (value, maxLength) => {
    return value.length <= maxLength ? value : value.slice(1, maxLength);
  };

  const saveAward = async () => {
    await api.saveAward(formData);
    navigate("/hr/employee/awards");
    setFormData({
      awardName: "",
      awardDescription: "",
      employeeId: "",
      date: "",
      employeeName: "",
      awardBy: "",
    });
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    if (value.length < 2 || value.length > 50) {
      setErrorMsg(" Name length should be between 2 and 50.");
    } else {
      setErrorMsg("");
    }
    setEmployeeName(e.target.value);
  };

  const handleSubmit = (e) => {
    handleClose();
  };

  const cancelButton = () => {
    setOpen(false);
    setFormData({
      awardName: "",
      awardDescription: "",
      employeeId: "",
      date: "",
      employeeName: "",
      awardBy: "",
    });
  };

  let buttonClick =
    formData.awardDescription?.length > 0 &&
    formData.date?.length > 0 &&
    formData.employeeName?.length > 0 &&
    formData.awardBy?.length > 0;

  return (
    <form onSubmit={handleSubmit}>
      <div className="data-input-fields">
        <TextField
          margin="dense"
          label="Employee name"
          type="text"
          fullWidth
          name="employeeName"
          id="employeeName"
          value={formData.employeeName}
          onChange={(e) => handleInputChange(e)}
          required
          error={errorMsg !== ""}
          helperText={errorMsg}
          InputProps={{
            minLength: 2,
            maxLength: 50,
          }}
          onInput={(e) => {
            e.target.value = enforceMaxLength(e.target.value, 50);
            handleNameChange(e);
          }}
        />

        <TextField
          id="awardName"
          margin="dense"
          select
          label="Award Name"
          fullWidth
          SelectProps={{
            native: true,
          }}
          InputLabelProps={{
            shrink: true,
          }}
          value={formData.awardName}
          onChange={(e) => handleInputChange(e)}
          name="awardName"
        >
          <option selected>Select Award Type</option>
          {awardType.map((option, index) => (
            <option key={index} value={option.award}>
              {option.award}
            </option>
          ))}
        </TextField>
      </div>

      <div className="data-input-fields">
        <TextField
          margin="dense"
          label="Employee Id"
          type="text"
          fullWidth
          name="employeeId"
          id="employeeId"
          value={formData.employeeId}
          onChange={(e) => handleInputChange(e)}
          required
        />

        <TextField
          margin="dense"
          label="Award Description"
          type="text"
          fullWidth
          name="awardDescription"
          id="awardDescription"
          value={formData.awardDescription}
          onChange={(e) => handleInputChange(e)}
          required
        />
      </div>

      <div className="data-input-fields">
        <TextField
          margin="dense"
          type="date"
          label="Awards Date"
          fullWidth
          name="date"
          id="date"
          value={formData.date}
          onChange={(e) => handleInputChange(e)}
          required
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          margin="dense"
          type="text"
          label="awards By"
          fullWidth
          name="awardBy"
          id="awardBy"
          value={formData.awardBy}
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
          variant="outlined"
          type="submit"
          onClick={saveAward}
          disabled={buttonClick ? false : true}
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
  );
};

export default AwardForm;
