import React, { useEffect, useState, useRef } from "react";
import Layout from "../../../Layout/Layout";
import AdminMenu from "../../../Layout/AdminMenu";
import axios from "axios";
import DatePicker from "react-datepicker";
import moment from "moment";
import Button from "@mui/material/Button";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import DownloadingTwoToneIcon from "@mui/icons-material/DownloadingTwoTone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Link } from "react-router-dom";
import { useAuth } from "../../../Context/Auth";
import toast from "react-hot-toast";
import 'jspdf-autotable';

const Monthwise = () => {
  const [reportData, SetReportData] = useState();
  const [startDate, SetStartDate] = useState();
  const [endDate, SetEndDate] = useState();
  const [total, SetTotal] = useState();
  const [pdfData, setPdfData] = useState("");
  const contentRef = useRef(null);
  const [auth] = useAuth();



      const generatePDF = async () => {
     
        const pdf = new jsPDF('p', 'mm', 'a4');

        const margin = 10; // Top and bottom margin in millimeters
        const pageHeight = pdf.internal.pageSize.height - 2 * margin;
        const imgWidth = pdf.internal.pageSize.width - 2 * margin;
        const imgHeight = (contentRef.current.clientHeight * imgWidth) / contentRef.current.clientWidth;
        let position = margin;
    
        html2canvas(contentRef.current).then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
    
          pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
    
          position -= pageHeight;
    
          while (position >= -contentRef.current.clientHeight) {
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
            position -= pageHeight;
          }
    
          pdf.save('multi-page.pdf');
        });
    
      }

      // const generatePDF = async () => {
      //   const pdf = new jsPDF('p', 'mm', 'a4');
      
      //   const margin = 10; // Top and bottom margin in millimeters
      //   const pageHeight = pdf.internal.pageSize.height - 2 * margin;
      //   const imgWidth = pdf.internal.pageSize.width - 2 * margin;
      //   let position = margin;
      
      //   const contentRefElement = contentRef.current;
      
      //   const totalPages = Math.ceil(contentRefElement.clientHeight / pageHeight);
      
      //   const canvasPromises = [];
      
      //   for (let page = 1; page <= totalPages; page++) {
      //     const canvasPromise = html2canvas(contentRefElement, {
      //       scrollY: -position,
      //       windowHeight: pageHeight,
      //     });
      
      //     canvasPromises.push(canvasPromise);
      
      //     position += pageHeight;
      //   }
      
      //   Promise.all(canvasPromises)
      //     .then((canvases) => {
      //       canvases.forEach((canvas, pageIndex) => {
      //         if (pageIndex > 0) {
      //           pdf.addPage();
      //         }
      
      //         const imgData = canvas.toDataURL('image/png', 1.0);
      
      //         pdf.addImage(imgData, 'PNG', margin, margin, imgWidth, 0);
      //       });
      
      //       pdf.save('new-page.pdf');
      //     })
      //     .catch((error) => {
      //       console.error('Error generating PDF:', error);
      //     });
      // };
      
      // const generatePDF = async () => {
      //   const pdf = new jsPDF('p', 'mm', 'a4');
      
      //   const margin = 10; // Top and bottom margin in millimeters
      //   const pageHeight = pdf.internal.pageSize.height - 2 * margin;
      //   const imgWidth = pdf.internal.pageSize.width - 2 * margin;
      //   let position = margin;
      
      //   const contentRefElement = contentRef.current;
      
      //   const totalPages = Math.ceil(contentRefElement.clientHeight / pageHeight);
      
      //   const canvasPromises = [];
      
      //   for (let page = 1; page <= totalPages; page++) {
      //     const canvasPromise = html2canvas(contentRefElement, {
      //       scrollY: -position,
      //       windowHeight: pageHeight,
      //     });
      
      //     canvasPromises.push(canvasPromise);
      
      //     position += pageHeight;
      //   }
      
      //   Promise.all(canvasPromises)
      //     .then((canvases) => {
      //       canvases.forEach((canvas, pageIndex) => {
      //         if (pageIndex > 0) {
      //           pdf.addPage();
      //         }
      
      //         const imgData = canvas.toDataURL('image/png', 1.0);
      
      //         pdf.addImage(imgData, 'PNG', margin, margin, imgWidth, 0);
      //       });
      
      //       pdf.save('multi-page.pdf');
      //     })
      //     .catch((error) => {
      //       console.error('Error generating PDF:', error); 
      //     });
      // };

  

       
      

   const shareOnWhatsApp = () => {
    // Ensure you have the pdfData available
    if (pdfData) {
      // Open WhatsApp with the PDF URL pre-filled
      window.open(
        `https://api.whatsapp.com/send?text=${encodeURIComponent(pdfData)}`
      );
    }
  };

  const getmonthtotal = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/Product/month-total",
        { startDate, endDate }
      );
      SetTotal(data?.curmonthtotal);
    } catch (error) {
      console.log(error);
    }
  };
  const monthreport = async () => {
    try {
      const { data } = await axios.post(
        `http://localhost:8000/api/report/month-report/${auth?.user?.vendor_id}`,
        { startDate, endDate }
      );
      getmonthtotal();
      SetReportData(data?.monthdata);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="conatiner">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-white">Monthwise Report</h1>
            <form method="POST">
              <div className="row">
                <div className="col-md-3">
                  <div className="form-group">
                    <label className="m-2 text-white ">StartDate</label>

                    <DatePicker
                      className="form-control"
                      format="DD-MM-YYYY"
                      name="date"
                      peekNextMonth
                      showMonthDropdown
                      showYearDropdown 
                      selected={new Date()}
                      value={startDate}
                      onChange={(value) =>
                        SetStartDate(moment(value).format("DD-MM-YYYY"))
                      }
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group">
                    <label className="m-2 text-white ">EndDate</label>
                    <DatePicker
                      className="form-control"
                      format="DD-MM-YYYY"
                      name="date"
                      peekNextMonth
                      showMonthDropdown
                      showYearDropdown
                      selected={new Date()}
                      value={endDate}
                      onChange={(value) =>
                        SetEndDate(moment(value).format("DD-MM-YYYY"))
                      }
                    />
                  </div>
                </div>
                <div className="col-md-6 justify-content-center d-flex">
                  <div className="text-center">
                    <Button
                      onClick={generatePDF}
                      variant="outlined text-white bg-dark m-2"
                    >
                      <DownloadingTwoToneIcon />
                    </Button>
                    <Button
                      onClick={shareOnWhatsApp}
                      variant="outlined text-white bg-dark"
                    >
                      <WhatsAppIcon />
                    </Button>
                  </div>
                </div>
              </div>
            </form>

            <div className="card-body px-0 pt-0 pb-2">
              <div  ref={contentRef} className="table-responsive p-0">
                <table
                 id="table"
                  className="table align-items-center mb-0 bg-light"
                >
                  <thead className="bg-dark">
                    <tr>
                      <th className="text-uppercase text-white text-xxs font-weight-bolder opacity-7">
                        #
                      </th>
                      <th className="text-uppercase text-white text-xxs font-weight-bolder opacity-7">
                        Date
                      </th>
                      <th className="text-uppercase text-white text-xxs font-weight-bolder opacity-7 ps-2">
                        Product-Name
                      </th>
                      <th className="text-uppercase text-white text-xxs font-weight-bolder opacity-7">
                        quantity
                      </th>
                      <th className="text-uppercase text-white text-xxs font-weight-bolder opacity-7">
                        Price
                      </th>
                      <th className="text-uppercase text-white text-xxs font-weight-bolder opacity-7">
                        Total
                      </th>

                      <th className="text-white opacity-7" />
                    </tr>
                  </thead>
                  <tbody>
                    {reportData?.map((r, i) => (
                      <tr key={r._id}>
                        <td>
                          <div className="d-flex px-2 py-1">
                            <div>{i + 1}</div>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex px-2 py-1">
                            <div>{r.date}</div>
                          </div>
                        </td>

                        <td>
                          <div className="d-flex flex-column justify-content-center">
                            <h6 className="mb-0 text-sm">{r.name}</h6>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex px-2 py-1">
                            <div>{r.quantity}</div>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex px-2 py-1">
                            <div>{r.price}</div>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex px-2 py-1">
                            <div>{r.total}</div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  
                </table>
                <div className="text-dark">
                    <h4 className="">All Total:{total}</h4>
                  </div>
                  </div>
                <div className="text-center m-2">
                  <Button
                    onClick={monthreport}
                    variant="outlined bg-dark text-white"
                  >
                    Submit
                  </Button>
                </div>
                <Link to={"/dashboard/admin/report"}>
                  <Button
                    variant="outlined"
                    className="float-start mt-0 bg-dark text-white m-2 p-2"
                  >
                    Back
                  </Button>
                </Link>
             
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Monthwise;
