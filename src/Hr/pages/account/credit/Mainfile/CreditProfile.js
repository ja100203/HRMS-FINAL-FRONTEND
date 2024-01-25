import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../../../../components/Header";
import SideBar from "../../../../components/SideBar";
import { loadCredit } from "../CreditApi";

const CreditProfile = () => {
  const { id } = useParams();

  const [credit, setCredit] = useState({
    voucherType: "",
      debitAccountHead: "",
      date: "",
      remark: "",
      accountName: "",
      subType: "",
      ledgerComment: "",
      amount: "",
  });

  useEffect(() => {
    loadCredit();
  }, []);

  const loadCredit = async () => {
    const result = await axios.get(`http://13.126.190.50:5000/credit/get/${id}`);
    setCredit(result.data);
  };

  return (
    <div>
      <Header />
      <div className="dashboard-container">
        <SideBar />
        <div className="head-foot-part" style={{ padding: "0" }}>
          <section className="shadow" style={{ backgroundColor: "whitesmoke" }}>
            <div className="container py-5">
              <div className="row">
                <div className="col-lg-3">
                  <div className="card mb-4">
                    <div className="card-body text-center">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                        alt="avatar"
                        className="rounded-circle img-fluid"
                        style={{ width: 150 }}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-lg-9">
                  <div className="card mb-4">
                    <div className="card-body">
                      <hr />

                      <div className="row">
                        <div className="col-sm-3">
                          <h5 className="mb-0">Voucher Type</h5>
                        </div>

                        <div className="col-sm-9">
                          <p className="text-muted mb-0">
                            {credit.voucherType}
                          </p>
                        </div>
                      </div>

                      <hr />

                      <div className="row">
                        <div className="col-sm-3">
                          <h5 className="mb-0">Debit Account Header</h5>
                        </div>

                        <div className="col-sm-9">
                          <p className="text-muted mb-0">
                            {credit.debitAccountHead}
                          </p>
                        </div>
                      </div>
                      <hr />

                      <div className="row">
                        <div className="col-sm-3">
                          <h5 className="mb-0">Date</h5>
                        </div>

                        <div className="col-sm-9">
                          <p className="text-muted mb-0">{credit.date}</p>
                        </div>
                      </div>
                      <hr />

                      <div className="row">
                        <div className="col-sm-3">
                          <h5 className="mb-0">Remarks</h5>
                        </div>

                        <div className="col-sm-9">
                          <p className="text-muted mb-0">
                            {credit.remark}
                          </p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-3">
                          <h5 className="mb-0">Account Name</h5>
                        </div>

                        <div className="col-sm-9">
                          <p className="text-muted mb-0">{credit.accountName}</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-3">
                          <h5 className="mb-0">Sub Type</h5>
                        </div>

                        <div className="col-sm-9">
                          <p className="text-muted mb-0">{credit.subType}</p>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-sm-3">
                          <h5 className="mb-0">Ledger Comment</h5>
                        </div>

                        <div className="col-sm-9">
                          <p className="text-muted mb-0">{credit.ledgerComment}</p>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-sm-3">
                          <h5 className="mb-0">Amount</h5>
                        </div>

                        <div className="col-sm-9">
                          <p className="text-muted mb-0">{credit.amount}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CreditProfile;
