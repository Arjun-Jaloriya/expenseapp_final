import React, { useState, useRef } from "react";
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

const Yearwise = () => {
  const [reportData, SetReportData] = useState();
  const [year, SetYear] = useState();
  const [total, SetTotal] = useState();
  const [pdfData, setPdfData] = useState("");
  const contentRef = useRef(null);
  const [auth] = useAuth();
  
  const generatePDF = () => {
    html2canvas(contentRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 0, 0);
      const pdfBlob = pdf.output("blob");
      console.log(pdfBlob);
      const pdfUrl = URL.createObjectURL(pdfBlob);
      setPdfData(pdfUrl);
      pdf.save("document.pdf");
    });
  };
  const shareOnWhatsApp = () => {
    // Ensure you have the pdfData available
    if (pdfData) {
      // Open WhatsApp with the PDF URL pre-filled
      window.open(
        `https://api.whatsapp.com/send?text=${encodeURIComponent(pdfData)}`
      );
    }
  };
  const yearreport = async () => {
    try {
      const { data } = await axios.post(
        `http://localhost:8000/api/report/year-report/${auth?.user?.vendor_id}`,
        { year }
      );
      console.log(data);
      SetReportData(data?.yeardata);
      SetTotal(data?.yeartotal);
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
            <h1 className="text-white">Yearwise Report</h1>
            <form method="POST">
              <div className="row">
                <div className="col-md-4">
                  <div className="form-group">
                    <label className="m-2 text-white">Year</label>

                    <DatePicker
                      className="form-control"
                      format="YYYY"
                      name="year"
                      showYearDropdown
                      selected={new Date().getFullYear()}
                      value={year}
                      onChange={(value) =>
                        SetYear(moment(value).format("YYYY"))
                      }
                      showYearPicker
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
              <div ref={contentRef} className="table-responsive p-0">
                <table className="table align-items-center mb-0 bg-light">
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
                <div className="row m-4 2 2 2  text-dark">
                  <h4 className="">All Total:{total}</h4>
                </div>
              </div>
              <div className="text-center">
                <Button
                  onClick={yearreport}
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

export default Yearwise;
