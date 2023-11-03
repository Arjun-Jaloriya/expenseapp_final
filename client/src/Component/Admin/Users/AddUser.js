import React, { useState } from "react";
import Layout from '../../Layout/Layout';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AdminMenu from '../../Layout/AdminMenu';

const AddUser = () => {
  const Navigate = useNavigate();
  const [photo, SetPhoto] = useState();
  const [name, SetName] = useState();
  const [phone, SetPhone] = useState();
  const [address, SetAddress] = useState();
  const [email, SetEmail] = useState();
  const [password, SetPassword] = useState();
  

  const HandleCreate = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("phone", phone);
      formData.append("address", address);
      formData.append("photo", photo);
    

      const { data } = await axios.post(
        "http://localhost:8000/api/auth/add-vuser",
        formData
      );
      if (data && data.success) {
        toast.success(data && data.msg);
        Navigate("/dashboard/admin/users");
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="container-fluid py-4">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          
          <div className="col-md-9">
            <div className="card bg-light">
      
              <div className="card-header pb-0 bg-light">
                <div className="d-flex align-items-center">
                  <p className="mb-3">
                    <h2>Add User</h2>
                  </p>
                  <button
                    className="btn btn-primary btn-sm ms-auto"
                    onClick={HandleCreate}
                  >
                    Submit
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
                        FullName
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
                        defaultValue=""
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
                        Phone Number
                      </label>
                      <input
                        className="form-control"
                        onChange={(e) => SetPhone(e.target.value)}
                        type="number"
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
}


export default AddUser
