import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import * as api from "./api";
import { useNavigate } from "react-router-dom";
import StateInterview from "./StateInterview";

const InterviewForm = ({formData, setFormData, setFormVisible, setToggle}) => {
  const navigate = useNavigate();

  const {
    email,
    setEmail,
    candidateEmailError,
    setCandidateEmailError,
    schedulerEmailError,
    setSchedulerEmailError,
    interviewerEmailError,
    setInterviewerEmailError,
    formVisible,
    toggle,
    Interview,
    setInterview,
    open,
    setOpen
  } = StateInterview();

  const loadInterview = async () => {
    const result = await api.loadInterview();
    setInterview(result);
  };

  useEffect(() => {
    loadInterview();
  }, []);

  const validateEmail = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  };
  
  const handleEmailChange3 = (e) => {
    // Additional email-related logic if needed
  };

  const handleInputChangeAndValidate = (e) => {
    handleInputChange(e);
    handleEmailChange3(e);

    // Validate the email and set error state accordingly
    const email = e.target.value;
    if (!validateEmail(email)) {
      setInterviewerEmailError('Please enter a valid email address.');
    } else {
      setInterviewerEmailError('');
    }
  };
  const handleEmailChange2 = (event) => {
    const inputValue = event.target.value;
    setEmail(inputValue);

    if (inputValue.trim() === "") {
      setSchedulerEmailError("Email is required");
    } else if (!validateEmail(inputValue)) {
      setSchedulerEmailError("Invalid email address");
    } else {
      setSchedulerEmailError("");
    }
  };
  const handleEmailChange1 = (event) => {
    const inputValue = event.target.value;
    setEmail(inputValue);

    if (inputValue.trim() === "") {
      setCandidateEmailError("Email is required");
    } else if (!validateEmail(inputValue)) {
      setCandidateEmailError("Invalid email address");
    } else {
      setCandidateEmailError("");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      [name]: value,
    });
  };

  const saveInterview = async (e) => {
    e.preventDefault();
    await api.saveInterview(formData);
    alert("Interview added successfully");
    handleClose();
    navigate("/hr/recruitment/Interview");
    loadInterview();
    setFormData({
      candidateEmailId: " ",
      schedulerEmailId: " ",
      interviewerEmailId: " ",
      talentId: " ",
      interviewStatus: " ",
      meetingLink: " ",
      dateTime: " ",
    });
  };

  const handleSubmit = (e) => {
    loadInterview();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const cancelButton = () => {
    setFormVisible(false);
    setToggle(false);
    setFormData({
      candidateEmailId: " ",
      schedulerEmailId: " ",
      interviewerEmailId: " ",
      talentId: " ",
      interviewStatus: " ",
      meetingLink: " ",
      dateTime: " ",
    });
  };

  let buttonCheck =
    formData.candidateEmailId.length > 0 &&
   formData.schedulerEmailId.length>0 &&       
    formData.interviewerEmailId.length > 0 &&
    formData.talentId.length > 0 &&
    formData.interviewStatus.length > 0 &&
    formData.meetingLink.length > 0 &&
    formData.dateTime.length > 0 ;

  return (
    <form onSubmit={handleSubmit}>
      <div className="data-input-fields">
        <TextField
          margin="dense"
          label="Candidate Email ID"
          type="email"
          fullWidth
          name="candidateEmailId"
          id="candidateEmailId"
          value={formData.candidateEmailId}
          onChange={(e) => {
            handleInputChange(e);
            handleEmailChange1(e);
          }}
          required
          error={Boolean(candidateEmailError)}
          helperText={candidateEmailError}
        />
        <TextField
          margin="dense"
          label="Scheduler Email ID"
          type="email"
          fullWidth
          name="schedulerEmailId"
          id="schedulerEmailId"
          value={formData.schedulerEmailId}
          onChange={(e) => {
            handleInputChange(e);
            handleEmailChange2(e);
          }}
          required
          error={Boolean(schedulerEmailError)}
          helperText={schedulerEmailError}
        />
      </div>

      <div className="data-input-fields">
      <TextField
      margin="dense"
      label="Interviewer Email ID"
      type="email"
      fullWidth
      name="interviewerEmailId"
      id="interviewerEmailId"
      value={formData.interviewerEmailId}
      onChange={handleInputChangeAndValidate}
      required
      // error={Boolean(interviewerEmailError)}
      // helperText={interviewerEmailError}
    />
        <TextField
          margin="dense"
          label="Talent ID"
          type="text"
          fullWidth
          name="talentId"
          id="talentId"
          value={formData.talentId}
          onChange={(e) => handleInputChange(e)}
          required
        />
        <TextField
          margin="dense"
          label="Interview Status"
          type="text"
          fullWidth
          name="interviewStatus"
          id="interviewStatus"
          value={formData.interviewStatus}
          onChange={(e) => handleInputChange(e)}
          required
        />

        <TextField
          margin="dense"
          label="meetingLink"
          type="text"
          fullWidth
          name="meetingLink"
          id="meetingLink"
          value={formData.meetingLink}
          onChange={(e) => handleInputChange(e)}
          required
        />
        </div>

      <div className="data-input-fields">
        <TextField
          margin="dense"
          label="DateTime"
          type="date"
          fullWidth
          name="dateTime"
          id="dateTime"
          value={formData.dateTime}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="data-buttons">
        <Button
          id="input-btn-submit"
          className="submit"
          type="submit"
          onClick={saveInterview}
          variant="outlined"
          disabled={buttonCheck ? false : true}
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

export default InterviewForm;
