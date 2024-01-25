import React from "react";
import { Route, Routes } from "react-router-dom";
import AdvanceSalaryView from "../payroll/AdvanceSalary/Mainfile/AdvanceSalaryView";
import AdvanceSalaryEdit from "../payroll/AdvanceSalary/Mainfile/AdvanceSalaryEdit";
import SalaryTemplateView from "../payroll/Salarytemplate/Mainfile/SalaryTemplateView";
import EditSalaryTemplate from "./Salarytemplate/Mainfile/EditSalaryTemplate";
const RoutingProject = () => {
  return (
    <div>
      <div className="App">
        <Routes>
          <Route
            path="/hr/payroll/advance-Salary"
            exact
            element={<AdvanceSalaryView />}
          />
          <Route
            path="/payroll/edit-advance-salary/:id"
            exact
            element={<AdvanceSalaryEdit />}
          />
          <Route
            path="/hr/payroll/salary-template"
            exact
            element={<SalaryTemplateView />}
          />
          <Route
            path="/payroll/edit-salary-template/:id"
            exact
            element={<EditSalaryTemplate />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default RoutingProject;
