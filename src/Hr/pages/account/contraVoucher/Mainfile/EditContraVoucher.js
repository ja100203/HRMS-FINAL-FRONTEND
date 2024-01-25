import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../../../components/Header";
import SideBar from "../../../../components/SideBar";
import Button from "@mui/material/Button";

const EditContraVoucher = () => {
  let navigate = useNavigate();

  const { id } = useParams();

  const [contraVoucher, setContraVoucher] = useState({
    voucherType: "",
    reversedAccountHead: "",
    date: "",
    remark: "",
    accountName: "",
    ledgerComment: "",
    debit: "",
    credit: "",
    
  });

  const {
    voucherType,
    reversedAccountHead,
    date,
    remark,
    accountName,
    ledgerComment,
    debit,
    credit
    
  } = contraVoucher;

  useEffect(() => {
    loadContraVoucher();
  }, []);

  const loadContraVoucher = async () => {
    const result = await axios.get(`http://13.126.190.50:5000/contraVoucher/get/${id}`);
    setContraVoucher(result.data);
  };

  const handleInputChange = (e) => {
    setContraVoucher({
      ...contraVoucher,
      [e.target.name]: e.target.value,
    });
  };

  const updateContraVoucher = async (e) => {
    e.preventDefault();
    await axios.put(`http://13.126.190.50:5000/contraVoucher/update/${id}`, contraVoucher);
    navigate("hr/account/contra-voucher");
  };

  return (
    <div>
    <Header />
    <div className="dashboard-container">
      <SideBar />
      <div className="head-foot-part" style={{ padding: "0" }}>
      <div className="col-sm-8 py-2 px-5 offset-2 shadow">
      <h2 className="mt-5"> Edit Contra Voucher</h2>
      <form onSubmit={(e) => updateContraVoucher(e)}>
        

        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor=" voucherType">
            Voucher Type
          </label>
          <input
            className="form-control col-sm-6"
            type="text"
            name="voucherType"
            id=" voucherType"
            required
            value={voucherType}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="reversedAccountHead">
           Reverse Account Head
          </label>
          <input
            className="form-control col-sm-6"
            type="text"
            name="reversedAccountHead"
            id="reversedAccountHead"
            required
            value={reversedAccountHead}
            onChange={(e) => handleInputChange(e)}
          />
        </div>

        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="date">
            Date 
          </label>
          <input
            className="form-control col-sm-6"
            type="date"
            name="date"
            id="date"
            required
            value={date}
            onChange={(e) => handleInputChange(e)}
          />
        </div>

        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="remark">
            Remarks
          </label>
          <input
            className="form-control col-sm-6"
            type="text"
            name="remark"
            id="remark"
            required
            value={remark}
            onChange={(e) => handleInputChange(e)}
          />
        </div>

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
        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="debit">
            Debit
          </label>
          <input
            className="form-control col-sm-6"
            type="text"
            name="debit"
            id="debit"
            required
            value={debit}
            onChange={(e) => handleInputChange(e)}
          />
        </div>

        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="credit">
            Credit
          </label>
          <input
            className="form-control col-sm-6"
            type="text"
            name="credit"
            id="credit"
            required
            value={credit}
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
            <Button
              id="input-btn-cancel"
                  variant="outlined"
                  onClick={() => navigate("/hr/account/contra-voucher")}
            >
              Back
            </Button>
          </div>
        </div>
      </form>
    </div>
      </div>
    </div>
  </div>
    
  );
};

export default EditContraVoucher;
