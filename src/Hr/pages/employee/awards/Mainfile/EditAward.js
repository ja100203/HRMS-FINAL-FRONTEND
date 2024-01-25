import React, {
	useEffect,
	useState,
} from "react";
import axios from "axios";

import {
	Link,
	useNavigate,
	useParams,
} from "react-router-dom";

import Button from "@mui/material/Button";
import Header from "../../../../components/Header";
import SideBar from "../../../../components/SideBar";
import CompanyLogoFile from "../../../../components/CompanyLogoFile";

const EditAward = () => {
	let navigate = useNavigate();

	const { id } = useParams();

	const [award, setAward] = useState({
		employeeName: "",
		awardBy: "",
		
	});
	

	useEffect(() => {
		loadAward();
	}, []);

	const loadAward = async () => {
		const result = await axios.get(
			`http://13.126.190.50:5000/awards/get/${id}`
		);
		setAward(result.data);
	};

	const handleInputChange = (e) => {
		setAward({
			...award,
			[e.target.name]: e.target.value,
		});
	};
	const updateAward = async (e) => {
		e.preventDefault();
		await axios.put(
			`http://13.126.190.50:5000/awards/update/${id}`,
			award
		);
		navigate("/hr/employee/awards");
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
			<h2 className="mt-5"> Edit Award</h2>
			<form onSubmit={(e) => updateAward(e)}>
				<div className="input-group mb-5">
					<label
						className="input-group-text"
						htmlFor="employeeName">
						Employee Name
					</label>
					<input
						className="form-control col-sm-6"
						type="text"
						name="employeeName"
						id="employeeName"
						required
						value={award.employeeName}
						onChange={(e) => handleInputChange(e)}
					/>
				</div>

				<div className="input-group mb-5">
					<label
						className="input-group-text"
						htmlFor="awardBy">
						Award By
					</label>
					<input
						className="form-control col-sm-6"
						type="text"
						name="awardBy"
						id="awardBy"
						required
						value={award.awardBy}	
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
                  onClick={() => navigate("/hr/employee/awards")}
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

export default EditAward;
