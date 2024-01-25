import React, { useEffect, useState } from "react";
import Header from "../../../../components/Header";
import SideBar from "../../../../components/SideBar";
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import { MdAdd } from "react-icons/md";
import { BiSolidHide } from "react-icons/bi";
import Collapse from "@mui/material/Collapse";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import PurchaseOrderForm from "../PurchaseOrderForm";
import PurchaseOrderTable from "../PurchaseOrderTable";

import * as PurchaseOrderApi from "../PurchaseOrderApi";
import PurchaseOrderState from "../PurchaseOrderState";
import CompanyLogoFile from "../../../../components/CompanyLogoFile";

const PurchaseOrderView = () => {
  const {
    purchaseorder,
    genId,
    setGenId,
    file,
    toggle,
    setToggle,
    setFile,
    formVisible,
    setFormVisible,
    fileError,
    totalAmount,
    setTotalAmount,
    setFileError,
    dateError,
    setDateError,
    setPurchaseOrder,
    open,
    setOpen,
    formData,
    setFormData,
    recDelete,
    setRecDelete,
  } = PurchaseOrderState();

  const handleButtonClick = () => {
    setFormVisible((prev) => !prev);
  };

  useEffect(() => {
    handleDelete();
    loadAllPurchase();
  }, []);

  const loadAllPurchase = async () => {
    const result = await PurchaseOrderApi.loadAllPurchase();
    setPurchaseOrder(result);
  };

  const handleDelete = async () => {
    await PurchaseOrderApi.deletePurchase(recDelete);
    loadAllPurchase();
  };

  console.log(formData);

  useEffect(() => {
    loadAllPurchase();
  }, []);
  const [menu, setMenu] = useState(false);

  return (
    <div>
      <div id="header-container" className="header-container">
        <CompanyLogoFile />
        <Header menu={menu} setMenu={setMenu} />
      </div>
      <div className="dashboard-container">
        <SideBar menu={menu} setMenu={setMenu} />
        <div className="head-foot-part">
          <section>
            <div
              className="above-table"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setToggle(!toggle);
                    handleButtonClick();
                  }}
                  id="add-btn"
                >
                  {toggle ? (
                    <div className="hide">
                      <BiSolidHide />
                      HIDE
                    </div>
                  ) : (
                    <div className="add">
                      <MdAdd />
                      ADD PURCHASE ORDER
                    </div>
                  )}
                </Button>
              </div>
            </div>
            <Collapse in={formVisible}>
              <Card variant="outlined">
                <div style={{ marginTop: "20px" }}>
                  <h3 className="form-header">Add Purchase ORDER</h3>
                  <DialogContent>
                    <Card style={{ margin: "20px", border: "1px solid black" }}>
                      <CardContent>
                        <PurchaseOrderForm
                          formData={formData}
                          setFormData={setFormData}
                        />
                      </CardContent>
                    </Card>
                  </DialogContent>
                </div>
              </Card>
            </Collapse>
            <PurchaseOrderTable
              purchaseorder={purchaseorder}
              setRecDelete={setRecDelete}
            />
            <div></div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PurchaseOrderView;
