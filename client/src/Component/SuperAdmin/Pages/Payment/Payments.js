import React, { useEffect, useState } from "react";
import Layout from "../../../Layout/Layout";
import axios from "axios";
import SuperAdminMenu from "../../../Layout/SuperAdminMenu";
import moment from "moment";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useAuth } from "../../../Context/Auth";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EditIcon from '@mui/icons-material/Edit';

const Payments = () => {
  const [auth] = useAuth();
  const [payment, SetPayment] = useState();
  const [date,SetDate] = useState();
  
console.log(date);
const parsedDate = new Date(date);
const dd = String(parsedDate.getDate()).padStart(2, '0');
const mm = String(parsedDate.getMonth() + 1).padStart(2, '0'); // January is 0!
const yyyy = parsedDate.getFullYear();
const hh = String(parsedDate.getHours()).padStart(2, '0');
const min = String(parsedDate.getMinutes()).padStart(2, '0');

const formattedDate = `${dd}-${mm}-${yyyy} ${hh}:${min}`;
console.log(formattedDate);
  const getallpaymentdetails = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/auth/getallpaymentdetails"
      );
      
      SetPayment(data?.paymentdata);
      SetDate(data?.paymentdata?.createdAt)
      console.log(data.paymentdata);
    } catch (error) {}
  };

  useEffect(() => {
    getallpaymentdetails();
  }, [auth?.token]);
  return (
    <Layout>
      <div className="container-fluid p-1 m-0">
        <div className="row">
          <div className="col-md-3">
            <SuperAdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-white">All Payment</h1>
            <div className="container-fluid py-4">
              <div className="row">
                <div className="col-12">
                  <div className="card mb-4">
                    <div className="card-body px-0 pt-0 pb-2">
                      <div className="table-responsive p-0">
                        <table className="table align-items-center mb-0 bg-light">
                          <thead className="bg-dark">
                            <tr>
                              <th className="text-uppercase text-white text-xxs font-weight-bolder opacity-7">
                                #
                              </th>

                              <th className="text-uppercase text-white text-xxs font-weight-bolder opacity-7 ps-2">
                                Vendor-Name
                              </th>
                              <th className="text-uppercase text-white text-xxs font-weight-bolder opacity-7">
                                Address
                              </th>
                              <th className="text-uppercase text-white text-xxs font-weight-bolder opacity-7">
                                Date
                              </th>
                              <th className="text-uppercase text-white text-xxs font-weight-bolder opacity-7">
                                Status
                              </th>
                              <th className="text-uppercase text-white text-xxs font-weight-bolder opacity-7 ps-2">
                                Actions
                              </th>
                              <th className="text-white opacity-7" />
                            </tr>
                          </thead>
                          <tbody>
                            {payment?.map((p, i) => (
                              <tr key={p._id}>
                                <td>
                                  <div className="d-flex px-2 py-1">
                                    <div>{i + 1}</div>
                                  </div>
                                </td>
                                <td>
                                  <div className="d-flex px-2 py-1">
                                    <div>{p?.vendor?.name}</div>
                                  </div>
                                </td>

                                <td>
                                  <div className="d-flex px-2 py-1">
                                    <div>{p?.vendor?.address}</div>
                                  </div>
                                </td>
                                <td>
                                  <div className="d-flex px-2 py-1">
                                    <div>{moment(p?.createdAt).format("DD-MM-YYYY HH:mm")}</div>
                                  </div>
                                </td>
                                <td>
                                  <div className="d-flex px-2 py-1">
                                    <div>{p?.status?<CheckCircleIcon className="text-success"/>:""}</div>
                                  </div>
                                </td>
                              
                                <td className="align-middle">
                                  <Link
                                    to={`/dashboard/superadmin/payments/update-vpayment/${p.vendor._id}`}
                                  >
                               
                                     <EditIcon/>
                                   
                                  </Link>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* <Button
                        variant="outlined"
                        className="bg-dark text-white"
                        onClick={() => SetPage(page + 1)}
                        hidden={page === totalPage}
                      >
                        Next
                      </Button>
                      <Button
                        variant="outlined"
                        className="bg-dark text-white"
                        onClick={() => SetPage(page - 1)}
                        hidden={page === 1}
                      >
                        Prev
                      </Button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Payments;
