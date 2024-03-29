import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import * as loanapi from "./loanapi";
import { useNavigate } from "react-router-dom";
import GrantLoanState from "./GrantLoanState";

const GrantLoanForm = ({ formData, setFormData,setFormVisible,setToggle }) => {
  const {
    permittedByError,
    setPermittedByError,
    loanDetailsByError,
    setLoanDetailsByError,
    loan,
    setLoan,
    pay,
    setPay,
    emiPay,
    setEmiPay,
    emiClear,
    setEmiClear,
  } = GrantLoanState();

  const navigate = useNavigate();

  const loadLoan = async () => {
    const result = await loanapi.loadLoan();
    setLoan(result);
  };

  useEffect(() => {
    loadLoan();
  }, []); // Remove loadLoan from the dependency array

  const saveLoan = async () => {
    await loanapi.saveLoan(formData);
    navigate("/hr/loan/grant-loan");
    setFormData({
      employeeName: "",
      permittedBy: "",
      loanDetails: "",
      approveDate: "",
      repaymentForm: "",
      amount: "",
      interestPersentage: "",
      installmentPeriod: "",
      status: "",
      installmentCleared: "",
    });
  };

  const handleSubmit = (e) => {
    // Handle form submission logic here
    console.log("Form submitted:", formData);
    // handleClose();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Alphabetic validation using regex
    const isAlphabetic = /^[A-Za-z\s]+$/.test(value);

    // Size validation
    const isValidSize = value.length >= 2 && value.length <= 40;

    // Required validation
    const isRequired = value.trim() !== "";

    if (name === "permittedBy") {
      if (!isRequired) {
        setPermittedByError("Permitted By is required");
      } else if (!isAlphabetic) {
        setPermittedByError(
          "Permitted By should only contain alphabetic characters"
        );
      } else if (!isValidSize) {
        setPermittedByError(
          "Permitted By should be between 2 and 40 characters"
        );
      } else {
        setPermittedByError("");
      }
    } else if (name === "loanDetails") {
      //Loan Details Validation
      // Account Name validation
      if (!isRequired) {
        setLoanDetailsByError("Loan Details  is required");
      } else if (!isValidSize) {
        setLoanDetailsByError(
          "Loan Details should be between 2 and 40 characters"
        );
      } else {
        setLoanDetailsByError("");
      }
    }

    setFormData({
      ...formData,
      [name]: value,
      installment: emiPay,
      repaymentTotal: pay,
      totalPaymentCleared: emiClear,
    });

    repaymentAmtTotal();
    emi();
    cleared();
  };

  const repaymentAmtTotal = () => {
    var total =
      parseFloat(formData.amount) +
      parseFloat(formData.amount) *
        (parseFloat(formData.interestPersentage) / 100);
    var amtTotal = parseFloat(formData.amount);

    setPay(formData.interestPersentage.length > 0 ? total : amtTotal);
  };

  const emi = () => {
    var emiAmt = pay / parseFloat(formData.installmentPeriod);
    setEmiPay(emiAmt);
  };

  const cleared = () => {
    var emiTotal = emiPay * parseInt(formData.installmentCleared);
    setEmiClear(emiTotal);
  };

  useEffect(() => {
    repaymentAmtTotal();
    emi();
    cleared();
  }, [
    formData.amount,
    formData.interestPersentage,
    formData.installmentPeriod,
    formData.installmentCleared,
  ]);

  const LoanStatusList = [
    {
      value: "Approved",
      label: "Approved",
    },
    {
      value: "Pending",
      label: "Pending",
    },
    {
      value: "Disbursed",
      label: "Disbursed",
    },
    {
      value: "In Repayment",
      label: "In Repayment",
    },
    {
      value: "Delinquent",
      label: "Delinquent",
    },
    {
      value: "Default",
      label: "Default",
    },
    {
      value: "Underwriting",
      label: "Underwriting",
    },
    {
      value: "Closed",
      label: "Closed",
    },
    {
      value: "Refinanced",
      label: "Refinanced",
    },
  ];


  const cancelButton = () => {
    setFormVisible(false)
    setToggle(false)
    setFormData({
      employeeName: "",
      permittedBy: "",
      loanDetails: "",
      approveDate: "",
      repaymentForm: "",
      amount: "",
      interestPersentage: "",
      installmentPeriod: "",
      status: "",
      installmentCleared: "",
    })
  }

  let buttonClick = formData.employeeName.length > 0 && formData.permittedBy.length > 0 && formData.loanDetails.length > 0 && formData.approveDate.length > 0 && formData.repaymentForm.length > 0 && formData.amount.length > 0 && formData.interestPersentage.length > 0 && formData.installmentPeriod.length > 0 && formData.installmentCleared.length > 0;

  return (
    <div>
    <form onSubmit={handleSubmit}>
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
        style={{ margin: "5px 3px" }}
      />
      <div style={{ display: "flex", gap: "10px", margin: "5px 0" }}>
        <TextField
          margin="dense"
          label="Permitted By"
          type="text"
          fullWidth
          name="permittedBy"
          id="permittedBy"
          value={formData.permittedBy}
          onChange={(e) => handleInputChange(e)}
          required
          helperText={permittedByError}
          error={Boolean(permittedByError)}
        />
        <TextField
          margin="dense"
          label="Loan Details"
          type="text"
          fullWidth
          name="loanDetails"
          id="loanDetails"
          value={formData.loanDetails}
          onChange={(e) => handleInputChange(e)}
          required
          helperText={loanDetailsByError}
          error={Boolean(loanDetailsByError)}
        />
      </div>

      <div style={{ display: "flex", gap: "10px", margin: "5px 0" }}>
        <TextField
          margin="dense"
          label="Approve Date"
          type="date"
          fullWidth
          name="approveDate"
          id="approveDate"
          required
          InputLabelProps={{
            shrink: true,
          }}
          value={formData.approveDate}
          onChange={(e) => handleInputChange(e)}
        />
        <TextField
          margin="dense"
          label="Repayment Form"
          type="date"
          fullWidth
          name="repaymentForm"
          id="repaymentForm"
          required
          InputLabelProps={{
            shrink: true,
          }}
          value={formData.repaymentForm}
          onChange={(e) => handleInputChange(e)}
        />
        <TextField
          margin="dense"
          label="Amount"
          type="number"
          fullWidth
          name="amount"
          id="amount"
          value={formData.amount}
          onChange={(e) => handleInputChange(e)}
          required
        />
      </div>

      <div style={{ display: "flex", gap: "10px", margin: "5px 0" }}>
        <TextField
          margin="dense"
          label="Interest Percentage"
          type="number"
          fullWidth
          name="interestPersentage"
          id="interestPersentage"
          value={formData.interestPersentage}
          onChange={(e) => handleInputChange(e)}
          required
        />
        <TextField
          margin="dense"
          label="Installment Period"
          type="number"
          fullWidth
          name="installmentPeriod"
          id="installmentPeriod"
          value={formData.installmentPeriod}
          onChange={(e) => handleInputChange(e)}
          required
        />
        <TextField
          margin="dense"
          label="Repayment Total"
          type="number"
          fullWidth
          name="repaymentTotal"
          id="repaymentTotal"
          InputLabelProps={{ shrink: true }}
          value={pay}
          required
          disabled
        />
      </div>
      <div style={{ display: "flex", gap: "10px", margin: "5px 0" }}>
        <TextField
          margin="dense"
          label="Installment"
          type="number"
          fullWidth
          name="installment"
          id="installment"
          value={emiPay}
          InputLabelProps={{ shrink: true }}
          required
        />
        <TextField
          id="status"
          margin="dense"
          select
          label="Account Type"
          fullWidth
          defaultValue="Choose"
          SelectProps={{
            native: true,
          }}
          InputLabelProps={{
            shrink: true,
            htmlFor: "accountType", // Add the 'htmlFor' property with the ID of the input field
          }}
          value={formData.status}
          onChange={(e) => handleInputChange(e)}
          name="status"
          required
        >
          <option disabled value="">
            Choose Account Type
          </option>
          {LoanStatusList.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>

        <TextField
          margin="dense"
          label="Installment Cleared"
          type="number"
          fullWidth
          name="installmentCleared"
          id="installmentCleared"
          value={formData.installmentCleared}
          onChange={(e) => handleInputChange(e)}
          required
          error={formData.installmentCleared>formData.installmentPeriod }
          helperText={formData.installmentCleared>formData.installmentPeriod ? `Exceeding installment limit of ${formData.installmentPeriod}` : ""}
        />

        <TextField
          margin="dense"
          label="Total Payment Cleared"
          type="number"
          fullWidth
          name="totalPaymentCleared"
          id="totalPaymentCleared"
          value={emiClear}
          InputLabelProps={{ shrink: true }}
          required
          disabled
        />
      </div>
      <div className="data-buttons">
        <Button
          id="input-btn-submit"
          type="submit"
          onClick={saveLoan}
          variant="outlined"
          disabled={formData.installmentCleared>formData.installmentPeriod ? true : false}
        >
          Submit
        </Button>
        <Button
          id="input-btn-cancel"
          onClick={() => setFormVisible(false)}
          variant="outlined"
        >
          Cancel
        </Button>
      </div>
    </form>
  </div>
  );
};

export default GrantLoanForm;
