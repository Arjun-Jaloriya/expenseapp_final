import React, { useEffect, useState, useRef } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import axios from "axios";
import Layout from "../../../Layout/Layout";
import AdminMenu from "../../../Layout/AdminMenu";
import Button from "@mui/material/Button";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import DownloadingTwoToneIcon from "@mui/icons-material/DownloadingTwoTone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Link } from "react-router-dom";
import { useAuth } from "../../../Context/Auth";

const Daywise = () => {
  var [date, SetDate] = useState();
  const [reportData, SetReportData] = useState();
  const [loader, SetLoader] = useState(false);
  const contentRef = useRef(null);
  const [total, SetTotal] = useState();
  const [pdfData, setPdfData] = useState("");
const [auth] = useAuth();

  const generatePDF = () => {
    html2canvas(contentRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 0, 0);
      const pdfBlob = pdf.output("blob");
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

  const getdaytotal = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/Product/day-total",
        { date }
      );
      SetTotal(data?.todaytotal);
    } catch (error) {
      console.log(error);
    }
  };

  const singleday = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `http://localhost:8000/api/report/single-day/${auth?.user?.vendor_id}`,
        { date }
      );
      getdaytotal();
      SetReportData(data?.result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-white">DateWise Report</h1>
            <div className="row">
              <div className="col-md-4">
                <form method="POST">
                  <div className="form-group">
                    <label className="m-2 text-white">Date</label>

                    <DatePicker
                    className="form-control"
                      format="DD-MM-YYYY"
                      name="date"
                      value={date}
                      peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                      selected={new Date()}
                      onChange={(value) =>
                        SetDate(moment(value).format("DD-MM-YYYY"))
                      }
                    />
                  </div>
                </form>
              </div>

              <div className="col-md-7 justify-content-end d-flex ">
                <div className="text-center ">
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

            <div className="card-body px-0 pt-0 pb-2">
              <div  className="table-responsive p-2">
                <table ref={contentRef}
                  className="table align-items-center mb-0 bg-light "
                  id="table"
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
                        <td className="d-flex px-2 py-1">{i + 1}</td>
                        <td>
                          <p className="d-flex px-2 py-1">{r.date}</p>
                        </td>

                        <td>
                          <p className="d-flex flex-column justify-content-center">
                            <h6 className="mb-0 text-sm">{r.name}</h6>
                          </p>
                        </td>
                        <td>
                          <p className="d-flex px-2 py-1">{r.quantity}</p>
                        </td>
                        <td>
                          <p className="d-flex px-2 py-1">{r.price}</p>
                        </td>
                        <td>
                          <p className="d-flex px-2 py-1">{r.total}</p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div>
                  <h4 className="m-2 text-dark">All Total:{total}</h4>
                </div>
                <div>
                  <div className="text-center text-white">
                    <Button onClick={singleday} variant="outlined bg-dark">
                      Submit
                    </Button>
                  </div>
                  <Link to={"/dashboard/admin/report"}><Button
                    variant="outlined"
                    className="float-start mt-0 bg-dark text-white m-2 p-2"
                  >
                    Back
                  </Button></Link>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Daywise;
