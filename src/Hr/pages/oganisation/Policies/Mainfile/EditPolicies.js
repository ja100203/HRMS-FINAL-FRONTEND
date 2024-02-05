import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import Button from "@mui/material/Button";


import Header from "../../../../components/Header";
import SideBar from "../../../../components/SideBar";
import CompanyLogoFile from "../../../../components/CompanyLogoFile";

const EditPolicies = () => {
  let navigate = useNavigate();

  const { id } = useParams();

  const [expenses, setExpenses] = useState({
    title: "",
  });

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
    const result = await axios.get(`http://13.126.190.50:8081/policies/get/${id}`);
    setExpenses(result.data);
  };

  const handleInputChange = (e) => {
    setExpenses({
      ...expenses,
      [e.target.name]: e.target.value,
    });
  };

  const updateExpenses = async (e) => {
    e.preventDefault();
    await axios.put(`http://13.126.190.50:8081/policies/update/${id}`, expenses);
    navigate("/hr/organisation/policies");
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
      <div className="col-sm-8 py-2 px-5  shadow">
      <h2 className="mt-5"> Edit Expenses</h2>
      <form onSubmit={(e) => updateExpenses(e)}>
        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="purchaseDate">
            Title
          </label>
          <input
            className="form-control col-sm-6"
            type="text"
            name="title"
            id="title"
            required
            value={expenses.title}
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
                  onClick={() => navigate("/hr/organisation/policies")}
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

export default EditPolicies;
