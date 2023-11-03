import React, { useState } from "react";
import Layout from "../../Layout/Layout";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../../Context/Auth";

const Login = () => {
  const Navigate = useNavigate();
  const location = useLocation();
  const [email, SetEmail] = useState();
  const [password, SetPassword] = useState();
  const [auth, setAuth] = useAuth();
  const handleSubmit = async () => {
    try {
      const { data } = await axios.post(
        "https://zany-plum-wasp.cyclic.app/api/auth/login",
        { email, password }
      );
      if (data.success) {
        toast.success(data?.msg);
        setAuth({
          ...auth,
          user: data.user,
          token: data.token,
        });
        localStorage.setItem("auth", JSON.stringify(data));
        if (data.user.role == 0) {
          Navigate(location.state || "/dashboard/superadmin");
        } else {
          Navigate(location.state || "/dashboard/admin");
        }
      } else {
        toast.error(data?.msg);
      }
    } catch (error) {
      toast.error("something went wrong");
      
    }
  };

  return (
    <Layout>
      <main className="main-content  mt-0">
        <section>
          <div className="page-header min-vh-70">
            <div className="container">
              <div className="row justify-content-center ">
                <div className="col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-lg-0 mx-auto mt-5 ">
                  <div className="card card-plain bg-light">
                    <div className="card-header pb-0 text-start bg-dark">
                      <h4 className="font-weight-bolder text-white ">
                        Sign In
                      </h4>
                      <p className="mb-0 text-white ">
                        Enter your email and password to sign in
                      </p>
                    </div>
                    <div className="card-body">
                      <form method="post">
                        <Toaster />
                        <div className="mb-3">
                          <input
                            type="email"
                            name="email"
                            className="form-control form-control-lg"
                            placeholder="Email"
                            aria-label="Email"
                            onChange={(e) => {
                              SetEmail(e.target.value);
                            }}
                            value={email}
                          />
                        </div>
                        <div className="mb-3">
                          <input
                            type="password"
                            name="password"
                            className="form-control form-control-lg"
                            placeholder="Password"
                            aria-label="Password"
                            onChange={(e) => {
                              SetPassword(e.target.value);
                            }}
                            value={password}
                          />
                        </div>
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="rememberMe"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="rememberMe"
                          >
                            Remember me
                          </label>
                        </div>
                        <div className="text-center">
                          <button
                            onClick={handleSubmit}
                            type="button"
                            className="btn btn-lg btn-dark btn-lg w-100 mt-4 mb-0"
                          >
                            Sign in
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="card-footer text-center pt-0 px-lg-2 px-1">
                      <p className="mb-4 text-sm mx-auto">
                        Don't have an account?
                        <Link
                          to={"/register"}
                          className="text-primary text-gradient font-weight-bold"
                        >
                          Sign up
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default Login;
