import React, { useEffect, useState } from "react";
import * as api from "./api";
import { useNavigate } from "react-router-dom";
import StateLocation from "./StateLocation";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { FormControl, MenuItem, Select, InputLabel } from "@mui/material";


const LocationForm = ({formData, setFormData, setFormVisible, setToggle}) => {
  const navigate = useNavigate();

  const {
    setAddressError,
    setFaxError,
    addressError,
    faxError,
    isEmailValid,
    setIsEmailValid,
    phoneError,
    setPhoneError,
    company,
    setCompany,
    setLocation,
    
  } = StateLocation();

  const loadLocation = async () => {
    const result = await api.loadLocation();
    setLocation(result);
  };

  useEffect(() => {
    loadLocation();
    fetchCompany();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const isValidLength = value.length >= 2 && value.length <= 40;
    setAddressError(!isValidLength);

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setIsEmailValid(emailRegex.test(value));
    }
    if (name === "phone") {
      // Validate phone number format
      const isValidPhoneNumber = /^\d{10}(-\d{1,4})?$/.test(value);
      setPhoneError(!isValidPhoneNumber);
    }

    const isValidFax = /^\d{10}$/.test(value);
    setFaxError(!isValidFax);
    console.log(e.target.name)
    console.log(e.target.value)
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const enforceMaxLength = (value, maxLength) => {
    return value.length <= maxLength ? value : value.slice(0, maxLength);
  };

  const saveLocation = async (e) => {
    await api.saveLocation(formData);
    navigate("/hr/organisation/location");
    setFormData({
      companyName: "",
      locationName: "",
      email: "",
      phone: "",
      faxNumber: "",
      locationHead: "",
      address: "",
    });
  };

  const handleSubmit = (e) => {
    loadLocation();
  };

  const fetchCompany = async () => {
    const companyData = await api.fetchCompanies();
    setCompany(companyData);
  };

console.log(formData);

let buttonCheck =
// formData.companyName.length > 0 &&
formData.locationName.length > 0 &&
formData.email.length > 0 &&
formData.phone.length > 0 &&
formData.faxNumber.length > 0 &&
formData.locationHead.length > 0 &&
formData.address.length > 0;

const cancelButton = () => {
  setFormVisible(false);
  setToggle(false);
  setFormData({
    companyName: "",
    locationName: "",
    email: "",
    phone: "",
    faxNumber: "",
    locationHead: "",
    address: "",
  });
};


  return (
    <form onSubmit={handleSubmit}>
    <div className="data-input-fields">
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

      <TextField
        margin="dense"
        label="Location Head"
        type="text"
        fullWidth
        name="locationHead"
        id="locationHead"
        value={formData.locationHead}
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
        name="locationName"
        id="locationName"
        value={formData.locationName}
        onChange={(e) => handleInputChange(e)}
        required
      />

      <TextField
        margin="dense"
        label="Address"
        type="text"
        fullWidth
        name="address"
        id="address"
        value={formData.address}
        required
        // error={addressError}
        // helperText={
        //   addressError && "Address must be between 2 and 40 characters"
        // }
        inputProps={{ minLength: 2, maxLength: 40 }}
        onInput={(e) => {
          e.target.value = enforceMaxLength(e.target.value, 40);
          handleInputChange(e);
        }}
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
        onChange={(e) => handleInputChange(e)}
        required
        error={!isEmailValid}
        helperText={!isEmailValid && "Please enter a valid email address."}
      />

      <TextField
        margin="dense"
        label="Phone"
        type="number"
        fullWidth
        name="phone"
        id="phone"
        value={formData.phone}
        onChange={(e) => handleInputChange(e)}
        required
        error={phoneError}
        helperText={phoneError ? "Invalid phone number" : ""}
      />

      <TextField
        margin="dense"
        label="Fax Number"
        type="text" // Change the type to "text" to allow non-numeric characters
        fullWidth
        name="faxNumber"
        id="faxNumber"
        value={formData.faxNumber}
        onChange={(e) => handleInputChange(e)}
        required
        // error={faxError}
        // helperText={faxError ? "Invalid fax number (must be 10 digits)" : ""}
      />
    </div>

    <div className="data-buttons">
      <Button
        type="submit"
        onClick={saveLocation}
        variant="outlined"
        disabled={buttonCheck?false:true}
        id="input-btn-submit"
      >
        Submit
      </Button>
      <Button
        onClick={cancelButton}
        variant="outlined"
        id="input-btn-cancel"
      >
        Cancel
      </Button>
    </div>
  </form>
  );
};

export default LocationForm;
