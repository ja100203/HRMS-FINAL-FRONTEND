import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../../../../components/Header";
import SideBar from "../../../../components/SideBar";

const EditDebit = () => {
  let navigate = useNavigate();

  const { id } = useParams();

  const [debit, setDebit] = useState({

    
    accountName: "",
    subType: "",
    ledgerComment: "",
    
  });

  const {
   
    accountName,
    subType,
    ledgerComment,
    
  } = debit;

  useEffect(() => {
    loadDebit();
  }, []);

  const loadDebit = async () => {
    const result = await axios.get(`http://13.126.190.50:5000/debit/get/${id}`);
    setDebit(result.data);
  };

  const handleInputChange = (e) => {
    setDebit({
      ...debit,
      [e.target.name]: e.target.value,
    });
  };

  const updateDebit = async (e) => {
    e.preventDefault();
    await axios.put(`http://13.126.190.50:5000/debit/update/${id}`, debit);
    navigate("hr/account/debit");
  };

  return (
    <div>
    <Header />
    <div className="dashboard-container">
      <SideBar />
      <div className="head-foot-part" style={{ padding: "0" }}>
      <div className="col-sm-8 py-2 px-5 offset-2 shadow">
      <h2 className="mt-5"> Edit Debit</h2>
      <form onSubmit={(e) => updateDebit(e)}>
        

      <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="accountName">
            Account Name
          </label>
          <input
            className="form-control col-sm-6"
            type="text"
            name="accountName"
            id="accountName"
            required
            value={accountName}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="subType">
          Sub Type
          </label>
          <input
            className="form-control col-sm-6"
            type="text"
            name="subType"
            id="subType"
            required
            value={subType}
            onChange={(e) => handleInputChange(e)}
          />
        </div>

        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="ledgerComment">
            Ledger Comment
          </label>
          <input
            className="form-control col-sm-6"
            type="text"
            name="ledgerComment"
            id="ledgerComment"
            required
            value={ledgerComment}
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
              to={"hr/account/debit"}
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

export default EditDebit;
