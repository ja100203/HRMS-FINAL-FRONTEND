import React, { useState } from "react";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { CSVLink } from "react-csv";
import logo from "../../../asset/images/logo.png";
import header from "../../../asset/images/Header.png";
import footer from "../../../asset/images/Footer.png";
import DataNotFound from "../../../asset/images/no data 1.png";
import { styled } from "@mui/system";
import {
  TablePagination,
  tablePaginationClasses as classes,
} from "@mui/base/TablePagination";

const RequestTable = ({ request, setRecDelete }) => {
  const [search, setSearch] = useState("");
  const CustomTablePagination = styled(TablePagination)`
    & .${classes.toolbar} {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
      padding: 0 0 0 10px;

      @media (min-width: 768px) {
        flex-direction: row;
        align-items: center;
      }
    }

    & .${classes.selectLabel} {
      margin: 0;
    }

    & .${classes.displayedRows} {
      margin: 0;

      @media (min-width: 768px) {
        margin-left: auto;
      }
    }

    & .${classes.spacer} {
      display: none;
    }

    & .${classes.actions} {
      display: flex;
      gap: 0rem;
    }
  `;

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - request.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  let doc;
  const convertToPdf = () => {
    try {
      doc = new jsPDF();
      const centerX = (doc.internal.pageSize.width - 80) / 2;
      doc.addImage(header, "PNG", 0, 0 + 0, doc.internal.pageSize.width, 10);
      doc.addImage(
        footer,
        "PNG",
        0,
        doc.internal.pageSize.height - 35,
        doc.internal.pageSize.width,
        35
      );
      const logoUrl = logo;
      doc.addImage(logoUrl, "PNG", centerX, 15, 80, 15);
      const tableMargin = 20;
      const tableStartY = 15 + tableMargin;
      doc.autoTable({
        head: [
          [
            "SL",
            "REQUESTING PERSON",
            "REQUESTING DEPARTMENT",
            "EXPECTED TIME TO HAVE THE GOOD STARTS",
            "EXPECTED TIME TO HAVE THE GOOD ENDS",
            "REASON FOR REQUESTING",
            "STATUS",
            "UNIT NAME",
            "QUANTITY"
          ],
        ],
        body: request.map((row) => [
          row.requestId,
          row.requestingPerson,
          row.requestingDepartment,
          row.expectedTimeToHaveTheGoodStarts,
          row.expectedTimeToHaveTheGoodEnds,
          row.reasonForRequesting,
          row.status,
          row.unitName,
          row.quantity
        ]),
        styles: { fontSize: 5, fontStyle: "normal" },
        headStyles: {
          fillColor: [206, 206, 206],
          textColor: [20, 25, 40],
          fontSize: 5,
          fontStyle: "bold",
          width: 20,
        },
        startY: tableStartY,
      });
      doc.save("request.pdf");
    } catch (error) {
      console.error("Error creating PDF:", error);
    }
  };
  const createPdf = () => {
    try {
      doc = new jsPDF();
      const centerX = (doc.internal.pageSize.width - 80) / 2;
      doc.addImage(header, "PNG", 0, 0 + 0, doc.internal.pageSize.width, 10);
      doc.addImage(
        footer,
        "PNG",
        0,
        doc.internal.pageSize.height - 35,
        doc.internal.pageSize.width,
        35
      );
      const logoUrl = logo;
      doc.addImage(logoUrl, "PNG", centerX, 15, 80, 15);
      const tableMargin = 20;
      const tableStartY = 15 + tableMargin;
      doc.autoTable({
        head: [
          [
            "SL",
            "REQUESTING PERSON",
            "REQUESTING DEPARTMENT",
            "EXPECTED TIME TO HAVE THE GOOD STARTS",
            "EXPECTED TIME TO HAVE THE GOOD ENDS",
            "REASON FOR REQUESTING",
            "STATUS",
            "UNIT NAME",
            "QUANTITY"
          ],
        ],
        body: request.map((row) => [
          row.requestId,
          row.requestingPerson,
          row.requestingDepartment,
          row.expectedTimeToHaveTheGoodStarts,
          row.expectedTimeToHaveTheGoodEnds,
          row.reasonForRequesting,
          row.status,
          row.unitName,
          row.quantity
        ]),
        styles: { fontSize: 5, fontStyle: "normal" },
        headStyles: {
          fillColor: [206, 206, 206],
          textColor: [20, 25, 40],
          fontSize: 5,
          fontStyle: "bold",
          width: 20,
        },
        startY: tableStartY,
      });
    } catch (error) {
      console.error("Error creating PDF:", error);
    }
  };

  const convertToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(request);

    ws["!cols"] = [
      { width: 20 },
      { width: 25 },
      { width: 25 },
      { width: 25 },
      { width: 25 },
      { width: 25 },
      { width: 25 },
      { width: 25 },
      { width: 25 },
      { width: 25 },
      { width: 25 },
      { width: 25 },
      { width: 25 },
      { width: 25 },
      { width: 25 },
      { width: 25 },
      { width: 25 },
      { width: 25 },
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "request.xlsx");
  };

  const handleDelete = (id) => {
    setRecDelete(id);
  };

  const handlePrint = () => {
    createPdf();
    const pdfContent = doc.output("bloburl");

    if (pdfContent) {
      const printWindow = window.open("", "_blank");
      printWindow.document.write(`
          <html>
            <head>
              <title>Print Document</title>
              <style>
              @media print {
                body {
                  margin: 0;
                }
                #pdfFrame {
                  width: 100%;
                  height: 100%;
                }
                @page {
                  size: landscape;
                }
              }
            </style>
            </head>
            <body>
              <iframe id="pdfFrame" src="${pdfContent}" width="100%" height="100%"></iframe>
              <script>
                document.getElementById('pdfFrame').onload = function() {
                  setTimeout(function() {
                    window.print();
                    window.onafterprint = function() {
                      window.close();
                    };
                  }, 1000);
                };
              </script>
            </body>
          </html>
        `);
    }
  };

  const renderRequestData = () => {
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
    <div>
      <div
        className="d-flex"
        style={{ position: "absolute", right: "-160px", top: "100px" }}
      >
        <button
          className=""
          style={{
            width: "5%",
            height: "35px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: "5px",
          }}
          onClick={handlePrint}
        >
          PRINT
        </button>
        <button
          onClick={convertToPdf}
          className=""
          style={{
            width: "5%",
            height: "35px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: "5px",
          }}
        >
          PDF
        </button>
        <button
          onClick={convertToExcel}
          className=""
          style={{
            width: "5%",
            height: "35px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: "5px",
          }}
        >
          EXCEL
        </button>
        <CSVLink
          data={request}
          filename="request.csv"
          style={{ textDecoration: "none" }}
        >
          <button
            className=""
            style={{
              width: "5%",
              height: "35px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "5px",
            }}
          >
            CSV
          </button>
        </CSVLink>
      </div>
      <input
        type="text"
        className="mb-3 searchFilter"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <table id="table" className="table table-bordered table-hover shadow">
        <thead>
          <tr className="text-center">
            <th>SL.</th>
            <th>Requesting Person</th>
            <th>Requesting Department</th>
            <th>Goods Start Time</th>
            <th>Goods Ends Time</th>
            <th>Unit Name</th>
            <th>Quantity</th>
            
            <th colSpan={3}>Action</th>
          </tr>
        </thead>

        <tbody className="text-center">
          {
            request && request?.length === 0
            ? renderRequestData()
            : (rowsPerPage > 0
                ? request?.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : request
              )
                ?.filter((elem) => {
                  if (search?.length === 0) return elem;
                  else
                    return (
                      elem.requestingPerson
                        .toLowerCase()
                        .includes(search.toLocaleLowerCase()) ||
                      elem.requestingDepartment
                        .toLowerCase()
                        .includes(search.toLocaleLowerCase()) ||
                      elem.expectedTimeToHaveTheGoodStarts
                        .toLowerCase()
                        .includes(search.toLocaleLowerCase()) ||
                      elem.expectedTimeToHaveTheGoodEnds
                        .toString()
                        .toLowerCase()
                        .includes(search.toLocaleLowerCase()) ||
                      elem.reasonForRequesting
                        .toLowerCase()
                        .includes(search.toLocaleLowerCase()) ||
                      elem.unitName
                        .toLowerCase()
                        .includes(search.toLocaleLowerCase()) ||
                        elem.quantity
                        .toLowerCase()
                        .includes(search.toLocaleLowerCase())
                    );
                })
                .map((req, index) => (
                  <React.Fragment key={index}>
                  {req.descriptionOfMaterialEntities.map((item,innerIndex) => (

                    <tr key={innerIndex}>
                      <th scope="row" key={index}>
                        {index + 1}
                      </th>
                      <td>{req.requestingPerson}</td>
                      <td>{req.requestingDepartment}</td>
                      <td>{req.expectedTimeToHaveTheGoodStarts}</td>
                      <td>{req.expectedTimeToHaveTheGoodEnds}</td>
                      <td>{item.unitName}</td>
                      <td>{item.quantity}</td>
                      <td className="mx-2">
                        <Link
                          to={`/expenses-profile/${request.requestId}`}
                          className="btn btn-info"
                        >
                          <FaEye />
                        </Link>
                      </td>
                      <td className="mx-2">
                        <Link
                          to={`/edit-Expenses/${request.requestId}`}
                          className="btn btn-warning"
                        >
                          <FaEdit />
                        </Link>
                      </td>
                      <td className="mx-2">
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(request.requestId)}
                        >
                          <FaTrashAlt />
                        </button>
                      </td>
                    </tr>
                  
                  ))
            }
                  </React.Fragment>
                   ))}
        </tbody>
        <tfoot>
          <tr>
            <CustomTablePagination
              className="pagingg"
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={12}
              count={request.length}
              rowsPerPage={rowsPerPage}
              page={page}
              slotProps={{
                select: {
                  "aria-label": "rows per page",
                },
                actions: {
                  // showFirstButton: true,
                  // showLastButton: true,
                },
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default RequestTable;
