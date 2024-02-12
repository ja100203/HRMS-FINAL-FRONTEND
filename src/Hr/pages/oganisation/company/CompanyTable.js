import React, {useState} from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import '../../../../Employee/styles.css'
import { CSVLink } from "react-csv";
import logo from "../../../asset/images/logo.png";
import header from "../../../asset/images/Header.png";
import footer from "../../../asset/images/Footer.png";
import DataNotFound from "../../../asset/images/no data 1.png";
import { styled } from '@mui/system';
import {
  TablePagination,
  tablePaginationClasses as classes,
} from '@mui/base/TablePagination';
import '../../../../Employee/styles.css'


const CompanyTable = ({ company, setRecDelete }) => {
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
          "COMPANY NAME",
          "COMPANY TYPE",
          "EMAIL",
          "CONTACT NUMBER",
          "CIN",
          "GST",
          "UAN"
          
        ],
      ],
      body: company.map((row) => [
        row.companyId,
        row.companyType,
        row.contactNumber,
        row.cin,
        row.gst,
        row.uan
        
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
    doc.save("company.pdf");
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
          "COMPANY NAME",
          "COMPANY TYPE",
          "EMAIL",
          "CONTACT NUMBER",
          "CIN",
          "GST",
          "UAN"
          
        ],
      ],
      body: company.map((row) => [
        row.companyId,
        row.companyType,
        row.contactNumber,
        row.cin,
        row.gst,
        row.uan
        
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
  const ws = XLSX.utils.json_to_sheet(company);

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
  XLSX.writeFile(wb, "company.xlsx");
};

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - company.length) : 0;

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

  const renderCompanyData = () => {
    return (
      <tr>
        <td colSpan="12" className="text-center">
          <img style={{margin:"50px 0 50px 0"}} src={DataNotFound}></img>
          <h1>No Data Found!</h1>
          <p>It Looks like there is no data to display in this table at the moment</p>
        </td>
      </tr>
    );
  };


  const handleDelete = (id) => {
    setRecDelete(id);
    console.log(id);
  };
   
  console.log(company);

  return (

    <div  className="d-flex" style={{display:"flex",flexDirection:"column"}}>
<div className="d-flex" style={{position:'absolute', right:'-160px', top:'180px'}}>
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
          data={company}
          filename="company.csv"
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

      <input type="text" className="mb-3 searchFilter" placeholder="Search" value={search} onChange={(e)=>setSearch(e.target.value)} 
      style={{width:"20rem",borderRadius:"10px",height:"40px",padding:"10px",border:"1px solid rgba(247, 108, 36, 1)",right: "500px",top:"180px",position:"absolute"}}
      />

       <div className="table-start-container">
      <table id="table" className="table table-bordered table-hover shadow">
        <thead>
          <tr className="text-center">
            <th class="border-bottom">SL No</th>
            <th class="border-bottom">Company Name</th>
            <th>Company Type</th>
            <th>Email</th>
            <th>Contact Number</th>
            <th>CIN</th>
            <th>GST</th>
            <th>UAN</th>
            <th colSpan="3">Actions</th>
          </tr>
        </thead>

        <tbody className="text-center">
          {company.length === 0 ? renderCompanyData() :(rowsPerPage > 0
            ? company.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : company
          ).filter((elem)=>{
            if(search.length===0)
              return elem;
            else  
              return elem.companyName.toLowerCase().includes(search.toLocaleLowerCase()) ||
              elem.companyType.toLowerCase().includes(search.toLocaleLowerCase()) ||
              elem.email.toLowerCase().includes(search.toLocaleLowerCase()) ||
              elem.contactNumber.toLowerCase().includes(search.toLocaleLowerCase()) ||
              elem.cin.toLowerCase().includes(search.toLocaleLowerCase()) ||
              elem.gst.toLowerCase().includes(search.toLocaleLowerCase()) ||
              elem.uan.toLowerCase().includes(search.toLocaleLowerCase())
            }).map((company, index) => (
            <tr key={company.id}>
              <th scope="row" key={index}>
                {index + 1}
              </th>
              <td>{company.companyName}</td>
              <td>{company.companyType}</td>
              <td>{company.email}</td>
              <td>{company.contactNumber}</td>
              <td>{company.cin}</td>
              <td>{company.gst}</td>
              <td>{company.uan}</td>
              <td className="mx-2">
                <Link
                  to={`/organisation/company-profile/${company.companyId}`}
                  className="btn btn-info"
                >
                  <FaEye />
                </Link>
              </td>
              <td className="mx-2">
                <Link
                  to={`/organisation/edit-company/${company.companyId}`}
                >
                  <FaEdit className='action-edit'/>
                </Link>
              </td>
              <td className="mx-2">
                  <FaTrashAlt className='action-delete' onClick={() => handleDelete(company.companyId)}
                  />
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
              count={company.length}
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

export default CompanyTable;
