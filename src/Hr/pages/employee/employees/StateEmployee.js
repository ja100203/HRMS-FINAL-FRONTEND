import {useState} from 'react'

const StateEmployee = () => {

    const [formVisible, setFormVisible] = useState(false);
    const [toggle, setToggle] = useState(false);
    const [employeeData, setEmployeeData] = useState([]);
    const [photograph, setPhotograph] = useState('');
    const [employee, setemployees] = useState([]);
    const [dateError, setDateError] = useState("");
    const [handleStep, setHandleStep] = useState(0);
    const [activeStep, setActiveStep] = useState(0);
    const [email, setEmail] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [businessEmail, setBusinessEmail] = useState('');
    const [emailBusinessError, setEmailBusinessError] = useState(true);
    const [employeeName, setEmployeeName] = useState("");
    const [branchName, setBranchName] = useState("");
    const [branchErrorMsg, setBranchErrorMsg] = useState("");
    const [teamLeaderName, setTeamLeaderName] = useState("");
    const [reportingTo, setReporting] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [accountErrorMsg, setAccountErrorMsg] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [tinNumber, setTinNumber] = useState("");
    const [countryCode, setCountryCode] = useState('+1');
    const [phone, setPhone] = useState("");
    const [phoneError, setPhoneError] = useState(false);
    const [homePhone, setHomePhone] = useState("");
    const [phoneHomeError, setHomePhoneError] = useState(false);
    const [cellPhone, setCellPhone] = useState("");
    const [phoneCellError, setCellPhoneError] = useState(false);
    const [sal, setSal] = useState(0);
    const [errorMsg, setErrorMsg] = useState('');
    const [alternativePhone, setAlternativePhone] = useState("");
    const [recDelete,setRecDelete] = useState("")
    const [formData, setFormData] = useState({

      employeeId:"",
      employeeName:"",
      designationName:"",
      email:"",
      phone:"",
      alternativePhone:"",
      country:"",
      city:"",
      zipCode:"",
      employeeRole:"",
      attendanceTime:"",
      employeeType:"",
      createdDate:"",
      accountNumber:"",
      bankName:"",
      ifscNumber:"",
      branchName:"",
      basicSalary:"",
      transportAllowance:"",
      grossSalary:"",
      tinNumber:"",
      hraAllowances:"",
      otherAllowances:"",
      pfAllowances:"",
      daAllowances:"",
      medicalAllowances:"",
      otherInsurance:"",
      tax:"",
      subDepartment:"",
      position:"",
      dutyType:"",
      hireDate:"",
      joiningDate:"",
      rateType:"",
      rateNumber:"",
      monthlyWorkHours:"",
      payFrequency:"",
      medical:"",
      family:"",
      transportation:"",
      others:"",
      teamLeaderName:"",
      reportingTo:"",
      dateOfBirth:"",
      gender:"",
      maritalStatus:"",
      workInCity:"",
      cityOfResidence:"",
      workPermit:"",
      businessEmail:"",
      homePhone:"",
      cellPhone:"",
      userEmailOrName:"",
      password:""

    });

  return {
    recDelete,setRecDelete,formVisible,setFormVisible,toggle,setToggle,employeeData,setEmployeeData,photograph,setPhotograph,employee,setemployees,formData,setFormData,dateError,setDateError,handleStep,setHandleStep,activeStep,setActiveStep,email,setEmail,isEmailValid,setIsEmailValid,businessEmail,setBusinessEmail,emailBusinessError,setEmailBusinessError,employeeName,setEmployeeName,branchName,setBranchName,branchErrorMsg,setBranchErrorMsg,teamLeaderName,setTeamLeaderName,reportingTo,setReporting,accountNumber,setAccountNumber,accountErrorMsg,setAccountErrorMsg,zipCode,setZipCode,tinNumber,setTinNumber,countryCode,setCountryCode,phone,setPhone,phoneError,setPhoneError,homePhone,setHomePhone,phoneHomeError,setHomePhoneError,cellPhone,setCellPhone,phoneCellError,setCellPhoneError,errorMsg,setErrorMsg,alternativePhone,setAlternativePhone,sal,setSal
}
}

export default StateEmployee