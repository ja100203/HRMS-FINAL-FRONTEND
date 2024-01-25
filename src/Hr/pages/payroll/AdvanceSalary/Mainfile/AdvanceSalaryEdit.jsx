import React, {
    useEffect,
    useState,
  } from "react";
  import axios from "axios";
  import Header from "../../../../components/Header";
import SideBar from "../../../../components/SideBar";
import CompanyLogoFile from "../../../../components/CompanyLogoFile";
import Button from "@mui/material/Button";
  
  import {
    Link,
    useNavigate,
    useParams,
  } from "react-router-dom";
  
  const EditAdvanceSalary = () => {
    let navigate = useNavigate();
  
    const { id } = useParams();
  
    const [advancesalary, setAdvanceSalary] = useState({
      advancesalaryTitle: "",
    clientName: "",
    companyName: "",
    startDate: "",
    endDate: "",
    advancesalaryManagers: "",
    priority: "",
    description: "",
    summary: "",
    });
    const {
      advancesalaryTitle,
    clientName,
    companyName,
    startDate,
    endDate,
    advancesalaryManagers,
    priority,
    description,
    summary
    } = advancesalary
  
    useEffect(() => {
      loadAdvanceSalary();
    }, []);
  
    const loadAdvanceSalary = async () => {
      const result = await axios.get(
        `http://13.126.190.50:5000/advanceSalary/get/${id}`
      );
      setAdvanceSalary(result.data);
    };
  
    const handleInputChange = (e) => {
      setAdvanceSalary({
        ...advancesalary,
        [e.target.name]: e.target.value,
      });
    };
    const updateAdvanceSalary = async (e) => {
      e.preventDefault();
      await axios.put(
        `http://13.126.190.50:5000/advanceSalry/update/${id}`,
        advancesalary
      );
      navigate("/hr/payroll/advance-Salary");
    };

    const [menu, setMenu] = useState(false);
  
    return (
      <div>
      <div id="header-container" className="header-container">
         <CompanyLogoFile />
         <Header menu={menu} setMenu={setMenu} />
       </div>
       <div className="dashboard-container">
         <SideBar menu={menu} setMenu={setMenu} />
       <div className="head-foot-part" style={{ padding: "0" }}>
      
      <div className="col-sm-8 py-2 px-5 shadow">
        <h2 className="mt-5"> Edit advancesalary</h2>
        <form onSubmit={(e) => updateAdvanceSalary(e)}>
          <div className="input-group mb-5">
            <label
              className="input-group-text"
              htmlFor="advancesalaryTitle">
              advancesalary Title
            </label>
            <input
              className="form-control col-sm-6"
              type="text"
              name="advancesalaryTitle"
              id="advancesalaryTitle"
              required
              value={advancesalaryTitle}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
  
          <div className="input-group mb-5">
            <label
              className="input-group-text"
              htmlFor="clientName">
              Client Name
            </label>
            <input
              className="form-control col-sm-6"
              type="text"
              name="clientName"
              id="clientName"
              required
              value={clientName}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
  
          <div className="input-group mb-5">
            <label
              className="input-group-text"
            >
            Company Name
            </label>
            <input
              className="form-control col-sm-6"
              type="text"
              name="companyName"
              id="companyName"
              required
              value={companyName}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
  
          <div className="input-group mb-5">
            <label
              className="input-group-text"
            >
            Start Date
            </label>
            <input
              className="form-control col-sm-6"
              type="date"
              name="startDate"
              id="startDate"
              required
              value={startDate}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="input-group mb-5">
          <label
            className="input-group-text"
          >
          End Date
          </label>
          <input
            className="form-control col-sm-6"
            type="date"
            name="endDate"
            id="endDate"
            required
            value={endDate}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className="input-group mb-5">
        <label
          className="input-group-text"
        >
        advancesalary Managers
        </label>
        <input
          className="form-control col-sm-6"
          type="text"
          name="advancesalaryManagers"
          id="advancesalaryManagers"
          required
          value={ advancesalaryManagers}
          onChange={(e) => handleInputChange(e)}
        />
      </div>
      <div className="input-group mb-5">
      <label
        className="input-group-text"
      >
      Priority
      </label>
      <input
        className="form-control col-sm-6"
        type="text"
        name=" priority"
        id=" priority"
        required
        value={ priority}
        onChange={(e) => handleInputChange(e)}
      />
    </div>
    <div className="input-group mb-5">
    <label
      className="input-group-text"
    >
    Description
    </label>
    <input
      className="form-control col-sm-6"
      type="text"
      name=" description"
      id="description"
      required
      value={description}
      onChange={(e) => handleInputChange(e)}
    />
  </div>
  <div className="input-group mb-5">
  <label
    className="input-group-text"
  >
  Summary
  </label>
  <input
    className="form-control col-sm-6"
    type="text"
    name="summary"
    id="summary"
    required
    value={summary}
    onChange={(e) => handleInputChange(e)}
  />
</div>
 <div className="data-buttons">
                <Button id="input-btn-submit" variant="outlined" type="submit">
                  Submit
                </Button>
                <Button
                  id="input-btn-cancel"
                  variant="outlined"
                  onClick={() => navigate("/hr/payroll/advance-Salary")}
                >
                  Back
                </Button>
              </div>
        </form>
        </div>
        </div>
        </div>
      </div>
    );
  };
  
  export default EditAdvanceSalary;
  