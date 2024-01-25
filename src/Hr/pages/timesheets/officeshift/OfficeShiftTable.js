import React from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";

const OfficeShiftTable = ({ officeShift, setRecDelete }) => {
  const handleDelete = (id) => {
    setRecDelete(id);
  };

  console.log(officeShift);

  return (
    <div>
      <table id="table" className="table table-bordered table-hover shadow">
        <thead>
          <tr className="text-center">
            <th>SL</th>
            <th>Created Date</th>
            <th>officeClock In</th>
            <th>officeClock Out</th>

            <th colSpan="2">Actions</th>
          </tr>
        </thead>

        <tbody className="text-center">
          {officeShift &&
            officeShift.map((shift, index) => (
              <tr key={index}>
                <th scope="row" key={index}>
                  {index + 1}
                </th>
                <td>{shift.createdDate}</td>
                <td>{shift.officeClockInTime}</td>
                <td>{shift.officeClockOutTime} </td>

                <td className="mx-2">
                  <Link
                    to={`/edit-officeShift/${shift.officeShiftsId}`}
                    className="btn btn-warning"
                  >
                    <FaEdit />
                  </Link>
                </td>
                <td className="mx-2">
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(shift.officeShiftsId)}
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default OfficeShiftTable;
