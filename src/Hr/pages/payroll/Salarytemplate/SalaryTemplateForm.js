import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { MdAdd } from "react-icons/md";
import { BiSolidHide } from "react-icons/bi";
import * as api from "./api";
import { useNavigate } from "react-router-dom";
import StateSalaryTemplate from "./StateSalaryTemplate";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useToastContainer } from "react-toastify";

const SalaryTemplateForm = ({
  formData,
  setFormData,
  setFormVisible,
  setToggle,
  period,
  setPeriod,
}) => {
  const navigate = useNavigate();
  const [showIT, setShowIT] = useState(false);
  const { setSalary } = StateSalaryTemplate();
  const [openDialog, setOpenDialog] = useState(false);
  const DialogClose = () => {
    setOpenDialog(false);
  };

  const loadSalaryTemplate = async () => {
    const result = await api.loadSalaryTemplate();
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
      houseRentAllowance: formData.basicSalary * 0.4,
      educationalAllowance:
        formData.noOfChildren * formData.companyPreferedAllowance,
      overtimeSalary: (formData.basicSalary / 26 / 8) * formData.overtime,
      grossSalary:
        parseInt(formData.basicSalary) +
        parseInt(formData.houseRentAllowance) +
        parseInt(formData.conveyanceAllowance) +
        parseInt(formData.medicalAllowance) +
        parseInt(formData.educationalAllowance) +
        parseInt(formData.travellingAllowance) +
        parseInt(formData.dearnessAllowance) +
        parseInt(formData.overtimeSalary) +
        parseInt(formData.specialAllowance) +
        parseInt(formData.otherAllowance),
      providentFund: formData.basicSalary * 0.12,
      ESIC: formData.grossSalary < 21000 ? formData.grossSalary * 0.0075 : 0,
      netSalary:
        parseInt(formData.grossSalary) -
        (parseInt(formData.providentFund) +
          parseInt(formData.ESIC) +
          parseInt(formData.professionalTax) +
          parseInt(formData.TDS)),
      providentFundContri: formData.basicSalary * 0.13,
      ESICContri: formData.grossSalary * 0.0325,
      professionalTax: formData.state == "Odisha" ? 200 : 0,
      gratuity: ((formData.basicSalary / 26) * 15 * formData.gratuityYear) / 12,
      costToCompany:
        parseInt(formData.grossSalary) +
        parseInt(formData.providentFund) +
        parseInt(formData.ESIC) +
        parseInt(formData.gratuity) +
        parseInt(formData.bonus) +
        parseInt(formData.variablePay),
      // grossIncomeOld: formData.costToCompany * 12,
      // grossIncomeNew: formData.costToCompany * 12,
      section80c:
        parseInt(formData.employeeProvidentFund) +
          parseInt(formData.publicProvidentFund) +
          parseInt(formData.equityLinkedSaving) +
          parseInt(formData.lifeInsurancePremium) +
          parseInt(formData.others) >=
        150000
          ? 150000
          : parseInt(formData.employeeProvidentFund) +
            parseInt(formData.publicProvidentFund) +
            parseInt(formData.equityLinkedSaving) +
            parseInt(formData.lifeInsurancePremium) +
            parseInt(formData.others),
      section80ccd:
        parseInt(formData.nationalPensionScheme) +
          parseInt(formData.atalPensionScheme) >=
        50000
          ? 50000
          : parseInt(formData.nationalPensionScheme) +
            parseInt(formData.atalPensionScheme),
      section80tta:
        formData.savingAccountInterest >= 10000
          ? 10000
          : formData.savingAccountInterest,
      section80d:
        parseInt(formData.selfMedicalInsurance) +
          parseInt(formData.parentsMedicalInsurance) >=
        55000
          ? 55000
          : parseInt(formData.selfMedicalInsurance) +
            parseInt(formData.parentsMedicalInsurance),
      section80ee:
        formData.homeLoanInterest >= 250000
          ? 250000
          : formData.homeLoanInterest,
      section80gg:
        formData.role === "Employee"
          ? formData.houseRent
          : formData.houseRent >= 60000
          ? 60000
          : formData.houseRent,
      section80e: formData.educationalLoanInterest,
      section80g: formData.charity,
      investmentOld:
        parseInt(formData.section80c) +
        parseInt(formData.section80ccd) +
        parseInt(formData.section80tta) +
        parseInt(formData.section80d) +
        parseInt(formData.section80ee) +
        parseInt(formData.section80gg) +
        parseInt(formData.section80e) +
        parseInt(formData.section80g),
      taxableOld:
        parseInt(formData.grossIncomeOld) -
        (parseInt(formData.standardDeductionOld) +
          parseInt(formData.investmentOld)),
      taxableNew:
        parseInt(formData.grossIncomeNew) -
        (parseInt(formData.standardDeductionNew) +
          parseInt(formData.investmentNew)),
      slab5Old:
        formData.taxableOld > 500000
          ? 12500
          : formData.taxableOld > 250000 && formData.taxableOld <= 500000
          ? (parseInt(formData.taxableOld) - 250000) * 0.05
          : 0,
      slab10Old: 0,
      slab15Old: 0,
      slab20Old:
        formData.taxableOld > 1000000
          ? 100000
          : formData.taxableOld > 500000 && formData.taxableOld <= 1000000
          ? (parseInt(formData.taxableOld) - 500000) * 0.2
          : 0,
      slab30Old:
        formData.taxableOld > 1000000
          ? (parseInt(formData.taxableOld) - 1000000) * 0.3
          : 0,

      slab5New:
        formData.taxableNew > 600000
          ? 15000
          : formData.taxableNew > 300000 && formData.taxableNew <= 600000
          ? (parseInt(formData.taxableNew) - 300000) * 0.05
          : 0,
      slab10New:
        formData.taxableNew > 900000
          ? 30000
          : formData.taxableNew > 600000 && formData.taxableNew <= 900000
          ? (parseInt(formData.taxableNew) - 600000) * 0.1
          : 0,
      slab15New:
        formData.taxableNew > 1200000
          ? 45000
          : formData.taxableNew > 900000 && formData.taxableNew <= 1200000
          ? (parseInt(formData.taxableNew) - 900000) * 0.15
          : 0,
      slab20New:
        formData.taxableNew > 1500000
          ? 60000
          : formData.taxableNew > 1200000 && formData.taxableNew <= 1500000
          ? (parseInt(formData.taxableNew) - 1200000) * 0.2
          : 0,
      slab30New:
        formData.taxableNew > 1500000
          ? (parseInt(formData.taxableOld) - 1500000) * 0.3
          : 0,
      sumOfSlabOld:
        parseInt(formData.slab5Old) +
        parseInt(formData.slab10Old) +
        parseInt(formData.slab15Old) +
        parseInt(formData.slab20Old) +
        parseInt(formData.slab30Old),
      sumOfSlabNew:
        (parseInt(formData.slab5New) +
        parseInt(formData.slab10New) +
        parseInt(formData.slab15New) +
        parseInt(formData.slab20New) +
        parseInt(formData.slab30New)),
      taxRebate87aOld: formData.taxableOld <= 500000 ? 12500 : 0,
      taxRebate87aNew: formData.taxableNew <= 700000 ? 12500 : 0,
      taxAfterTaxRebateOld:
      (formData.taxRebate87aOld===0)?formData.sumOfSlabOld:((formData.taxRebate87aOld==12500 && formData.sumOfSlabOld < 12500)?0:( parseInt(formData.sumOfSlabOld)-12500)),
      taxAfterTaxRebateNew:
      (formData.taxRebate87aNew===0)?formData.sumOfSlabNew:((formData.taxRebate87aNew==12500 && formData.sumOfSlabNew < 12500)?0:( parseInt(formData.sumOfSlabNew)-12500)),
      cess4Old: formData.sumOfSlabOld * 0.04,
      cess4New: formData.sumOfSlabNew * 0.04,
      totalIncomeTaxOld:
        parseInt(formData.taxAfterTaxRebateOld) + parseInt(formData.cess4Old),
      totalIncomeTaxNew:
        parseInt(formData.taxAfterTaxRebateNew) + parseInt(formData.cess4New),
      TDSOld: formData.totalIncomeTaxOld / 12,
      TDSNew: formData.totalIncomeTaxNew / 12,
    });
  }, [formData]);
  console.log(formData);

  const saveSalaryTemplate = async () => {
    await api.saveSalaryTemplate(formData);
    loadSalaryTemplate();
    navigate("/hr/payroll/salary-template ");
    setPeriod("monthly");
    setFormData({
      employeeName: "",
      employeeId: "",
      designation: "",
      noOfWorkingDays: "",
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
      grossIncomeOld: 0,
      standardDeductionOld: 50000,
      investmentOld: 0,
      taxableOld: 0,
      grossIncomeNew: 0,
      standardDeductionNew: 50000,
      investmentNew: 0,
      taxableNew: 0,
      section80c: 0,
      employeeProvidentFund: 0,
      publicProvidentFund: 0,
      equityLinkedSaving: 0,
      lifeInsurancePremium: 0,
      others: 0,
      section80ccd: 0,
      nationalPensionScheme: 0,
      atalPensionScheme: 0,
      section80tta: 0,
      savingAccountInterest: 0,
      section80d: 0,
      selfMedicalInsurance: 0,
      parentsMedicalInsurance: 0,
      homeLoanInterest: 0,
      section80gg: 0,
      houseRent: 0,
      role: "",
      section80e: 0,
      educationalLoanInterest: 0,
      section80g: 0,
      charity: 0,
      slab5Old: 0,
      slab10Old: 0,
      slab15Old: 0,
      slab20Old: 0,
      slab30Old: 0,
      slab5New: 0,
      slab10New: 0,
      slab15New: 0,
      slab20New: 0,
      slab30New: 0,
    });
  };
  const handleSubmit = (e) => {
    loadSalaryTemplate();
    setPeriod("monthly");
  };

  const cancelButton = () => {
    setFormVisible(false);
    setToggle(false);
    setPeriod("monthly");
    setFormData({
      employeeName: "",
      employeeId: "",
      designation: "",
      noOfWorkingDays: "",
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
      grossIncomeOld: 0,
      standardDeductionOld: 50000,
      investmentOld: 0,
      taxableOld: 0,
      grossIncomeNew: 0,
      standardDeductionNew: 50000,
      investmentNew: 0,
      taxableNew: 0,
      section80c: 0,
      employeeProvidentFund: 0,
      publicProvidentFund: 0,
      equityLinkedSaving: 0,
      lifeInsurancePremium: 0,
      others: 0,
      section80ccd: 0,
      nationalPensionScheme: 0,
      atalPensionScheme: 0,
      section80tta: 0,
      savingAccountInterest: 0,
      section80d: 0,
      selfMedicalInsurance: 0,
      parentsMedicalInsurance: 0,
      homeLoanInterest: 0,
      section80gg: 0,
      houseRent: 0,
      role: "",
      section80e: 0,
      educationalLoanInterest: 0,
      section80g: 0,
      charity: 0,
      slab5Old: 0,
      slab10Old: 0,
      slab15Old: 0,
      slab20Old: 0,
      slab30Old: 0,
      slab5New: 0,
      slab10New: 0,
      slab15New: 0,
      slab20New: 0,
      slab30New: 0,
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
  const Roles = [
    {
      value: "Choose",
      label: "Select State",
    },
    {
      value: "Employee",
      label: "Employee",
    },
    {
      value: "Non-Employee",
      label: "Non-Employee",
    },
  ];

  let buttonCheck =
    formData.employeeName.length > 0 &&
    formData.employeeId.length > 0 &&
    formData.designation.length > 0;
  // formData.basicSalary.length > 0 &&
  // formData.conveyanceAllowance.length > 0 &&
  // formData.medicalAllowance.length > 0 &&
  // formData.noOfChildren.length > 0 &&
  // formData.companyPreferedAllowance.length > 0 &&
  // formData.travellingAllowance.length > 0 &&
  // formData.dearnessAllowance.length > 0 &&
  // formData.specialAllowance.length > 0 &&
  // formData.otherAllowance.length > 0 &&
  // formData.overtime.length > 0 &&
  // formData.state.length > 0 &&
  // formData.TDS.length > 0 &&
  // formData.gratuityYear.length > 0 &&
  // formData.bonus.length > 0 &&
  // formData.variablePay.length > 0;

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
          disabled={period == "yearly" ? true : false}
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
          disabled={period == "yearly" ? true : false}
          style={{ color: "red" }}
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
          disabled={period == "yearly" ? true : false}
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
          value={
            period == "yearly"
              ? formData.basicSalary * 12
              : formData.basicSalary
          }
          onChange={(e) => {
            handleInputChange(e);
          }}
          required
          disabled={period == "yearly" ? true : false}
        />
        <TextField
          margin="dense"
          label="House Rent Allowance"
          type="number"
          fullWidth
          name="houseRentAllowance"
          id="houseRentAllowance"
          value={
            period == "yearly"
              ? formData.houseRentAllowance * 12
              : formData.houseRentAllowance
          }
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
          value={
            period == "yearly"
              ? formData.conveyanceAllowance * 12
              : formData.conveyanceAllowance
          }
          onChange={(e) => {
            handleInputChange(e);
          }}
          required
          disabled={period == "yearly" ? true : false}
        />
        <TextField
          margin="dense"
          label="Medical Allowance"
          type="number"
          fullWidth
          name="medicalAllowance"
          id="medicalAllowance"
          value={
            period == "yearly"
              ? formData.medicalAllowance * 12
              : formData.medicalAllowance
          }
          onChange={(e) => {
            handleInputChange(e);
          }}
          required
          disabled={period == "yearly" ? true : false}
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
          disabled={period == "yearly" ? true : false}
        />
        <TextField
          margin="dense"
          label="Company Prefered Allowance"
          type="number"
          fullWidth
          name="companyPreferedAllowance"
          id="companyPreferedAllowance"
          value={
            period == "yearly"
              ? formData.companyPreferedAllowance * 12
              : formData.companyPreferedAllowance
          }
          onChange={(e) => handleInputChange(e)}
          required
          disabled={period == "yearly" ? true : false}
        />
        <TextField
          margin="dense"
          label="Educational Allowance"
          type="number"
          fullWidth
          name="educationalAllowance"
          id="educationalAllowance"
          value={
            period == "yearly"
              ? formData.educationalAllowance * 12
              : formData.educationalAllowance
          }
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
          value={
            period == "yearly"
              ? formData.travellingAllowance * 12
              : formData.travellingAllowance
          }
          onChange={(e) => handleInputChange(e)}
          required
          disabled={period == "yearly" ? true : false}
        />
        <TextField
          margin="dense"
          label="Dearness Allowance"
          type="number"
          fullWidth
          name="dearnessAllowance"
          id="dearnessAllowance"
          value={
            period == "yearly"
              ? formData.dearnessAllowance * 12
              : formData.dearnessAllowance
          }
          onChange={(e) => {
            handleInputChange(e);
          }}
          required
          disabled={period == "yearly" ? true : false}
        />
        <TextField
          margin="dense"
          label="Special Allowance"
          type="number"
          fullWidth
          name="specialAllowance"
          id="specialAllowance"
          value={
            period == "yearly"
              ? formData.specialAllowance * 12
              : formData.specialAllowance
          }
          onChange={(e) => handleInputChange(e)}
          disabled={period == "yearly" ? true : false}
        />
        <TextField
          margin="dense"
          label="Other Allowance"
          type="number"
          fullWidth
          name="otherAllowance"
          id="otherAllowance"
          value={
            period == "yearly"
              ? formData.otherAllowance * 12
              : formData.otherAllowance
          }
          onChange={(e) => handleInputChange(e)}
          required
          disabled={period == "yearly" ? true : false}
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
          value={
            period == "yearly" ? formData.overtime * 12 : formData.overtime
          }
          onChange={(e) => handleInputChange(e)}
          required
          disabled={period == "yearly" ? true : false}
        />
        <TextField
          margin="dense"
          label="Overtime Salary"
          type="number"
          fullWidth
          name="overtimeSalary"
          id="overtimeSalary"
          value={
            period == "yearly"
              ? formData.overtimeSalary * 12
              : formData.overtimeSalary
          }
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
          value={
            period == "yearly"
              ? formData.grossSalary * 12
              : formData.grossSalary
          }
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
          value={
            period == "yearly"
              ? formData.providentFund * 12
              : formData.providentFund
          }
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
          value={period == "yearly" ? formData.ESIC * 12 : formData.ESIC}
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
          disabled={period == "yearly" ? true : false}
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
          value={
            period == "yearly"
              ? formData.professionalTax * 12
              : formData.professionalTax
          }
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
          value={period == "yearly" ? formData.TDS * 12 : formData.TDS}
          onChange={(e) => handleInputChange(e)}
          required
          disabled={period == "yearly" ? true : false}
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
        value={
          period == "yearly" ? formData.netSalary * 12 : formData.netSalary
        }
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
          value={
            period == "yearly"
              ? formData.providentFundContri * 12
              : formData.providentFundContri
          }
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
          value={
            period == "yearly" ? formData.ESICContri * 12 : formData.ESICContri
          }
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
          disabled={period == "yearly" ? true : false}
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
          value={
            period == "yearly" ? formData.gratuity * 12 : formData.gratuity
          }
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
          value={period == "yearly" ? formData.bonus * 12 : formData.bonus}
          onChange={(e) => handleInputChange(e)}
          required
          disabled={period == "yearly" ? true : false}
        />
        <TextField
          margin="dense"
          label="Variable Pay"
          type="number"
          fullWidth
          name="variablePay"
          id="variablePay"
          value={
            period == "yearly"
              ? formData.variablePay * 12
              : formData.variablePay
          }
          onChange={(e) => handleInputChange(e)}
          required
          disabled={period == "yearly" ? true : false}
        />
      </div>

      <TextField
        margin="dense"
        label="Cost To Company"
        type="number"
        fullWidth
        name="costToCompany"
        id="costToCompany"
        value={
          period == "yearly"
            ? formData.costToCompany * 12
            : formData.costToCompany
        }
        onChange={(e) => handleInputChange(e)}
        required
        disabled
      />
      <Button
        variant="outlined"
        id="add-btn"
        onClick={() => setShowIT(!showIT)}
      >
        {showIT ? (
          <div className="hide">
            <BiSolidHide />
            HIDE
          </div>
        ) : (
          <div className="add">
            <MdAdd />
            ADD INCOME TAX
          </div>
        )}
      </Button>
      {showIT && (
        <>
          <h2 className="mb-3" style={{ fontWeight: "600" }}>
            Income Tax
          </h2>

          <div className="d-flex" style={{ gap: "20px" }}>
            <div className="lefttt">
              <h3>Old Slab</h3>
              <TextField
                margin="dense"
                label="Gross Income"
                type="number"
                fullWidth
                name="grossIncomeOld"
                id="grossIncomeOld"
                value={formData.grossIncomeOld}
                onChange={(e) => handleInputChange(e)}
                required
              />
              <TextField
                margin="dense"
                label="standardDeductionOld"
                type="number"
                fullWidth
                name="standardDeductionOld"
                id="standardDeductionOld"
                value={formData.standardDeductionOld}
                onChange={(e) => handleInputChange(e)}
                required
                disabled
              />
              <Button
                variant="outlined"
                id="add-btn"
                style={{ width: "max-content" }}
              >
                {
                  <div className="add" onClick={() => setOpenDialog(true)}>
                    <MdAdd />
                    ADD INVESTMENT
                  </div>
                }
              </Button>
              <Dialog open={openDialog} onClose={DialogClose}>
                <h3 className="mx-auto mt-5" style={{ fontWeight: "600" }}>
                  Investment
                </h3>
                <DialogTitle
                  id="form-header-popup"
                  className="d-flex justify-content-between align-items-center"
                >
                  SECTION 80C
                  <TextField
                    margin="dense"
                    type="number"
                    fullWidth
                    name="section80c"
                    id="section80c"
                    value={formData.section80c}
                    onChange={(e) => handleInputChange(e)}
                    required
                    disabled
                    style={{ width: "200px" }}
                  />
                </DialogTitle>
                <DialogContent id="dcc" style={{ overflowY: "none" }}>
                  <div className="data-input-fields">
                    <TextField
                      label="Employee Provident Fund"
                      margin="dense"
                      type="number"
                      fullWidth
                      name="employeeProvidentFund"
                      id="employeeProvidentFund"
                      value={formData.employeeProvidentFund}
                      onChange={(e) => handleInputChange(e)}
                    />
                    <TextField
                      label="Public Provident Fund"
                      margin="dense"
                      type="number"
                      fullWidth
                      name="publicProvidentFund"
                      id="publicProvidentFund"
                      value={formData.publicProvidentFund}
                      onChange={(e) => handleInputChange(e)}
                      required
                    />
                  </div>
                  <div className="data-input-fields">
                    <TextField
                      label="Equity Linked Saving"
                      margin="dense"
                      type="number"
                      fullWidth
                      name="equityLinkedSaving"
                      id="equityLinkedSaving"
                      value={formData.equityLinkedSaving}
                      onChange={(e) => handleInputChange(e)}
                      required
                    />
                    <TextField
                      label="Life Insurance Premium"
                      margin="dense"
                      type="number"
                      fullWidth
                      name="lifeInsurancePremium"
                      id="lifeInsurancePremium"
                      value={formData.lifeInsurancePremium}
                      onChange={(e) => handleInputChange(e)}
                      required
                    />
                    <TextField
                      label="Others"
                      margin="dense"
                      type="number"
                      fullWidth
                      name="others"
                      id="others"
                      value={formData.others}
                      onChange={(e) => handleInputChange(e)}
                      required
                    />
                  </div>
                </DialogContent>
                <DialogTitle
                  id="form-header-popup"
                  className="d-flex justify-content-between align-items-center"
                >
                  SECTION 80CCD (1B)
                  <TextField
                    margin="dense"
                    type="number"
                    fullWidth
                    name="section80ccd"
                    id="section80ccd"
                    value={formData.section80ccd}
                    onChange={(e) => handleInputChange(e)}
                    required
                    disabled
                    style={{ width: "200px" }}
                  />
                </DialogTitle>
                <DialogContent id="dcc">
                  <div className="data-input-fields">
                    <TextField
                      label="National Pension Scheme"
                      margin="dense"
                      type="number"
                      fullWidth
                      name="nationalPensionScheme"
                      id="nationalPensionScheme"
                      value={formData.nationalPensionScheme}
                      onChange={(e) => handleInputChange(e)}
                    />
                    <TextField
                      label="Atal Pension Scheme"
                      margin="dense"
                      type="number"
                      fullWidth
                      name="atalPensionScheme"
                      id="atalPensionScheme"
                      value={formData.atalPensionScheme}
                      onChange={(e) => handleInputChange(e)}
                      required
                    />
                  </div>
                </DialogContent>
                <DialogTitle
                  id="form-header-popup"
                  className="d-flex justify-content-between align-items-center"
                >
                  SECTION 80TTA
                  <TextField
                    margin="dense"
                    type="number"
                    fullWidth
                    name="section80tta"
                    id="section80tta"
                    value={formData.section80tta}
                    onChange={(e) => handleInputChange(e)}
                    required
                    disabled
                    style={{ width: "200px" }}
                  />
                </DialogTitle>
                <DialogContent id="dcc">
                  <div className="data-input-fields">
                    <TextField
                      label="Saving Account Interest"
                      margin="dense"
                      type="number"
                      fullWidth
                      name="savingAccountInterest"
                      id="savingAccountInterest"
                      value={formData.savingAccountInterest}
                      onChange={(e) => handleInputChange(e)}
                    />
                  </div>
                </DialogContent>
                <DialogTitle
                  id="form-header-popup"
                  className="d-flex justify-content-between align-items-center"
                >
                  SECTION 80D
                  <TextField
                    margin="dense"
                    type="number"
                    fullWidth
                    name="section80d"
                    id="section80d"
                    value={formData.section80d}
                    onChange={(e) => handleInputChange(e)}
                    required
                    disabled
                    style={{ width: "200px" }}
                  />
                </DialogTitle>
                <DialogContent id="dcc">
                  <div className="data-input-fields">
                    <TextField
                      label="Self Medical Insurance"
                      margin="dense"
                      type="number"
                      fullWidth
                      name="selfMedicalInsurance"
                      id="selfMedicalInsurance"
                      value={formData.selfMedicalInsurance}
                      onChange={(e) => handleInputChange(e)}
                    />
                    <TextField
                      label="Parents Medical Insurance"
                      margin="dense"
                      type="number"
                      fullWidth
                      name="parentsMedicalInsurance"
                      id="parentsMedicalInsurance"
                      value={formData.parentsMedicalInsurance}
                      onChange={(e) => handleInputChange(e)}
                    />
                  </div>
                </DialogContent>
                <DialogTitle
                  id="form-header-popup"
                  className="d-flex justify-content-between align-items-center"
                >
                  SECTION 80EE / SECTION 24
                  <TextField
                    margin="dense"
                    type="number"
                    fullWidth
                    name="section80ee"
                    id="section80ee"
                    value={formData.section80ee}
                    onChange={(e) => handleInputChange(e)}
                    required
                    disabled
                    style={{ width: "200px" }}
                  />
                </DialogTitle>
                <DialogContent id="dcc">
                  <div className="data-input-fields">
                    <TextField
                      label="Home Loan Interest"
                      margin="dense"
                      type="number"
                      fullWidth
                      name="homeLoanInterest"
                      id="homeLoanInterest"
                      value={formData.homeLoanInterest}
                      onChange={(e) => handleInputChange(e)}
                    />
                  </div>
                </DialogContent>
                <DialogTitle
                  id="form-header-popup"
                  className="d-flex justify-content-between align-items-center"
                >
                  SECTION 80GG
                  <TextField
                    margin="dense"
                    type="number"
                    fullWidth
                    name="section80gg"
                    id="section80gg"
                    value={formData.section80gg}
                    onChange={(e) => handleInputChange(e)}
                    required
                    disabled
                    style={{ width: "200px" }}
                  />
                </DialogTitle>
                <DialogContent id="dcc">
                  <div className="data-input-fields">
                    <TextField
                      id="state"
                      margin="dense"
                      select
                      label="Role"
                      fullWidth
                      defaultValue="Choose"
                      SelectProps={{
                        native: true,
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={formData.role}
                      onChange={(e) => handleInputChange(e)}
                      name="role"
                    >
                      {Roles.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </TextField>
                    <TextField
                      label="House Rent"
                      margin="dense"
                      type="number"
                      fullWidth
                      name="houseRent"
                      id="houseRent"
                      value={formData.houseRent}
                      onChange={(e) => handleInputChange(e)}
                    />
                  </div>
                </DialogContent>
                <DialogTitle
                  id="form-header-popup"
                  className="d-flex justify-content-between align-items-center"
                >
                  SECTION 80E
                  <TextField
                    margin="dense"
                    type="number"
                    fullWidth
                    name="section80e"
                    id="section80e"
                    value={formData.section80e}
                    onChange={(e) => handleInputChange(e)}
                    required
                    disabled
                    style={{ width: "200px" }}
                  />
                </DialogTitle>
                <DialogContent id="dcc">
                  <TextField
                    label="Educational Loan Interest"
                    margin="dense"
                    type="number"
                    fullWidth
                    name="educationalLoanInterest"
                    id="educationalLoanInterest"
                    value={formData.educationalLoanInterest}
                    onChange={(e) => handleInputChange(e)}
                  />
                </DialogContent>
                <DialogTitle
                  id="form-header-popup"
                  className="d-flex justify-content-between align-items-center"
                >
                  SECTION 80G
                  <TextField
                    margin="dense"
                    type="number"
                    fullWidth
                    name="section80g"
                    id="section80g"
                    value={formData.section80g}
                    onChange={(e) => handleInputChange(e)}
                    required
                    disabled
                    style={{ width: "200px" }}
                  />
                </DialogTitle>
                <DialogContent id="dcc">
                  <TextField
                    label="Charity"
                    margin="dense"
                    type="number"
                    fullWidth
                    name="charity"
                    id="charity"
                    value={formData.charity}
                    onChange={(e) => handleInputChange(e)}
                  />
                </DialogContent>

                <Button
                  variant="outlined"
                  id="add-btn"
                  onClick={() => setOpenDialog(false)}
                  style={{ width: "90%", margin: "auto", marginBottom: "30px" }}
                >
                  <div className="add">OK</div>
                </Button>
              </Dialog>
              <TextField
                margin="dense"
                label="investmentOld"
                type="number"
                fullWidth
                name="investmentOld"
                id="investmentOld"
                value={formData.investmentOld}
                onChange={(e) => handleInputChange(e)}
                required
                disabled
              />
              <TextField
                margin="dense"
                label="Taxable Income"
                type="number"
                fullWidth
                name="taxableOld"
                id="taxableOld"
                value={formData.taxableOld}
                onChange={(e) => handleInputChange(e)}
                required
                disabled
              />
            </div>
            <div className="righttt">
              <h3>New Slab</h3>
              <TextField
                margin="dense"
                label="Gross Income"
                type="number"
                fullWidth
                name="grossIncomeNew"
                id="grossIncomeNew"
                value={formData.grossIncomeNew}
                onChange={(e) => handleInputChange(e)}
                required
              />
              <TextField
                margin="dense"
                label="Standard Deduction"
                type="number"
                fullWidth
                name="standardDeductionNew"
                id="standardDeductionNew"
                value={formData.standardDeductionNew}
                onChange={(e) => handleInputChange(e)}
                required
                disabled
              />
              <TextField
                margin="dense"
                label="Investment"
                type="number"
                fullWidth
                name="investmentNew"
                id="investmentNew"
                value={formData.investmentNew}
                onChange={(e) => handleInputChange(e)}
                required
                disabled
              />
              <TextField
                margin="dense"
                label="Taxable Income"
                type="number"
                fullWidth
                name="taxableIncomeNew"
                id="taxableIncomeNew"
                value={formData.taxableNew}
                onChange={(e) => handleInputChange(e)}
                required
                disabled
              />
            </div>
          </div>
          <div
            className="slabs d-flex align-items-center"
            style={{ gap: "20px" }}
          >
            <h5 style={{ width: "210px" }}>Slab 5%:</h5>
            <TextField
              margin="dense"
              label="Old Slab 5%"
              type="number"
              fullWidth
              name="slab5Old"
              id="slab5Old"
              value={formData.slab5Old}
              onChange={(e) => handleInputChange(e)}
              required
              disabled
            />
            <TextField
              margin="dense"
              label="New Slab 5%"
              type="number"
              fullWidth
              name="slab5New"
              id="slab5New"
              value={formData.slab5New}
              onChange={(e) => handleInputChange(e)}
              required
              disabled
            />
          </div>
          <div
            className="slabs d-flex align-items-center"
            style={{ gap: "20px" }}
          >
            <h5 style={{ width: "210px" }}>Slab 10%:</h5>
            <TextField
              margin="dense"
              label="Old Slab 10%"
              type="number"
              fullWidth
              name="slab10Old"
              id="slab10Old"
              value={formData.slab10Old}
              onChange={(e) => handleInputChange(e)}
              required
              disabled
            />
            <TextField
              margin="dense"
              label="New Slab 10%"
              type="number"
              fullWidth
              name="slab10New"
              id="slab10New"
              value={formData.slab10New}
              onChange={(e) => handleInputChange(e)}
              required
              disabled
            />
          </div>
          <div
            className="slabs d-flex align-items-center"
            style={{ gap: "20px" }}
          >
            <h5 style={{ width: "210px" }}>Slab 15%:</h5>
            <TextField
              margin="dense"
              label="Old Slab 15%"
              type="number"
              fullWidth
              name="slab15Old"
              id="slab15Old"
              value={formData.slab15Old}
              onChange={(e) => handleInputChange(e)}
              required
              disabled
            />
            <TextField
              margin="dense"
              label="New Slab 15%"
              type="number"
              fullWidth
              name="slab15New"
              id="slab15New"
              value={formData.slab15New}
              onChange={(e) => handleInputChange(e)}
              required
              disabled
            />
          </div>
          <div
            className="slabs d-flex align-items-center"
            style={{ gap: "20px" }}
          >
            <h5 style={{ width: "210px" }}>Slab 20%:</h5>
            <TextField
              margin="dense"
              label="Old Slab 20%"
              type="number"
              fullWidth
              name="slab20Old"
              id="slab20Old"
              value={formData.slab20Old}
              onChange={(e) => handleInputChange(e)}
              required
              disabled
            />
            <TextField
              margin="dense"
              label="New Slab 20%"
              type="number"
              fullWidth
              name="slab20New"
              id="slab20New"
              value={formData.slab20New}
              onChange={(e) => handleInputChange(e)}
              required
              disabled
            />
          </div>
          <div
            className="slabs d-flex align-items-center"
            style={{ gap: "20px" }}
          >
            <h5 style={{ width: "210px" }}>Slab 30%:</h5>
            <TextField
              margin="dense"
              label="Old Slab 30%"
              type="number"
              fullWidth
              name="slab30Old"
              id="slab30Old"
              value={formData.slab30Old}
              onChange={(e) => handleInputChange(e)}
              required
              disabled
            />
            <TextField
              margin="dense"
              label="New Slab 30%"
              type="number"
              fullWidth
              name="slab30New"
              id="slab30New"
              value={formData.slab30New}
              onChange={(e) => handleInputChange(e)}
              required
              disabled
            />
          </div>
          <div
            className="slabs d-flex align-items-center"
            style={{ gap: "20px" }}
          >
            <h5 style={{ width: "210px" }}>Sum of Slabs</h5>
            <TextField
              margin="dense"
              type="number"
              fullWidth
              name="sumOfSlabOld"
              id="sumOfSlabOld"
              value={formData.sumOfSlabOld}
              onChange={(e) => handleInputChange(e)}
              required
              disabled
            />
            <TextField
              margin="dense"
              type="number"
              fullWidth
              name="sumOfSlabNew"
              id="sumOfSlabNew"
              value={formData.sumOfSlabNew}
              onChange={(e) => handleInputChange(e)}
              required
              disabled
            />
          </div>
          <div
            className="slabs d-flex align-items-center"
            style={{ gap: "20px" }}
          >
            <h5 style={{ width: "210px" }}>Tax Rebate 87A</h5>
            <TextField
              margin="dense"
              type="number"
              fullWidth
              name="taxRebate87aOld"
              id="taxRebate87aOld"
              value={formData.taxRebate87aOld}
              onChange={(e) => handleInputChange(e)}
              required
              disabled
            />
            <TextField
              margin="dense"
              type="number"
              fullWidth
              name="taxRebate87aNew"
              id="taxRebate87aNew"
              value={formData.taxRebate87aNew}
              onChange={(e) => handleInputChange(e)}
              required
              disabled
            />
          </div>
          <div
            className="slabs d-flex align-items-center"
            style={{ gap: "20px" }}
          >
            <h5 style={{ width: "210px" }}>Tax after Tax Rebate</h5>
            <TextField
              margin="dense"
              type="number"
              fullWidth
              name="taxAfterTaxRebateOld"
              id="taxAfterTaxRebateOld"
              value={formData.taxAfterTaxRebateOld}
              onChange={(e) => handleInputChange(e)}
              required
              disabled
            />
            <TextField
              margin="dense"
              type="number"
              fullWidth
              name="taxAfterTaxRebateNew"
              id="taxAfterTaxRebateNew"
              value={formData.taxAfterTaxRebateNew}
              onChange={(e) => handleInputChange(e)}
              required
              disabled
            />
          </div>
          <div
            className="slabs d-flex align-items-center"
            style={{ gap: "20px" }}
          >
            <h5 style={{ width: "210px" }}>Cess 4%</h5>
            <TextField
              margin="dense"
              type="number"
              fullWidth
              name="cess4Old"
              id="cess4Old"
              value={formData.cess4Old}
              onChange={(e) => handleInputChange(e)}
              required
              disabled
            />
            <TextField
              margin="dense"
              type="number"
              fullWidth
              name="cess4New"
              id="cess4New"
              value={formData.cess4New}
              onChange={(e) => handleInputChange(e)}
              required
              disabled
            />
          </div>
          <div
            className="slabs d-flex align-items-center"
            style={{ gap: "20px" }}
          >
            <h5 style={{ width: "210px" }}>Total Income Tax</h5>
            <TextField
              margin="dense"
              type="number"
              fullWidth
              name="totalIncomeTaxOld"
              id="totalIncomeTaxOld"
              value={formData.totalIncomeTaxOld}
              onChange={(e) => handleInputChange(e)}
              required
              disabled
            />
            <TextField
              margin="dense"
              type="number"
              fullWidth
              name="totalIncomeTaxNew"
              id="totalIncomeTaxNew"
              value={formData.totalIncomeTaxNew}
              onChange={(e) => handleInputChange(e)}
              required
              disabled
            />
          </div>
          <div
            className="slabs d-flex align-items-center"
            style={{ gap: "20px" }}
          >
            <h5 style={{ width: "210px" }}>TDS</h5>
            <TextField
              margin="dense"
              type="number"
              fullWidth
              name="TDSOld"
              id="TDSOld"
              value={formData.TDSOld}
              onChange={(e) => handleInputChange(e)}
              required
              disabled
            />
            <TextField
              margin="dense"
              type="number"
              fullWidth
              name="TDSNew"
              id="TDSNew"
              value={formData.TDSNew}
              onChange={(e) => handleInputChange(e)}
              required
              disabled
            />
          </div>
        </>
      )}

      <div className="data-buttons">
        <Button
          type="submit"
          onClick={saveSalaryTemplate}
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

export default SalaryTemplateForm;
