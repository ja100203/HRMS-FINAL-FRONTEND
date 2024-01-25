import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import * as api from "./api";
import { useNavigate } from "react-router-dom";
import StateSalaryTemplate from "./StateSalaryTemplate";

const DepartmentForm = ({
  formData,
  setFormData,
  setFormVisible,
  setToggle,
  grossSal,setGrossSal
}) => {
  const navigate = useNavigate();

  const {
    setSalary,
    deduction,
    setDeduction,
    netAmount,
    setNetAmount,
    pfVal,
    setPfVal,
  } = StateSalaryTemplate();

  const loadSalaryTemplate = async () => {
    const result = await api.loadSalaryTemplate();
    setSalary(result);
  };

  const calculateGross = () => {
    let grossTotal =
      parseInt(formData.basicSalery) +
      parseInt(formData.houseRentAllowance) +
      parseInt(formData.transportAllowance);
    setGrossSal(grossTotal);
  };

  const calculatePf = () => {
    let pfvalue = parseInt(formData.basicSalery * 0.12);
    setPfVal(pfvalue);
  };

  const calculateDeduction = () => {
    let deductionTotal =
      parseInt(formData.medicalAllowance) +
      parseInt(pfVal) +
      parseInt(formData.taxDeductiion) +
      parseInt(formData.dearnessAllowance);
    setDeduction(deductionTotal);
  };

  const netSalary = () => {
    let netTotal = grossSal - deduction;
    setNetAmount(netTotal);
  };

  useEffect(() => {
    calculatePf();
    calculateGross();
    calculateDeduction();
    netSalary();
  },[]);

 
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      grossSalary: grossSal,
      netSalary: netAmount,
      pfAllowance: pfVal,
      totalDeduction: deduction,
    });
    calculateGross();
    calculateDeduction();
    netSalary();
    calculatePf();
  };

  const saveSalaryTemplate = async () => {
    await api.saveSalaryTemplate(formData);
    loadSalaryTemplate();
    navigate("/hr/payroll/salary-template ");
    setFormData({
      basicSalery: "",
      houseRentAllowance: "",
      medicalAllowance: "",
      transportAllowance: "",
      taxDeductiion: "",
      dearnessAllowance: "",
      grossSal: "",
      deduction: "",
      netAmount: "",
      payrollTemplate: "",
      createdDate: "",
    });
  };

  console.log(pfVal);

  const handleSubmit = (e) => {
    loadSalaryTemplate();
  };



  const cancelButton = () => {
    setFormVisible(false);
    setToggle(false);
    setFormData({
      basicSalery: "",
      houseRentAllowance: "",
      medicalAllowance: "",
      taxDeductiion: "",
      transportAllowance: "",
      dearnessAllowance: "",
      payrollTemplate: "",
      createdDate: "",
    });
    setPfVal(0);
    setGrossSal(0);
    setDeduction(0);
    setNetAmount(0);
  };

  let buttonCheck =
    formData.basicSalery.length > 0 &&
    formData.houseRentAllowance.length > 0 &&
    formData.medicalAllowance.length > 0 &&
    formData.taxDeductiion.length > 0 &&
    formData.transportAllowance.length > 0 &&
    formData.dearnessAllowance.length > 0 &&
    formData.payrollTemplate.length > 0 &&
    formData.createdDate.length > 0;

  
  

  return (
    <form onSubmit={handleSubmit}>
      <div className="data-input-fields">
        <TextField
          margin="dense"
          label="Basic Salary"
          type="number"
          fullWidth
          name="basicSalery"
          id="basicSalery"
          value={formData.basicSalery}
          onChange={(e) => {
            handleInputChange(e);
          }}
          required
        />
        <TextField
          margin="dense"
          label="House Rent Allowance"
          type="number"
          fullWidth
          name="houseRentAllowance"
          id="houseRentAllowance"
          value={formData.houseRentAllowance}
          onChange={(e) => handleInputChange(e)}
          required
        />
      </div>
      <div className="data-input-fields">
        <TextField
          margin="dense"
          label="Medical Allowance"
          type="number"
          fullWidth
          name="medicalAllowance"
          id="medicalAllowance"
          value={formData.medicalAllowance}
          onChange={(e) => {
            handleInputChange(e);
          }}
          required
        />
        <TextField
          margin="dense"
          label="PF Allowance"
          type="number"
          fullWidth
          name="pfAllowance"
          id="pfAllowance"
          value={pfVal}
          onChange={(e) => {
            handleInputChange(e);
          }}
          required
          disabled
        />

        <TextField
          margin="dense"
          label="Travelling/Transport Allowance"
          type="number"
          fullWidth
          name="transportAllowance"
          id="transportAllowance"
          value={formData.transportAllowance}
          onChange={(e) => {
            handleInputChange(e);
          }}
          required
        />
      </div>
      <div className="data-input-fields">
        <TextField
          margin="dense"
          label="Tax Deduction"
          type="number"
          fullWidth
          name="taxDeductiion"
          id="taxDeductiion"
          value={formData.taxDeductiion}
          onChange={(e) => handleInputChange(e)}
          required
        />
        <TextField
          margin="dense"
          label="Dearness Allowance"
          type="number"
          fullWidth
          name="dearnessAllowance"
          id="dearnessAllowance"
          value={formData.dearnessAllowance}
          onChange={(e) => {
            handleInputChange(e);
          }}
          required
        />
        <TextField
          margin="dense"
          label="Gross Salary"
          type="number"
          fullWidth
          name="grossSalary"
          id="grossSalary"
          value={grossSal}
          onChange={(e) => handleInputChange(e)}
          required
          disabled
        />
      </div>
      <div className="data-input-fields">
        <TextField
          margin="dense"
          label="Total Deduction"
          type="number"
          fullWidth
          name="totalDeduction"
          id="totalDeduction"
          value={deduction}
          disabled
          onChange={(e) => {
            handleInputChange(e);
          }}
          required
        />
        <TextField
          margin="dense"
          label="Net Salary"
          type="number"
          fullWidth
          name="netSalary"
          id="netSalary"
          value={netAmount}
          disabled
          onChange={(e) => handleInputChange(e)}
        />
        <TextField
          margin="dense"
          label="Payroll Template(e.g CEO/MANAGER/EMPLOYEE)"
          type="text"
          fullWidth
          name="payrollTemplate"
          id="payrollTemplate"
          value={formData.payrollTemplate}
          onChange={(e) => handleInputChange(e)}
          required
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
          InputLabelProps={{ shrink: true }}
        />
      </div>

      <div
        className="data-buttons"
      >
        <Button
          type="submit"
          onClick={saveSalaryTemplate}
          variant="outlined"
          disabled={buttonCheck ? false : true}
          id='input-btn-submit'
        >
          Submit
        </Button>
        <Button onClick={cancelButton} variant="outlined" id='input-btn-cancel'>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default DepartmentForm;
