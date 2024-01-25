import React, { useEffect } from 'react'
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import * as api from "./api"
import { useNavigate,useState } from 'react-router-dom';
import StateCandidate from './StateCandidate';



const CandidateForm = ({formData, setFormData, setFormVisible, setToggle}) => {

    const navigate = useNavigate()

    const {candidate,setDescription,setValue, setError,isValidPhoneNumber,setIsEmailValid,isEmailValid,setPhoneError,phoneError,setCandidate,formVisible,toggle,recDelete, setIsValidPhoneNumber,setRecDelete,dateError,setDateError,open,setOpen,search,setSearch,formControl,setFormControl,formErrors,setFormerrors
    } = StateCandidate()

    const loadCandidate = async () => {
        const result = await api.loadCandidate()
        setCandidate(result);
      };

      useEffect(() => {
        loadCandidate()
      },[])

      const getCurrentDate = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = `${now.getMonth() + 1}`.padStart(2, '0');
        const day = `${now.getDate()}`.padStart(2, '0');
        return `${year}-${month}-${day}`;
      };

      const validateInput = (value, setValue, setError, fieldName) => {
        const isValid = value.length >= 2 && value.length <= 100 && /^[a-zA-Z\s]+$/.test(value);
        setError(isValid ? '' : `${fieldName} must be between 2 and 100 characters and only alphabets must be used.`);
        setValue(value);
      };
      const enforceMaxLength = (value, maxLength) => {
        return value.length <= maxLength ? value : value.slice(0, maxLength);
      };



      
      const handleInputChange = (e) => {
        const { name, value } = e.target;

       
      
        
    
        if (name === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            setIsEmailValid(emailRegex.test(value));
          };

          if (name === 'mobileNo') {
            
            const isValidPhoneNumber = /^\d{10}(-\d{1,4})?$/;
            setIsValidPhoneNumber(isValidPhoneNumber.test(value));
          }


         {
            setFormData({
              ...formData,
      
              [name]:value,
              
            })
          };
      }
    
      
      const handleCandidateNameChange = (e) => {
        const value = enforceMaxLength(e.target.value, 100);
        setFormData({
          ...formData,
          candidateName: value,
        });
      };
    
    
      const isSubjectValid = () => {
        const { candidateName } = formData;
        return /^[A-Za-z]+$/.test(candidateName) && candidateName.length >= 2 &&  candidateName.length <= 50;
      };
    
      const saveCandidate = async () => {
    
        await api.saveCandidate(formData);
        alert("Candidate added successfully");
        navigate("/hr/recruitment/candidate ");
        
        setFormData({
            candidateName: "",
            address: "",
            email: "",
            mobileNo: "",
            ctc: "",
            ectc: "",
            location: "",
            notice:"",
            resumeUrl:"",
        });
      };

      console.log(formData);

      const handleSubmit = (e) => {
     
        loadCandidate();
      }

      const cancelButton = () => {
        setFormVisible(false);
        setToggle(false);
        setFormData({
          candidateName: "",
          address: "",
          email: "",
          mobileNo: "",
          ctc: "",
          ectc: "",
          location: "",
          notice:"",
          resumeUrl:"",
        });
      };
    
      let buttonCheck =
        formData.candidateName.length > 0 &&
       formData.address.length>0 &&       
        formData.email.length > 0 &&
        formData.mobileNo.length > 0 &&
        formData.ctc.length > 0 &&
        formData.ectc.length > 0 &&
        formData.location.length > 0 &&
        formData.notice.length > 0;
        // formData.resumeUrl.length > 0;
    
  return (
    <form onSubmit={handleSubmit}>
    <div className="data-input-fields">
        <TextField
          margin="dense"
          label="Title"
          type="text"
          fullWidth
          name="candidateName"
          id="candidateName"
          value={formData.candidateName}
          onChange={(e) => handleInputChange(e)}
          required
          InputProps={{
            minLength: 2,
            maxLength: 100,
          }}
          error={isSubjectValid()}
          helperText={
            isSubjectValid()
              ?  'Candidate Name length should be between 2 and 50 characters.'
              : ''
          }
          onInput={(e) => {
            e.target.value = enforceMaxLength(e.target.value, 100);
            handleCandidateNameChange (e);
          }}
        />

        <TextField
          margin="dense"
          label="Address"
          type="text"
          fullWidth
          name="address"
          id="address"
          value={formData.address}
          onChange={(e) => handleInputChange(e)}
          required
          
        />
      </div>

      <div className="data-input-fields">
      <TextField
      margin="dense"
      label="Email"
      type="email"
      fullWidth
      name="email"
      id="email"
      value={formData.email}
      onChange={ (e) => handleInputChange(e)}
      required
      error={!isEmailValid}
      helperText={!isEmailValid ? 'Please enter a valid email address.' : ''}
    />
       
       
    <TextField
          margin="dense"
          label="Mobile Number"
          type="number"
          fullWidth
          name="mobileNo"
          id="mobileNo"
          value={formData.mobileNo}
          onChange={(e) => handleInputChange(e)}
          required
          error={!isValidPhoneNumber}
        helperText={!isValidPhoneNumber ? 'Invalid phone number':''}
        //  onInput={(e) => {
        //    e.target.value = enforceMaxLength(e.target.value, 10);
        //    handleInputChange(e);
        //  }}
        />
        </div>


        <div className="data-input-fields">
        <TextField
          margin="dense"
          label=" CTC"
          type="number"
          fullWidth
          name="ctc"
          id="ctc"
          value={formData.ctc}
          onChange={(e) => handleInputChange(e)}
          required
        />
  <TextField
          margin="dense"
          label=" ECTC"
          type="number"
          fullWidth
          name="ectc"
          id="ectc"
          value={formData.ectc}
          onChange={(e) => handleInputChange(e)}
          required
        />
</div>

<div className="data-input-fields">
        <TextField
          margin="dense"
          label="Location"
          type="text"
          fullWidth
          name="location"
          id="location"
          value={formData.location}
          onChange={(e) => handleInputChange(e)}
          required 
        />
        <TextField
          margin="dense"
          label="Notice"
          type="text"
          fullWidth
          name="notice"
          id="notice"
          value={formData.notice}
          onChange={(e) => handleInputChange(e)}
          required 
        />
      </div>

      
      <div className="data-input-fields">
                        <TextField
                          margin="dense"
                          label="Resume Upload"
                          type="file"
                          fullWidth
                          name="resumeUrl"
                          id="resumeUrl"
                          inputProps={{accept:".jpg, .jpeg, .png"}}
                          value={formControl.resumeUrl}
                          onChange={(e) => handleInputChange(e)}
                          required
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </div>

    <div className="data-buttons">
      <Button id="input-btn-submit"
        variant="outlined"
        type="submit"
        onClick={saveCandidate}
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

export default CandidateForm;