import React,{ useEffect, useState } from 'react'
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom"
import Header from '../../../../components/Header';
import SideBar from '../../../../components/SideBar';
import CompanyLogoFile from "../../../../components/CompanyLogoFile";
import Button from "@mui/material/Button";


const EditTrainer = () => {

  let navigate = useNavigate();

  const {id} = useParams();
  const [trainer, setTrainer] = useState({
    trainersFullName: "",
    emailAddress: "",
    technicalSkills: "",
    phoneNo: "",
    softSkills: "",
    certifications: ""

  })

  useEffect(() => {
    loadTrainer();
  },[])

  const loadTrainer = async () => {
    const result = await axios.get(`http://13.126.190.50:5000/trainerslist/get/${id}`);
    setTrainer(result.data);
  };

  const handleInputChange = (e) => {
    setTrainer({
      ...trainer,
      [e.target.name]: e.target.value,
    });
  };

  const updateTrainer = async (e) => {
    e.preventDefault();
    await axios.put(`http://13.126.190.50:5000/trainerslist/update/${id}`, trainer);
    navigate("/hr/trainer");
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
            <h2 className="mt-5"> Edit Trainer</h2>
            <form onSubmit={(e) => updateTrainer(e)}>
              <div className="input-group mb-5">
                <label className="input-group-text" htmlFor="Budget">
                  Trainer Full Name
                </label>
                <input
                  className="form-control col-sm-6"
                  type="text"
                  name="trainersFullName"
                  id="trainersFullName"
                  required
                  value={trainer.trainersFullName}
                  onChange={(e) => handleInputChange(e)}
                />
              </div>

              <div className="input-group mb-5">
                <label className="input-group-text" htmlFor="clientName">
                  Trainer's Email Address
                </label>
                <input
                  className="form-control col-sm-6"
                  type="text"
                  name="emailAddress"
                  id="emailAddress"
                  required
                  value={trainer.emailAddress}
                  onChange={(e) => handleInputChange(e)}
                />
              </div>


              <div className="input-group mb-5">
                <label className="input-group-text">Phone No</label>
                <input
                  className="form-control col-sm-6"
                  type="text"
                  name="phoneNo"
                  id="phoneNo"
                  required
                  value={trainer.phoneNo}
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
                  onClick={() => navigate("/hr/trainer")}
                >
                  Back
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditTrainer