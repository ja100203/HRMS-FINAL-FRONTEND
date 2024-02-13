import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as api from "./api";
import { useNavigate } from "react-router-dom";
import StatePayslipGenerator from "./StatePayslipGenerator";
import { useToastContainer } from "react-toastify";

const PayslipGeneratorForm = ({
  formData,
  setFormData,
  setFormVisible,
  setToggle,
}) => {
  const navigate = useNavigate();

  const { setSalary } = StatePayslipGenerator();

  const loadPayslipGenerator = async () => {
    const result = await api.loadPayslipGenerator();
    setSalary(result);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    setFormData({
      ...formData,
      employeeBasicSalary:
        (formData.basicSalary / 26) * formData.noOfWorkingDays,
      houseRentAllowance: formData.employeeBasicSalary * 0.4,
      educationalAllowance:
        formData.noOfChildren * formData.companyPreferedAllowance,
      overtimeSalary: (formData.basicSalary / 26 / 8) * formData.overtime,
      grossSalary:
        parseInt(formData.employeeBasicSalary) +
        parseInt(formData.houseRentAllowance) +
        parseInt(formData.conveyanceAllowance) +
        parseInt(formData.medicalAllowance) +
        parseInt(formData.educationalAllowance) +
        parseInt(formData.travellingAllowance) +
        parseInt(formData.dearnessAllowance) +
        parseInt(formData.overtimeSalary) +
        parseInt(formData.specialAllowance) +
        parseInt(formData.otherAllowance),
      providentFund: formData.employeeBasicSalary * 0.12,
      ESIC: formData.grossSalary < 21000 ? formData.grossSalary * 0.0075 : 0,
      netSalary:
        parseInt(formData.grossSalary) -
        (parseInt(formData.providentFund) +
          parseInt(formData.ESIC) +
          parseInt(formData.professionalTax) +
          parseInt(formData.TDS)),
      providentFundContri: formData.employeeBasicSalary * 0.13,
      ESICContri: formData.grossSalary * 0.0325,
      professionalTax: formData.state == "Odisha" ? 200 : 0,
      gratuity:
        ((formData.employeeBasicSalary / 26) * 15 * formData.gratuityYear) / 12,
      costToCompany:
        parseInt(formData.grossSalary) +
        parseInt(formData.providentFund) +
        parseInt(formData.ESIC) +
        parseInt(formData.gratuity) +
        parseInt(formData.bonus) +
        parseInt(formData.variablePay),
    });
  }, [formData]);
  console.log(formData);

  const savePayslipGenerator = async () => {
    await api.savePayslipGenerator(formData);
    loadPayslipGenerator();
    navigate("/hr/payroll/salary-template ");
    setFormData({
      employeeName: "",
      employeeId: "",
      designation: "",
      noOfWorkingDays: "",
      employeeBasicSalary: "",
      basicSalary: "",
      houseRentAllowance: "",
      conveyanceAllowance: "",
      medicalAllowance: "",
      noOfChildren: "",
      companyPreferedAllowance: "",
      educationalAllowance: "",
      travellingAllowance: "",
      dearnessAllowance: "",
      specialAllowance: "",
      otherAllowance: "",
      overtime: "",
      overtimeSalary: "",
      grossSalary: "",
      providentFund: "",
      ESIC: "",
      state: "",
      professionalTax: "",
      TDS: "",
      netSalary: "",
      providentFundContri: "",
      ESICContri: "",
      gratuity: "",
      gratuityYear: "",
      bonus: "",
      variablePay: "",
      costToCompany: "",
    });
  };
  const handleSubmit = (e) => {
    loadPayslipGenerator();
  };

  const cancelButton = () => {
    setFormVisible(false);
    setToggle(false);
    setFormData({
      employeeName: "",
      employeeId: "",
      designation: "",
      noOfWorkingDays: "",
      employeeBasicSalary: "",
      basicSalary: "",
      houseRentAllowance: "",
      conveyanceAllowance: "",
      medicalAllowance: "",
      noOfChildren: "",
      companyPreferedAllowance: "",
      educationalAllowance: "",
      travellingAllowance: "",
      dearnessAllowance: "",
      specialAllowance: "",
      otherAllowance: "",
      overtime: "",
      overtimeSalary: "",
      grossSalary: "",
      providentFund: "",
      ESIC: "",
      state: "",
      professionalTax: "",
      TDS: "",
      netSalary: "",
      providentFundContri: "",
      ESICContri: "",
      gratuity: "",
      gratuityYear: "",
      bonus: "",
      variablePay: "",
      costToCompany: "",
    });
  };

  const States = [
    {
      value: "Choose",
      label: "Select State",
    },
    {
      value: "Odisha",
      label: "Odisha",
    },
  ];

  let buttonCheck =
    formData.employeeName.length > 0 &&
    formData.employeeId.length > 0 &&
    formData.designation.length > 0;

  return (
    <form onSubmit={handleSubmit}>
      <div className="data-input-fields">
        <TextField
          margin="dense"
          label="Employee Name"
          type="text"
          fullWidth
          name="employeeName"
          id="employeeName"
          value={formData.employeeName}
          onChange={(e) => {
            handleInputChange(e);
          }}
          required
        />
        <TextField
          margin="dense"
          label="Employee ID"
          type="number"
          fullWidth
          name="employeeId"
          id="employeeId"
          value={formData.employeeId}
          onChange={(e) => {
            handleInputChange(e);
          }}
          required
        />
        <TextField
          margin="dense"
          label="Designation"
          type="text"
          fullWidth
          name="designation"
          id="designation"
          value={formData.designation}
          onChange={(e) => {
            handleInputChange(e);
          }}
          required
        />
      </div>
      <div className="data-input-fields">
        <TextField
          margin="dense"
          label="Basic Salary"
          type="number"
          fullWidth
          name="basicSalary"
          id="basicSalary"
          value={formData.basicSalary}
          onChange={(e) => {
            handleInputChange(e);
          }}
          required
        />
        <TextField
          margin="dense"
          label="No. of present days"
          type="number"
          fullWidth
          name="noOfWorkingDays"
          id="noOfWorkingDays"
          value={formData.noOfWorkingDays}
          onChange={(e) => {
            handleInputChange(e);
          }}
          required
        />
      </div>
      <div className="data-input-fields">
        <TextField
          margin="dense"
          label="Employee Basic Salary"
          type="number"
          fullWidth
          name="employeeBasicSalary"
          id="employeeBasicSalary"
          value={formData.employeeBasicSalary}
          onChange={(e) => {
            handleInputChange(e);
          }}
          required
          disabled
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
          disabled
        />
        <TextField
          margin="dense"
          label="Conveyance Allowance"
          type="number"
          fullWidth
          name="conveyanceAllowance"
          id="conveyanceAllowance"
          value={formData.conveyanceAllowance}
          onChange={(e) => {
            handleInputChange(e);
          }}
          required
        />
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
      </div>
      <div className="data-input-fields">
        <TextField
          margin="dense"
          label="No. Of Children"
          type="number"
          fullWidth
          name="noOfChildren"
          id="noOfChildren"
          value={formData.noOfChildren}
          onChange={(e) => {
            handleInputChange(e);
          }}
          required
        />
        <TextField
          margin="dense"
          label="Company Prefered Allowance"
          type="number"
          fullWidth
          name="companyPreferedAllowance"
          id="companyPreferedAllowance"
          value={formData.companyPreferedAllowance}
          onChange={(e) => handleInputChange(e)}
          required
        />
        <TextField
          margin="dense"
          label="Educational Allowance"
          type="number"
          fullWidth
          name="educationalAllowance"
          id="educationalAllowance"
          value={formData.educationalAllowance}
          onChange={(e) => {
            handleInputChange(e);
          }}
          required
          disabled
        />
      </div>

      <div className="data-input-fields">
        <TextField
          margin="dense"
          label="Travelling Allowance"
          type="number"
          fullWidth
          name="travellingAllowance"
          id="travellingAllowance"
          value={formData.travellingAllowance}
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
          label="Special Allowance"
          type="number"
          fullWidth
          name="specialAllowance"
          id="specialAllowance"
          value={formData.specialAllowance}
          onChange={(e) => handleInputChange(e)}
        />
        <TextField
          margin="dense"
          label="Other Allowance"
          type="number"
          fullWidth
          name="otherAllowance"
          id="otherAllowance"
          value={formData.otherAllowance}
          onChange={(e) => handleInputChange(e)}
          required
        />
      </div>
      <div className="data-input-fields">
        <TextField
          margin="dense"
          label="Overtime (in hours)"
          type="number"
          fullWidth
          name="overtime"
          id="overtime"
          value={formData.overtime}
          onChange={(e) => handleInputChange(e)}
          required
        />
        <TextField
          margin="dense"
          label="Overtime Salary"
          type="number"
          fullWidth
          name="overtimeSalary"
          id="overtimeSalary"
          value={formData.overtimeSalary}
          onChange={(e) => handleInputChange(e)}
          required
          disabled
        />
        <TextField
          margin="dense"
          label="Gross Salary"
          type="number"
          fullWidth
          name="grossSalary"
          id="grossSalary"
          value={formData.grossSalary}
          onChange={(e) => handleInputChange(e)}
          required
          disabled
        />
      </div>
      <h4 className="my-2">Employee Deduction</h4>
      <div className="data-input-fields">
        <TextField
          margin="dense"
          label="Provident Fund"
          type="number"
          fullWidth
          name="providentFund"
          id="providentFund"
          value={formData.providentFund}
          onChange={(e) => handleInputChange(e)}
          required
          disabled
        />
        <TextField
          margin="dense"
          label="ESIC"
          type="number"
          fullWidth
          name="ESIC"
          id="ESIC"
          value={formData.ESIC}
          onChange={(e) => handleInputChange(e)}
          required
          disabled
        />
      </div>
      <div className="data-input-fields">
        <TextField
          id="state"
          margin="dense"
          select
          label="State"
          fullWidth
          defaultValue="Choose"
          SelectProps={{
            native: true,
          }}
          InputLabelProps={{
            shrink: true,
          }}
          value={formData.state}
          onChange={(e) => handleInputChange(e)}
          name="state"
        >
          {States.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
        <TextField
          margin="dense"
          label="Professional Tax"
          type="number"
          fullWidth
          name="professionalTax"
          id="professionalTax"
          value={formData.professionalTax}
          onChange={(e) => handleInputChange(e)}
          required
          disabled
        />
        <TextField
          margin="dense"
          label="TDS"
          type="number"
          fullWidth
          name="TDS"
          id="TDS"
          value={formData.TDS}
          onChange={(e) => handleInputChange(e)}
          required
        />
      </div>
      <h4 className="my-2">Net Salary</h4>
      <TextField
        margin="dense"
        label="Net Salary"
        type="number"
        fullWidth
        name="netSalary"
        id="netSalary"
        value={formData.netSalary}
        onChange={(e) => handleInputChange(e)}
        required
        disabled
      />
      <h4 className="my-2">Employer Contribution</h4>
      <div className="data-input-fields">
        <TextField
          margin="dense"
          label="Provident Fund"
          type="number"
          fullWidth
          name="providentFundContri"
          id="providentFundContri"
          value={formData.providentFundContri}
          onChange={(e) => handleInputChange(e)}
          required
          disabled
        />
        <TextField
          margin="dense"
          label="ESIC"
          type="number"
          fullWidth
          name="ESICContri"
          id="ESICContri"
          value={formData.ESICContri}
          onChange={(e) => handleInputChange(e)}
          required
          disabled
        />
        <TextField
          margin="dense"
          label="Gratuity Year"
          type="number"
          fullWidth
          name="gratuityYear"
          id="gratuityYear"
          value={formData.gratuityYear}
          onChange={(e) => handleInputChange(e)}
          required
        />
      </div>
      <div className="data-input-fields">
        <TextField
          margin="dense"
          label="Gratuity"
          type="number"
          fullWidth
          name="gratuity"
          id="gratuity"
          value={formData.gratuity}
          onChange={(e) => handleInputChange(e)}
          required
          disabled
        />
        <TextField
          margin="dense"
          label="bonus"
          type="number"
          fullWidth
          name="bonus"
          id="bonus"
          value={formData.bonus}
          onChange={(e) => handleInputChange(e)}
          required
        />
        <TextField
          margin="dense"
          label="Variable Pay"
          type="number"
          fullWidth
          name="variablePay"
          id="variablePay"
          value={formData.variablePay}
          onChange={(e) => handleInputChange(e)}
          required
        />
      </div>

      <TextField
        margin="dense"
        label="Cost To Company"
        type="number"
        fullWidth
        name="costToCompany"
        id="costToCompany"
        value={formData.costToCompany}
        onChange={(e) => handleInputChange(e)}
        required
        disabled
      />

      <div className="data-buttons">
        <Button
          type="submit"
          onClick={savePayslipGenerator}
          variant="outlined"
          disabled={buttonCheck ? false : true}
          id="input-btn-submit"
        >
          Submit
        </Button>
        <Button onClick={cancelButton} variant="outlined" id="input-btn-cancel">
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default PayslipGeneratorForm;
