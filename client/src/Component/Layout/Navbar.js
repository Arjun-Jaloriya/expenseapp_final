import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/Auth";
import toast from "react-hot-toast";
const Navbar = () => {
  const [auth, setAuth] = useAuth();
const Navigate = useNavigate();
  const HandleLogout =()=>{
    setAuth({
      ...auth,
      user:null,
      token:""
    })
    localStorage.removeItem("auth");
    toast.success("logout successfully")
   
  }
  return (
    <>
    <div class="min-height-300 bg-primary position-absolute w-100"></div>
      <nav 
        className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl text-white"
        id="navbarBlur"
        data-scroll="false"
      >
        <div className="container-fluid py-1 px-3">
          <NavLink to="/" className="navbar-brand opacity-10 text-white">
            Expense App
          </NavLink>
          <nav aria-label="breadcrumb">
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink to="/" className="nav-link opacity-10 text-white">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/about" className="nav-link opacity-10 text-white">
                    About us
                  </NavLink>
                </li>
                {(auth?.user)?(<>
                
                <li className="nav-item">
                  <NavLink
                    to={`/dashboard/${
                      auth?.user?.role === 0 ? "superadmin" : "admin"
                    }`}
                    className="nav-link opacity-10 text-white"
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={"/login"} onClick={HandleLogout} className="nav-link opacity-10 text-white">
                    Logout
                  </NavLink>
                </li>
                </>
                ):(
                  <>
                <li className="nav-item">
                  <NavLink to="/register" className="nav-link opacity-10 text-white">
                    Register
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link opacity-10 text-white">
                    Login
                  </NavLink>
                </li>
                </>
                )}
              </ul>
            </div>
          </nav>
        </div>
      </nav>
      </>
  );
};

export default Navbar;
