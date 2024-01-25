import React, { useEffect } from 'react'
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import * as api from "./api"
import { useNavigate } from 'react-router-dom';

import StateAdvanceSalary from './StateAdvanceSalary';

const AdvanceSalaryForm = ({  
  setFormVisible,
  setToggle,}) => {

    const navigate = useNavigate()

    const {setCompany, setLocation, dateError, setDateError,formData,setFormData,location,company,setDepartment,dueSalary,setDueSalary} = StateAdvanceSalary()

    const loadAdvanceSalary = async () => {
        const result = await api.loadAdvanceSalary()
        setDepartment(result);
      };

      useEffect(() => {
        loadAdvanceSalary()
        fetchCompany();
        fetchLocation();
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

        calculateDue()

      };
    
      const saveAdvanceSalary = async () => {
    
        await api.saveAdvanceSalary(formData);
        navigate("/hr/payroll/advance-Salary ");
        
        setFormData({
          createdDate: "",
          employeeName: "",
          salary: "",
          advanceAmount: "",
          salaryDue: "",
          monthAndYear: "",
        });
      };

      const handleSubmit = (e) => {
     
        loadAdvanceSalary();
      }

      const fetchCompany = async () => {
        const companyData = await api.fetchCompanies()
        setCompany(companyData)
      };
    
    
      const fetchLocation = async () => {
        const locationData = await api.fetchLocations()
        setLocation(locationData)
      };

      const calculateDue = () => {
        let dueValue = parseInt(formData.salary) - parseInt(formData.advanceAmount);
        setDueSalary(dueValue);
      };

      useEffect(() => {
        calculateDue()
      })

      const cancelButton = () => {
        setFormVisible(false);
        setToggle(false);
        setFormData({
          createdDate: "",
          employeeName: "",
          salary: "",
          advanceAmount: "",
          salaryDue: "",
          monthAndYear: "",
        });
      };
    
      let buttonCheck =
      formData.employeeName.length > 0 &&
      formData.salary.length > 0 &&
      formData.advanceAmount.length > 0 &&
      formData.createdDate.length > 0 &&
      formData.monthAndYear.length > 0 
    
  return (
    <form onSubmit={handleSubmit}>
    <div className="data-input-fields">
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
                    InputLabelProps={{shrink:true}}
                  />
                  <TextField
                    margin="dense"
                    label="Employee Name"
                    type="text"
                    fullWidth
                    name="employeeName"
                    id="employeeName"
                    value={formData.employeeName}
                    onChange={(e) => handleInputChange(e)}
                    required
                  />
                </div>

                <div className="data-input-fields">
                <TextField
                    margin="dense"
                    label="Salary"
                    type="number"
                    fullWidth
                    name="salary"
                    id="salary"
                    value={formData.salary}
                    onChange={(e) => handleInputChange(e)}
                    required
                  />
                  <TextField
                    margin="dense"
                    label="Advance Amount"
                    type="number"
                    fullWidth
                    name="advanceAmount"
                    id="advanceAmount"
                    value={formData.advanceAmount}
                    onChange={(e) => handleInputChange(e)}
                    required
                  />
                  </div>
                  <div className="data-input-fields">
                  
                   <TextField
                    margin="dense"
                    label="Salary Month & Year"
                    type="date"
                    fullWidth
                    name="monthAndYear"
                    id="monthAndYear"
                    value={formData.monthAndYear}
                    onChange={(e) => handleInputChange(e)}
                    required
                    InputLabelProps={{shrink:true}}
                  />
                  <TextField
                    margin="dense"
                    label="Rest Salary Due"
                    type="number"
                    fullWidth
                    name="salaryDue"
                    id="salaryDue"
                    value={dueSalary}
                    disabled
                    onChange={(e) => handleInputChange(e)}
                    required
                  />

    </div>

    <div className="data-buttons">

      <Button id="input-btn-submit"
        variant="outlined"
        type="submit"
        onClick={saveAdvanceSalary}
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

export default AdvanceSalaryForm