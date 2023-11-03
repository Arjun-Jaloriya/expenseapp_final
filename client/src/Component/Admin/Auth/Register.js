import React, { useState } from "react";
import Layout from "../../Layout/Layout";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

import toast, { Toaster } from "react-hot-toast";

const Register = () => {
  const Navigate = useNavigate();
  const [photo, SetPhoto] = useState();
  const [name, SetName] = useState();
  const [phone, SetPhone] = useState();
  const [address, SetAddress] = useState();
  const [email, SetEmail] = useState();
  const [password, SetPassword] = useState();


  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('name',name);
      formData.append('email',email);
      formData.append('password',password);
      formData.append('phone',phone);
      formData.append('address',address);
      // formData.append('photo',photo);

      const { data } = await axios.post(
        "https://zany-plum-wasp.cyclic.app/api/auth/register",formData
      );
      
      if (data && data.success) {
        toast.success(data && data.msg);
        Navigate("/login");
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <main className="main-content  mt-0">
        <section>
          <div className="page-header min-vh-70">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-lg-0 mx-auto mt-5">
                  <div className="card card-plain bg-light">
                    <div className="card-header pb-0 text-start bg-dark">
                      <h4 className="font-weight-bolder text-center text-white ">
                        Register
                      </h4>
                    </div>
                    <div className="card-body">
                      <Toaster />
                      <div className="mb-3">
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          name="name"
                          placeholder="Name"
                          onChange={(e)=>SetName(e.target.value)}
                         
                          value={name}
                        />
                       
                      </div>
                      <div className="mb-3">
                        <input
                          type="email"
                          className="form-control form-control-lg"
                          name="email"
                          placeholder="Email"
                          aria-label="Email"
                          onChange={(e)=>SetEmail(e.target.value)}
                         
                          value={email}
                        />
                      
                      </div>
                      <div className="mb-3">
                        <input
                          type="password"
                          className="form-control form-control-lg"
                          name="password"
                          placeholder="Password"
                          aria-label="Password"
                          onChange={(e)=>SetPassword(e.target.value)}
                          
                          value={password}
                        />
                     
                      </div>
                      <div className="mb-3">
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          name="phone"
                          placeholder="Phone"
                          onChange={(e)=>SetPhone(e.target.value)}
                        
                          value={phone}
                        />
                       
                      </div>
                      <div className="mb-3">
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          name="address"
                          placeholder="Address"
                          onChange={(e)=>SetAddress(e.target.value)}
                          value={address}
                        />
                      
                      </div>
                      {/* <div className="mb-3">
                        <label className="btn btn-outline-secondary col-md-6">
                          {photo ? photo.name : "Upload Photo"}
                          <input
                            type="file"
                            name="photo"
                            accept="image/*"
                            onChange={(e) => SetPhoto(e.target.files[0])}
                            hidden
                          />
                        </label>
                      </div> */}

                      <div className="text-center">
                        <button
                          type="submit"
                          className="btn btn-lg btn-dark btn-lg w-100 mt-4 mb-0"
                          onClick={handleSubmit}
                        >
                          Sign Up
                        </button>
                      </div>
                    </div>
                    <div className="card-footer text-center pt-0 px-lg-2 px-1">
                      <p className="mb-4 text-sm mx-auto">
                        All Ready Have An Account?
                        <Link
                          to={"/login"}
                          className="text-primary text-gradient font-weight-bold"
                        >
                          Sign In
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

export default Register;
