import React, { useState } from "react";
import PaymentIcon from '@mui/icons-material/Payment';
import SummarizeIcon from '@mui/icons-material/Summarize';
import { Link, NavLink } from "react-router-dom";

const AdminMenu = () => {
  const [isActive, setIsActive] = useState(false);

  const handleToggleActive = () => {
    setIsActive(!isActive);
  };
  return (
    
    
   
      <aside
        className="sidenav bg-dark navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-4 "
        id="sidenav-main"
      >
        <div className="sidenav-header text-center ">
          <i
            className="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none"
            aria-hidden="true"
            id="iconSidenav"
          />
          <Link className="navbar-brand m-0" to={"/dashboard/admin"}>
            <span className="ms-1 font-weight-bold text-white">
              DAILY HISAB
            </span>
          </Link>
        </div>
        <hr className="horizontal dark mt-0" />

        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink
              activeclassname={isActive ? "active" : ""}
              onClick={handleToggleActive}
              className="nav-link "
              to="/dashboard/admin"
            >
              <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                <i className="ni ni-tv-2 text-primary text-sm opacity-10" />
              </div>
              <span className="nav-link-text ms-1 text-white">Dashboard</span>
            </NavLink>
          </li>
         
          <li className="nav-item">
            <NavLink
              activeclassname={isActive ? "active" : ""}
              onClick={handleToggleActive}
              className="nav-link "
              to="/dashboard/admin/product"
            >
              <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                <i className="ni ni-credit-card text-success text-sm opacity-10" />
              </div>
              <span className="nav-link-text ms-1 text-white">product</span>
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              activeclassname={isActive ? "active" : ""}
              onClick={handleToggleActive}
              className="nav-link "
              to="/dashboard/admin/report"
            >
              <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                <i className="ni ni-world-2 text-danger text-sm opacity-10" />
              </div>
              <span className="nav-link-text ms-1 text-white">Report</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              activeclassname={isActive ? "active" : ""}
              onClick={handleToggleActive}
              className="nav-link "
              to="/dashboard/admin/users"
            >
              <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                <i className="ni ni-single-02 text-white text-sm opacity-10" />
              </div>
              <span className="nav-link-text ms-1 text-white">Users</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              activeclassname={isActive ? "active" : ""}
              onClick={handleToggleActive}
              className="nav-link "
              to="/dashboard/admin/userreport"
            >
              <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
              <SummarizeIcon className="text-danger"/>
              </div>
              <span className="nav-link-text ms-1 text-white">User Report</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              activeclassname={isActive ? "active" : ""}
              onClick={handleToggleActive}
              className="nav-link "
              to="/dashboard/admin/payment"
            >
              <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
              <PaymentIcon className="text-success"/>
              </div>
              <span className="nav-link-text ms-1 text-white">Payment</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              activeclassname={isActive ? "active" : ""}
              onClick={handleToggleActive}
              className="nav-link "
              to="/dashboard/admin/profile"
            >
              <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                <i className="ni ni-single-02 text-white text-sm opacity-10" />
              </div>
              <span className="nav-link-text ms-1 text-white">Profile</span>
            </NavLink>
          </li>
       
          {/* <li className="nav-item mt-3">
              <h6 className="ps-4 ms-2 text-uppercase text-xs font-weight-bolder opacity-6">
                Account pages
              </h6>
            </li>
            <li className="nav-item">
              <a className="nav-link " href="./pages/sign-in.html">
                <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                  <i className="ni ni-single-copy-04 text-warning text-sm opacity-10" />
                </div>
                <span className="nav-link-text ms-1">Sign In</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link " href="./pages/sign-up.html">
                <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                  <i className="ni ni-collection text-info text-sm opacity-10" />
                </div>
                <span className="nav-link-text ms-1">Sign Up</span>
              </a>
            </li> */}
        </ul>
      </aside>
 
  );
};

export default AdminMenu;
