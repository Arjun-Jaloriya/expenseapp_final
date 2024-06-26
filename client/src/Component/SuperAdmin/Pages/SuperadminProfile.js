import React, { useEffect, useState } from "react";

import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import SuperAdminMenu from "../../Layout/SuperAdminMenu";
import Layout from "../../Layout/Layout";
import { useAuth } from "../../Context/Auth";

const SuperadminProfile = () => {
  const Navigate = useNavigate();
  const [auth] = useAuth()
  const [id,SetId] = useState();
  const [name, SetName] = useState();
  const [email, SetEmail] = useState();
  const [password, SetPassword] = useState();
  const [address, SetAddress] = useState();
  const [phone, SetPhone] = useState();
  const [photo,SetPhoto]= useState();

  useEffect(() => {
    const viewuser = async () => {
      const { data } = await axios.get("http://localhost:8000/api/auth/getuserbyid");
      SetId(data?.getuser._id)
      SetName(data?.getuser.name);
      SetEmail(data?.getuser.email);
     
      SetPhone(data?.getuser.phone);
      SetAddress(data?.getuser.address);
      

    };
    viewuser();
  }, [auth?.token]);

  const updateProfile = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("phone", phone);
      formData.append("address", address);
      photo && formData.append("photo", photo);
      
      const { data } = await axios.put(
        "http://localhost:8000/api/auth/updateprofile",
        formData
      );
      toast.success(data?.msg);
      Navigate("/dashboard/superadmin");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="container-fluid py-4">
        <div className="row">
          <div className="col-md-3">
            <SuperAdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card bg-light">
              <div className="card-header pb-0 bg-light">
                <div className="d-flex align-items-center">
                  <p className="mb-0">Edit Profile</p>
                  <button
                    className="btn btn-primary btn-sm ms-auto"
                    onClick={updateProfile}
                  >
                    Update
                  </button>
                </div>
                <div className="mb-3">
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
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      height={"100px"}
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`http://localhost:8000/api/auth/getphoto/${id}`}
                      height={"100px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
                </div>
                </div>
              </div>
              <div className="card-body">
                <p className="text-uppercase text-sm">User Information</p>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label
                        htmlFor="example-text-input"
                        className="form-control-label"
                      >
                        Username
                      </label>
                      <input
                        className="form-control"
                        onChange={(e) => SetName(e.target.value)}
                        type="text"
                        name="name"
                        defaultValue={name}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label
                        htmlFor="example-text-input"
                        className="form-control-label"
                      >
                        Email address
                      </label>
                      <input
                        className="form-control"
                        onChange={(e) => SetEmail(e.target.value)}
                        type="email"
                        name="email"
                        defaultValue={email}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label
                        htmlFor="example-text-input"
                        className="form-control-label"
                      >
                        Password
                      </label>
                      <input
                        className="form-control"
                        onChange={(e) => SetPassword(e.target.value)}
                        type="text"
                        name="password"
                        defaultValue={password}
                        
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label
                        htmlFor="example-text-input"
                        className="form-control-label"
                      >
                        Phone Number
                      </label>
                      <input
                        className="form-control"
                        onChange={(e) => SetPhone(e.target.value)}
                        type="text"
                        name="phone"
                        defaultValue={phone}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label
                        htmlFor="example-text-input"
                        className="form-control-label"
                      >
                        Address
                      </label>
                      <input
                        className="form-control"
                        onChange={(e) => SetAddress(e.target.value)}
                        type="text"
                        name="phone"
                        defaultValue={address}
                        required
                      />
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

export default SuperadminProfile;
