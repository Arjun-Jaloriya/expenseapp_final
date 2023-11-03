import React, { useEffect, useState } from "react";
import Layout from "../../../Layout/Layout";
import AdminMenu from "../../../Layout/AdminMenu";
import Button from "@mui/material/Button";
import moment from "moment";
import { Link } from "react-router-dom";

const DayReport = () => {
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className=" text-white ">Report Dashboard</h1>

            <div className="row mt-3">
              <div className="col-md-3">
                <div className="text-center">
                  <div className="card bg-dark">
                    <div className="card-body">
                      <Link to={"/dashboard/admin/report/daywise"}>
                        <Button variant="outlined bg-dark text-white">Datewise</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="text-center">
                  <div className="card bg-dark">
                    <div className="card-body">
                      <Link to={"/dashboard/admin/report/monthwise"}>
                        <Button variant="outlined bg-dark text-white">Monthwise</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="text-center">
                  <div className="card bg-dark">
                    <div className="card-body">
                      <Link to={"/dashboard/admin/report/yearwise"}>
                        <Button variant="outlined bg-dark text-white">Yearwise</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DayReport;
