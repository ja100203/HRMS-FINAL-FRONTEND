import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../../components/Dashboard";
import AccountBalanceView from "./accountBalanceForm/Mainfile/AccountBalanceView";
import SubTypeView from "./subType/Mainfile/SubTypeView";
import DebitView from "./debit/Mainfile/DebitView";
import CreditView from "./credit/Mainfile/CreditView";
import FinacialYearView from "./financialYear/Mainfile/FinancialYearView";
import ContraVoucherView from "./contraVoucher/Mainfile/ContraVoucherView";
import OpeningBalanceView from "./openingbalance/Mainfile/BalanceView";
import EditAccountBalance from "./accountBalanceForm/Mainfile/EditAccountBalance";
import EditContraVoucher from "./contraVoucher/Mainfile/EditContraVoucher";
import EditSubType from "./subType/Mainfile/EditSubtype";
import EditFinancialYear from "./financialYear/Mainfile/EditFinancialYear";

const routesData = [
  { path: "/", element: <Dashboard /> },
  { path: "/hr/account/account-balance", element: <AccountBalanceView /> },
  {
    path: "/account/edit-account-balance/:id",
    element: <EditAccountBalance />,
  },
  { path: "/hr/account/sub-type", element: <SubTypeView /> },
  { path: "/account/edit-sub-type/:id", element: <EditSubType /> },
  { path: "/hr/account/debit", element: <DebitView /> },
  { path: "/hr/account/credit-voucher", element: <CreditView /> },
  { path: "/hr/account/financial-year", element: <FinacialYearView /> },
  { path: "/account/edit-financial-year/:id", element: <EditFinancialYear /> },
  { path: "/hr/account/contra-voucher", element: <ContraVoucherView /> },
  { path: "/hr/account/opening-balance", element: <OpeningBalanceView /> },
  { path: "/account/edit-contra-voucher/:id", element: <EditContraVoucher /> },
  // { path: "/account/debit-voucher", element: <ContraVoucherView /> },
];

const RoutingAccount = () => {
  return (
    <div>
      <div className="App">
        <Routes>
          {routesData.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </div>
    </div>
  );
};

export default RoutingAccount;
