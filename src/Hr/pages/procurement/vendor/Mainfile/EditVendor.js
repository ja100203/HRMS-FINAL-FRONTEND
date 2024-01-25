import React, {
	useEffect,
	useState,
} from "react";
import axios from "axios";

import Header from "../../../../components/Header"
import SideBar from "../../../../components/SideBar"
import vendorLogoFile from "../../../../components/vendorLogoFile";


import * as api from "../api";
import StateVendor from "../StateVendor";
import {
	Link,
	useNavigate,
	useParams,
} from "react-router-dom";

const EditVendor = () => {
	let navigation = useNavigate();
	const { id } = useParams();

	const {
		vendor,setvendor
	} = StateVendor()
		
	const {
		vendorName,
      mobileNo,
      emailAddress,
      address,
      country,
      city,
      zipCode,
      previousBalance,
	} = vendor;

	useEffect(() => {
		loadVendor();
	}, []);


	const loadVendor= async () => {
		const result = await api.loadVendor(id)
		setvendor(result);
		console.log("data",result);
	};

	const handleInputChange = (e) => {
		if(e.target.name != "file"){
			setvendor({
				...vendor,
				[e.target.name]: e.target.value,
			});
		}
	};
	
	const updateVendor = async (e) => {
		e.preventDefault();
		await axios.patch(`http://13.126.190.50:5000/vendor/update/${id}`,
		vendor);
		navigation("/hr/procurement/vendor");
	  };

	const handleSubmit = () => {
		loadVendor()
	}



	return (
		<div>
		 <div id="header-container" className="header-container">
    <vendorLogoFile />
      <Header />
    </div>
		<div className="dashboard-container">
		  <SideBar />
		  <div className="head-foot-part" style={{ padding: "0" }}>
		  <div className="col-sm-8 py-2 px-5 offset-2 shadow">
			<h2 className="mt-5"> Edit vendor</h2>
			<form onSubmit={handleSubmit}>
				<div className="input-group mb-5">
					<label
						className="input-group-text"
						htmlFor="vendorName">
						Vendor Name
					</label>
					<input
						className="form-control col-sm-6"
						type="text"
						name="vendorName"
						id="vendorName"
						required
						value={vendorName}
						onChange={(e) => handleInputChange(e)}
					/>
				</div>

				<div className="input-group mb-5">
					<label
						className="input-group-text"
						htmlFor="address">
						Address
					</label>
					<input
						className="form-control col-sm-6"
						type="number"
						name="mobileNo"
						id="mobileNo"
						required
						value={mobileNo}	
						onChange={(e) => handleInputChange(e)}
					/>
				</div>

				<div className="input-group mb-5">
					<label
						className="input-group-text"
						htmlFor="email">
						Your Email
					</label>
					<input
						className="form-control col-sm-6"
						type="email"
						name="emailAddress"
						id="emailAddress"
						required
						value={emailAddress}
						onChange={(e) => handleInputChange(e)}
					/>
				</div>

				<div className="input-group mb-5">
					<label
						className="input-group-text"
						htmlFor="address">
						Address
					</label>
					<input
						className="form-control col-sm-6"
						type="text"
						name="address"
						id=" address"
						required
						value={address}
						onChange={(e) => handleInputChange(e)}
					/>
				</div>
				<div className="input-group mb-5">
					<label
						className="input-group-text"
						htmlFor="country">
						Country
					</label>
					<input
						className="form-control col-sm-6"
						type="text"
						name="country"
						id="country"
						required
						value={country}
						onChange={(e) => handleInputChange(e)}
					/>
				</div>
				<div className="input-group mb-5">
					<label
						className="input-group-text"
						htmlFor="city">
						City
					</label>
					<input
						className="form-control col-sm-6"
						type="text"
						name="city"
						id="city"
						required
						value={city}
						onChange={(e) => handleInputChange(e)}
					/>
				</div>
				<div className="input-group mb-5">
					<label
						className="input-group-text"
						htmlFor="zipCode">
						ZipCode
					</label>
					<input
						className="form-control col-sm-6"
						type="number"
						name="zipCode"
						id="zipCode"
						required
						value={zipCode}
						onChange={(e) => handleInputChange(e)}
					/>
				</div>
				<div className="input-group mb-5">
					<label
						className="input-group-text"
						htmlFor="previousBalance">
						Previous Balance
					</label>
					<input
						className="form-control col-sm-6"
						type="number"
						name="previousBalance"
						id="previousBalance"
						required
						value={previousBalance}
						onChange={(e) => handleInputChange(e)}
					/>
				</div>

				


				<div className="row mb-5">
					<div className="col-sm-2">
						<button
						onClick={updateVendor}
							type="submit"
							className="btn btn-outline-success btn-lg">
							Save
						</button>
					</div>

					<div className="col-sm-2">
						<Link
							to={"/hr/procurement/vendor"}
							type="submit"
							className="btn btn-outline-warning btn-lg">
							Back
						</Link>
					</div>
				</div>
			</form>
		</div>		  </div>
		</div>
	  </div>
		
	);
};

export default EditVendor;