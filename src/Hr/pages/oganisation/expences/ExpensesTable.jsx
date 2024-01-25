import React, {useState} from "react";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { CSVLink } from "react-csv";
import logo from "../../../asset/images/logo.png";
import header from "../../../asset/images/Header.png";
import footer from "../../../asset/images/Footer.png";
import { styled } from '@mui/system';
import {
  TablePagination,
  tablePaginationClasses as classes,
} from '@mui/base/TablePagination';

import DataNotFound from "../../../asset/images/no data 1.png";

const ExpensesTable = ({ expenses, setRecDelete }) => {
  const [search, setSearch] = useState("");
  const handleDelete = (id) => {
    setRecDelete(id);
  };
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
          "EXPENSES TYPE",
          "EMAIL",
          "PURCHASE DATE",
          "AMOUNT",
          "TOTALAMOUNT",
          "PURCHASEBY",
          "DESCRIPTION"
          
        ],
      ],
      body: expenses.map((row) => [
        row.expencesId,
        row.expencesType,
        row.purchaseDate,
        row.amount,
        row.totalAmount,
        row.purchaseBy,
        row.description
        
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
    doc.save("expences.pdf");
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
          "EXPENSES TYPE",
          "EMAIL",
          "PURCHASE DATE",
          "AMOUNT",
          "TOTALAMOUNT",
          "PURCHASEBY",
          "DESCRIPTION"
          
        ],
      ],
      body: expenses.map((row) => [
        row.expencesId,
        row.expencesType,
        row.purchaseDate,
        row.amount,
        row.totalAmount,
        row.purchaseBy,
        row.description
        
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
  const ws = XLSX.utils.json_to_sheet(expenses);

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
  XLSX.writeFile(wb, "expences.xlsx");
};


const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handlePrint = () => {
    createPdf();
    const pdfContent = doc.output('bloburl');
  
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


  const renderExpenseData = () => {
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
    <div className="d-flex" style={{position:'absolute', right:'-160px', top:'100px'}}>
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
          data={expenses}
          filename="expences.csv"
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
      <input type="text" className="mb-3 searchFilter" placeholder="Search" value={search} onChange={(e)=>setSearch(e.target.value)}/>
      <div className="table-start-container">
      <table id="table" className="table table-bordered table-hover shadow">
      <thead>
        <tr className="text-center">
          <th>SL.</th>
          <th>Expense Type</th>
          <th>Purchase Date</th>
          <th>Amount</th>
          <th>Total Amount</th>
          <th>Purchased By</th>
          <th>Description</th>
          <th colSpan="3">Actions</th>
        </tr>
      </thead>

      <tbody className="text-center">
        {expenses.length === 0 ? renderExpenseData() :(rowsPerPage > 0
            ? expenses.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : expenses
          ).filter((elem)=>{
            if(search.length===0)
              return elem;
            else  
              return elem.expenceType.toLowerCase().includes(search.toLocaleLowerCase()) ||
              elem.purchaseDate.toLowerCase().includes(search.toLocaleLowerCase()) ||
              elem.amount.toLowerCase().includes(search.toLocaleLowerCase()) ||
              elem.totalAmount.toLowerCase().includes(search.toLocaleLowerCase()) ||
              elem.purchaseBy.toLowerCase().includes(search.toLocaleLowerCase()) ||
              elem.description.toLowerCase().includes(search.toLocaleLowerCase()) 
            }).map((expense, index) => (
            <tr key={expense.expenceId}>
              <th scope="row" key={index}>
                {index + 1}
              </th>
              <td>{expense.expenceType}</td>
              <td>{expense.purchaseDate}</td>
              <td>{expense.amount}</td>
              <td>{expenses.totalAmount}</td>
              <td>{expense.purchaseBy}</td>
              <td>{expense.description}</td>

              <td className="mx-2">
                <Link
                  to={`/expenses-profile/${expense.expenceId}`}
                  className="btn btn-info"
                >
                  <FaEye />
                </Link>
              </td>
              <td className="mx-2">
                <Link
                  to={`/edit-Expenses/${expense.expenceId}`}
                  className="btn btn-warning"
                >
                  <FaEdit />
                </Link>
              </td>
              <td className="mx-2">
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(expense.expenceId)}
                >
                  <FaTrashAlt />
                </button>
              </td>
            </tr>
          ))}
      </tbody>
      <tfoot>
          <tr>
            <CustomTablePagination
            className="pagingg"
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={12}
              count={expenses.length}
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
     
    </div>
    
  );
};

export default ExpensesTable;
