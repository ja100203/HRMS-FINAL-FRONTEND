import React from "react";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import DataNotFound from "../../../asset/images/no data 1.png";

const BidAnalysisTable = ({ bidAnalysis, setRecDelete }) => {
  const handleDelete = (id) => {
    setRecDelete(id);
  };

  const renderbidData = () => {
    return (
      <tr>
        <td colSpan="12" className="text-center">
          <img style={{ margin: "50px 0 50px 0" }} src={DataNotFound}></img>
          <h1>No Data Found!</h1>
          <p>
            It Looks like there is no data to display in this table at the
            moment
          </p>
        </td>
      </tr>
    );
  };

  return (
    <table id="table" className="table table-bordered table-hover shadow">
      <thead>
        <tr className="text-center">
          <th>SL.</th>
          <th>bid Type</th>
          <th>Purchase Date</th>
          <th>Amount</th>
          <th>Total Amount</th>
          <th>Purchased By</th>
          <th>Description</th>
          <th colSpan="3">Actions</th>
        </tr>
      </thead>

      <tbody className="text-center">
        {bidAnalysis &&
          bidAnalysis.map((bid, index) => (
            <tr key={bid.expenceId}>
              <th scope="row" key={index}>
                {index + 1}
              </th>
              <td>{bid.expenceType}</td>
              <td>{bid.purchaseDate}</td>
              <td>{bid.amount}</td>
              <td>{bid.totalAmount}</td>
              <td>{bid.purchaseBy}</td>
              <td>{bid.description}</td>

              <td className="mx-2">
                <Link
                  to={`/bidAnalysis-profile/${bid.expenceId}`}
                  className="btn btn-info"
                >
                  <FaEye />
                </Link>
              </td>
              <td className="mx-2">
                <Link
                  to={`/edit-bidAnalysis/${bid.expenceId}`}
                  className="btn btn-warning"
                >
                  <FaEdit />
                </Link>
              </td>
              <td className="mx-2">
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(bid.expenceId)}
                >
                  <FaTrashAlt />
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default BidAnalysisTable;
