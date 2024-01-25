import React, {
	useEffect,
	useState,
} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const EmployeeExitPofile = () => {
	const { id } = useParams();

	const [employeeExit, setemployeeExit] = useState({
		employeeExitName: "",
		employeeExitType: "",
		email: "",
		webiste: "",
	});

	useEffect(() => {
		loademployeeExit();
	}, []);

	const loademployeeExit = async () => {
		const result = await axios.get(
			`http://13.126.190.50:5000/employeeExit/get/${id}`
		);
		setemployeeExit(result.data);
	};

	return (
		<section
			className="shadow"
			style={{ backgroundColor: "whitesmoke" }}>
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
								<h5 className="my-3">
									{`${employeeExit.employeeExitName} ${employeeExit.employeeExitType}`}
								</h5>
								<div className="d-flex justify-content-center mb-2">
									<button
										type="button"
										className="btn btn-outline-primary">
										Call
									</button>
									<button
										type="button"
										className="btn btn-outline-warning ms-1">
										Message
									</button>
								</div>
							</div>
						</div>
					</div>

					<div className="col-lg-9">
						<div className="card mb-4">
							<div className="card-body">
								<hr />

								<div className="row">
									<div className="col-sm-3">
										<h5 className="mb-0">
											employeeExit Name
										</h5>
									</div>

									<div className="col-sm-9">
										<p className="text-muted mb-0">
											{employeeExit.employeeExitName}
										</p>
									</div>
								</div>

								<hr />

								<div className="row">
									<div className="col-sm-3">
										<h5 className="mb-0">
											employeeExit Type
										</h5>
									</div>

									<div className="col-sm-9">
										<p className="text-muted mb-0">
											{employeeExit.employeeExitType}
										</p>
									</div>
								</div>
								<hr />

								<div className="row">
									<div className="col-sm-3">
										<h5 className="mb-0">
											Email
										</h5>
									</div>

									<div className="col-sm-9">
										<p className="text-muted mb-0">
											{employeeExit.email}
										</p>
									</div>
								</div>
								<hr />

								<div className="row">
									<div className="col-sm-3">
										<h5 className="mb-0">
											Website
										</h5>
									</div>

									<div className="col-sm-9">
										<p className="text-muted mb-0">
											{employeeExit.website}
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default EmployeeExitPofile;
