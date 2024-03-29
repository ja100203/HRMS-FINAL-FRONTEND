import {useState} from 'react'
// import DepartmentView from './Mainfile/DepartmentView';

const StateSalaryTemplate = () => {
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

      grossIncomeOld:0,
      standardDeductionOld:50000,
      investmentOld:0,
      taxableOld:0,
      grossIncomeNew:0,
      standardDeductionNew:50000,
      investmentNew:0,
      taxableNew:0,

      section80c:0,
      employeeProvidentFund:0,
      publicProvidentFund:0,
      equityLinkedSaving:0,
      lifeInsurancePremium:0,
      others:0,

      section80ccd:0,
      nationalPensionScheme:0,
      atalPensionScheme:0,

      section80tta:0,
      savingAccountInterest:0,

      section80d:0,
      selfMedicalInsurance:0,
      parentsMedicalInsurance:0,

      section80ee:0,
      homeLoanInterest:0,

      section80gg:0,
      houseRent:0,

      role:"",

      section80e:0,
      educationalLoanInterest:0,

      section80g:0,
      charity:0,

      slab5Old:0,
      slab10Old:0,
      slab15Old:0,
      slab20Old:0,
      slab30Old:0,

      slab5New:0,
      slab10New:0,
      slab15New:0,
      slab20New:0,
      slab30New:0,

      sumOfSlabOld:0,
      sumOfSlabNew:0,

      taxRebate87aOld:0,
      taxRebate87aNew:0,

      taxAfterTaxRebateOld:0,
      taxAfterTaxRebateNew:0,

      cess4Old:0,
      cess4New:0,

      totalIncomeTaxOld:0,
      totalIncomeTaxNew:0,

      TDSOld:0,
      TDSNew:0,
    });
    return {
      pfVal, setPfVal, recDelete, setRecDelete, basicSalary, setBasicSalary,formVisible, setFormVisible,toggle, setToggle,salary, setSalary,search, setSearch,open, setOpen,grossSal, setGrossSal,deduction, setDeduction,netAmount, setNetAmount,formData, setFormData
    }
}

export default StateSalaryTemplate;