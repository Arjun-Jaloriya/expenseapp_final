import React, { useEffect, useState,useRef} from "react";
import Layout from '../../../Layout/Layout'
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

const UserReport = () => {
    const [reportData, SetReportData] = useState();
    const [startDate, SetStartDate] = useState();
    const [endDate, SetEndDate] = useState();
    const [total, SetTotal] = useState();
    const [pdfData, setPdfData] = useState("");
    const contentRef = useRef(null);
    const [auth] = useAuth();
    const [user, SetUser] = useState();
    const [users, SetUsers] = useState();
  
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
  
      const monthreport = async () => {
        try {
          const { data } = await axios.post(
            `http://localhost:8000/api/report/month-reportuser`,
            { startDate, endDate ,user}
          );
          SetTotal(data?.monthtotal)
        
          SetReportData(data?.monthdata);
        } catch (error) {
          console.log(error);
        }
      };
    
      const getallvuservendorwise = async () => {
        try {
          const { data } = await axios.get(
            `http://localhost:8000/api/auth/view-allvuservendorwise`
          );
        
          SetUsers(data?.vuserdata1);
        } catch (error) {
          console.log(error);
        }
      };
      useEffect(() => {
        getallvuservendorwise();
      }, []);
    

  return (
    <Layout>
          <div className="conatiner">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-white">User Report</h1>
            <form method="POST">
              <div className="row">
              <div className="col-md-3">
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Customer</label>
                  <select
                    name="user"
                    onChange={(e) => SetUser(e.target.value)}
                    className="form-control"
                  >
                    <option disabled selected value="">
                      Select Customer
                    </option>
                    {users?.map((u) => (
                      <option value={u._id} key={u._id}>
                        {u.name}
                      </option>
                    ))}
                  </select>
                </div>
                </div>
                <div className="col-md-2">
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
                <div className="col-md-2">
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
                <div className="col-md-3 justify-content-center d-flex">
                <div className="text-center">
                  
                  <Button onClick={generatePDF} variant="outlined text-white bg-dark m-2">
                    <DownloadingTwoToneIcon />
                  </Button>
                  <Button onClick={shareOnWhatsApp} variant="outlined text-white bg-dark">
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
                <div>
                <div className="row m-4 2 2 2  text-dark">
                      <h4 className="">All Total:{total}</h4>
                    </div>
                </div>
                <div className="text-center m-2">
                  <Button onClick={monthreport} variant="outlined bg-dark text-white">
                    Submit
                  </Button>
                </div>
                <Link to={"/dashboard/admin/report"}><Button
                    variant="outlined"
                    className="float-start mt-0 bg-dark text-white m-2 p-2"
                  >
                    Back
                  </Button></Link>
                  <div className="text-center m-2">
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default UserReport
