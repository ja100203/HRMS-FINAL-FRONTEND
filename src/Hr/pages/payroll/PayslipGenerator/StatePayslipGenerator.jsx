import {useState} from 'react'

const StatePayslipGenerator = () => {
    const [basicSalary, setBasicSalary] = useState("");
    const [formVisible, setFormVisible] = useState(false);
    const [toggle, setToggle] = useState(false);
    const [salary, setSalary] = useState([]);
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);
    const [grossSal, setGrossSal] = useState(0);
    const [deduction, setDeduction] = useState(0);
    const [netAmount, setNetAmount] = useState(0);
    const [pfVal, setPfVal] = useState(0);
    const [recDelete, setRecDelete] = useState("");
    const [formData, setFormData] = useState({
      employeeName:"",
      employeeId:"",
      designation:"",
      noOfWorkingDays:0,
      basicSalary:0,
      employeeBasicSalary:0,
      houseRentAllowance: 0,
      conveyanceAllowance: 0,
      medicalAllowance: 0,
      noOfChildren: 0,
      companyPreferedAllowance: 0,
      educationalAllowance: 0,
      travellingAllowance: 0,
      dearnessAllowance: 0,
      specialAllowance: 0,
      otherAllowance: 0,
      overtime: 0,
      overtimeSalary: 0,
      grossSalary: 0,
      providentFund:0,
      ESIC:0,
      state:"",
      professionalTax:0,
      TDS: 0,
      netSalary: 0,
      providentFundContri: 0,
      ESICContri: 0,
      gratuity: 0,
      gratuityYear: 0,
      bonus: 0,
      variablePay: 0,
      costToCompany: 0,
    });
    return {
      pfVal, setPfVal, recDelete, setRecDelete, basicSalary, setBasicSalary,formVisible, setFormVisible,toggle, setToggle,salary, setSalary,search, setSearch,open, setOpen,grossSal, setGrossSal,deduction, setDeduction,netAmount, setNetAmount,formData, setFormData
    }
}

export default StatePayslipGenerator;