import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import * as api from "./api";
import { useNavigate } from "react-router-dom";
import AttendanceView from "./mainfile/AttendanceView";
import StateAttendance from "./StateAttendance";

const AttendanceForm = ({ formData, setFormData, setFormVisible, setToggle }) => {
  const calculateTimeDifference = (t1, t2) => {
    if (t1 && t2) {
      const time1 = new Date(`1970-01-01T${t1}:00`);
      const time2 = new Date(`1970-01-01T${t2}:00`);
      const timeDifferenceInMilliseconds = time2 - time1;
      const timeDifferenceInMinutes =
        timeDifferenceInMilliseconds / (1000 * 60);
      const hours = timeDifferenceInMinutes / 60;
      return hours;
    } else {
      return 100;
    }
  };

  const navigate = useNavigate();

  const {
    employee,
    setEmployee,
    attendance,
    setAttendance,
    dateError,
    setDateError
  } = StateAttendance();

  const checkIn = "09:30";
  const checkOut = "18:30";
  const workingHours = calculateTimeDifference(checkIn, checkOut);

  const loadAttendance = async () => {
    const result = await api.loadAttendance();
    setAttendance(result);
  };

  useEffect(() => {
    loadAttendance();
    fetchEmployee();
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
    if (name === "date") {
      const isValidDate = value === getCurrentDate();
      setDateError(!isValidDate);
    }

    let lateValue;
    let earlyLeavingValue;
    let overtimeValue;
    let totWorkValue;
    let totRest;
    if (name === "clockOut") {
      lateValue = calculateTimeDifference(checkIn, formData.clockIn);
      earlyLeavingValue =
        workingHours - calculateTimeDifference(formData.clockIn, value);
      overtimeValue =
        calculateTimeDifference(checkOut, value) < 0
          ? 0
          : calculateTimeDifference(checkOut, value);
      totWorkValue = calculateTimeDifference(formData.clockIn, value);
      totRest = 1;
    } else {
      lateValue = formData.late;
      earlyLeavingValue = formData.earlyLeaving;
      overtimeValue = formData.overtime;
      totWorkValue = formData.totalWork;
      totRest = formData.totalRest;
    }

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      [name]: value,
      late: lateValue,
      earlyLeaving: earlyLeavingValue,
      overtime: overtimeValue,
      totalWork: totWorkValue,
      totalRest: totRest,
    });
  };

  const saveAttendance = async () => {
    await api.saveAttendance(formData);
    alert("Department added successfully");
    navigate("/hr/timesheet/Attendance");

    setFormData({
      employeeName: "",
      clockIn: "",
      clockOut: "",
      late: " ",
      earlyLeaving: "",
      overtime: "",
      totalWork: "",
      totalRest: "",
      date: getCurrentDate(),
    });
  };

  const handleSubmit = (e) => {
    loadAttendance();
  };

  const fetchEmployee = async () => {
    const employeeData = await api.fetchEmployee();
    setEmployee(employeeData);
  };

  let buttonCheck = formData.employeeName.length > 0 &&
                    formData.clockIn.length > 0 &&
                    formData.clockOut.length > 0
                    // formData.earlyLeaving.length > 0 &&
                    // formData.overtime.length > 0 &&
                    // formData.totalWork.length > 0 &&
                    // formData.totalRest.length > 0 

  const cancelButton = () => {
    setFormVisible(false);
    setToggle(false);
    setFormData({
      employeeName: "",
      clockIn: "",
      clockOut: "",
      late: " ",
      earlyLeaving: "",
      overtime: "",
      totalWork: "",
      totalRest: "",
      date: getCurrentDate(),
    });
  };  

  return (
    <form onSubmit={handleSubmit}>
      <div className="data-input-fields">
        <TextField
          margin="dense"
          label="Employee Name"
          type="text"
          fullWidth
          select
          name="employeeName"
          id="employeeName"
          value={formData.employeeName}
          onChange={(e) => handleInputChange(e)}
          required
        >
          {employee.map((option, index) => (
            <option key={index} value={option.employeeName}>
              {option.employeeName}
            </option>
          ))}
        </TextField>
        <TextField
          margin="dense"
          label="Clock In"
          type="time"
          fullWidth
          name="clockIn"
          id="clockIn"
          InputLabelProps={{
            shrink: true,
          }}
          value={formData.clockIn}
          onChange={(e) => handleInputChange(e)}
          required
        />
      </div>
      <div className="data-input-fields">
        <TextField
          margin="dense"
          label=" Clock Out"
          type="time"
          fullWidth
          name="clockOut"
          id="clockOut"
          InputLabelProps={{
            shrink: true,
          }}
          value={formData.clockOut}
          onChange={(e) => handleInputChange(e)}
          required
        />
        <TextField
          margin="dense"
          label="Late"
          type="number"
          fullWidth
          name="late"
          id="late"
          value={calculateTimeDifference(checkIn, formData.clockIn)}
          onChange={(e) => handleInputChange(e)}
          required
          disabled
        />
        <TextField
          margin="dense"
          label="Early Leaving"
          type="number"
          fullWidth
          name="earlyLeaving"
          id="earlyLeaving"
          value={workingHours - formData.totalWork}
          onChange={(e) => handleInputChange(e)}
          required
          disabled
        />
      </div>

      <div className="data-input-fields">
        <TextField
          margin="dense"
          label="Overtime"
          type="number"
          fullWidth
          name="overtime"
          id="overtime"
          value={
            calculateTimeDifference(checkOut, formData.clockOut) < 0
              ? 0
              : calculateTimeDifference(checkOut, formData.clockOut)
          }
          onChange={(e) => handleInputChange(e)}
          required
          disabled
        />
        <TextField
          margin="dense"
          label="Total Work"
          type="number"
          fullWidth
          name="totalWork"
          id="totalWork"
          value={calculateTimeDifference(formData.clockIn, formData.clockOut)}
          onChange={(e) => handleInputChange(e)}
          required
          disabled
        />
        <TextField
          margin="dense"
          label="Total Rest"
          type="number"
          fullWidth
          name="totalRest"
          id="totalRest"
          value={1}
          onInput={(e) => handleInputChange(e)}
          required
          disabled
        />
        <TextField
          margin="dense"
          label="Date"
          type="date"
          fullWidth
          name="date"
          id="date"
          InputLabelProps={{
            shrink: true,
          }}
          value={formData.date}
          onChange={(e) => handleInputChange(e)}
          required
          error={dateError}
          helperText={dateError && "Please select the current date"}
        />
      </div>

      <div className="data-buttons">
        <Button
          id="input-btn-submit"
          className="submit"
          type="submit"
          onClick={saveAttendance}
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

export default AttendanceForm;
