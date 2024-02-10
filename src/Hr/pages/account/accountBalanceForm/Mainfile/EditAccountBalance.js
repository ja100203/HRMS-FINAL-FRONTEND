import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../../../../components/Header";
import SideBar from "../../../../components/SideBar";

const EditAccountBalance = () => {
  let navigate = useNavigate();

  const { id } = useParams();

  const [accountBalance, setAccountBalance] = useState({
    employeeFullName: "",
    hsaBalance: "",
    fsaBalance: ""
    
  });

  const {
    employeeFullName,
    hsaBalance,
    fsaBalance
    
  } = accountBalance;

  useEffect(() => {
    loadAccountBalance();
  }, []);

  const loadAccountBalance = async () => {
    const result = await axios.get(`http://13.126.190.50:5000/accountBalance/get/${id}`);
    setAccountBalance(result.data);
  };

  const handleInputChange = (e) => {
    setAccountBalance({
      ...accountBalance,
      [e.target.name]: e.target.value,
    });
  };

  const updateAccountBalance = async (e) => {
    e.preventDefault();
    await axios.put(`http://13.126.190.50:8093/accountBalance/update/${id}`, accountBalance);
    navigate("/hr/account/accountBalance");
  };

  return (
    <div>
    <Header />
    <div className="dashboard-container">
      <SideBar />
      <div className="head-foot-part" style={{ padding: "0" }}>
      <div className="col-sm-8 py-2 px-5 offset-2 shadow">
      <h2 className="mt-5"> Edit Account Balance</h2>
      <form onSubmit={(e) => updateAccountBalance(e)}>
        

        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="employeeFullName">
            Employee Name
          </label>
          <input
            className="form-control col-sm-6"
            type="text"
            name=" employeeFullName"
            id=" employeeFullName"
            required
            value={FormData.employeeFullName}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="hsaBalance">
           HSA BALANCE
          </label>
          <input
            className="form-control col-sm-6"
            type="number"
            name="hsaBalance"
            id="hsaBalance"
            required
            value={FormData.hsaBalance}
            onChange={(e) => handleInputChange(e)}
          />
        </div>

        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="fsaBalance">
           FSA BALANCE
          </label>
          <input
            className="form-control col-sm-6"
            type="number"
            name="fsaBalance"
            id="fsaBalance"
            required
            value={FormData.fsaBalance}
            onChange={(e) => handleInputChange(e)}
          />
        </div>

        

        

        <div className="row mb-5">
          <div className="col-sm-2">
            <button
              type="submit"
              className="btn btn-outline-success btn-lg"
            >
              Save
            </button>
          </div>

          <div className="col-sm-2">
            <Link
              to={"/hr/account/accountBalance"}
              type="submit"
              className="btn btn-outline-warning btn-lg"
            >
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </div>
      </div>
    </div>
  </div>
    
  );
};

export default EditAccountBalance;
