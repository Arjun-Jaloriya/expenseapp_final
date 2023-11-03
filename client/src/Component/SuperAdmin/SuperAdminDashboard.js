import React, { useEffect, useState } from 'react'
import Layout from '../Layout/Layout';
import SuperAdminMenu from '../Layout/SuperAdminMenu';
import axios from 'axios';
import { useAuth } from '../Context/Auth';

const SuperAdminDashboard = () => {
const [vendordata,SetVendorData] = useState();
const [activeVendors,SetActiveVendors] = useState();
const [auth]= useAuth()
  const getallvendors = async()=>{
    try {
      const {data} = await axios.get("http://localhost:8000/api/auth/view-allvendors");
      SetVendorData(data?.count);
      SetActiveVendors(data?.active_vendor_count);


    } catch (error) {
      
    }
   
  }
  useEffect(()=>{
    getallvendors();
  },[auth?.user.role==0])
  return (
    <Layout>
      
    <div className="container-fluid m-3 p-3">
      <div className="row">
        <div className="col-md-3">
          <SuperAdminMenu />
        </div>

        <div className="col-md-9">
          <div className="row">
            <h1 className="text-center">{}</h1>
            <div className="col-xl-3 col-sm-4 mb-xl-0 mb-4">
              <div className="card bg-dark">
                <div className="card-body p-3">
                  <div className="row">
                    <div className="col-8">
                      <div className="numbers">
                        <p className="text-sm mb-0 text-uppercase font-weight-bold text-light">
                          Total Vendors
                        </p>
                        <h5 className="font-weight-bolder text-light">Count-{vendordata}</h5>
                        <p className="mb-0">
                          <span className="text-success text-sm font-weight-bolder text-light">
                           Active-{activeVendors}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="col-4 text-end ">
                      <div className="icon icon-shape bg-gradient-primary shadow-primary text-center rounded-circle">
                        <i
                          className="ni ni-money-coins text-lg opacity-10"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
              <div className="card bg-dark">
                <div className="card-body p-3">
                  <div className="row">
                    <div className="col-8">
                      <div className="numbers">
                        <p className="text-sm mb-0 text-uppercase font-weight-bold text-light">
                          Monthly Sell
                        </p>
                        <h5 className="font-weight-bolder text-light">
                          Rs-{}
                        </h5>
                        <p className="mb-0">
                          <span className="text-success text-sm font-weight-bolder text-light">
                            since {}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="col-4 text-end">
                      <div className="icon icon-shape bg-gradient-danger shadow-danger text-center rounded-circle">
                        <i
                          className="ni ni-world text-lg opacity-10"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
              <div className="card bg-dark">
                <div className="card-body p-3">
                  <div className="row">
                    <div className="col-8">
                      <div className="numbers">
                        <p className="text-sm mb-0 text-uppercase font-weight-bold text-light">
                          Yearly Sell
                        </p>
                        <h5 className="font-weight-bolder text-light">Rs-{}</h5>
                        <p className="mb-0">
                          <span className="text-success text-sm font-weight-bolder text-light">
                            since {}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="col-4 text-end">
                      <div className="icon icon-shape bg-gradient-success shadow-success text-center rounded-circle">
                        <i
                          className="ni ni-paper-diploma text-lg opacity-10"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="row">
            <div className="col-xl-3 col-sm-6 mt-4">
              <div className="card">
                <div className="card-body p-3">
                  <div className="row">
                    <div className="col-8">
                      <div className="numbers">
                        <p className="text-sm mb-0 text-uppercase font-weight-bold">
                          Sales
                        </p>
                        <h5 className="font-weight-bolder">$103,430</h5>
                        <p className="mb-0">
                          <span className="text-success text-sm font-weight-bolder">
                            +5%
                          </span>{" "}
                          than last month
                        </p>
                      </div>
                    </div>
                    <div className="col-4 text-end">
                      <div className="icon icon-shape bg-gradient-warning shadow-warning text-center rounded-circle">
                        <i
                          className="ni ni-cart text-lg opacity-10"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  </Layout>
  )
}

export default SuperAdminDashboard
