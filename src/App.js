import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "/node_modules/bootstrap/dist/js/bootstrap.min.js";
import MainHrRouting from "../src/Hr/components/MainHrRouting";
import MainEmpRouting from "../src/Employee/components/MainEmpRouting";

function App() {
  return (
    <div className="App">
      <MainHrRouting />
      <MainEmpRouting />
    </div>
  );
}

export default App;
