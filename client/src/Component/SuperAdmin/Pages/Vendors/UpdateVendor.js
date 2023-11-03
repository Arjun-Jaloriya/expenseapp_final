import React, { useEffect, useState } from "react";
import Layout from "../../../Layout/Layout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import SuperAdminMenu from "../../../Layout/SuperAdminMenu";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import moment from "moment";

const UpdateVendor = () => {
  const Navigate = useNavigate();
  const [photo, SetPhoto] = useState();
  const [name, SetName] = useState();
  const [phone, SetPhone] = useState();
  const [address, SetAddress] = useState();
  const [email, SetEmail] = useState();
  const [password, SetPassword] = useState();
  const [aadharno, SetAadharno] = useState();
  const [pan, SetPan] = useState();
  const [accountno, SetAccountno] = useState();
  const [ifsc, SetIfsc] = useState();
  const [startDate, SetStartDate] = useState();
  const [endDate, SetEndDate] = useState();
  const { id } = useParams();


  const getvendor = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/auth/get-singlevendor/${id}`
      );
      SetName(data?.getvendor.name);
      SetEmail(data?.getvendor.email);
      SetPhone(data?.getvendor.phone);
      SetAddress(data?.getvendor.address);
      SetAadharno(data?.getvendor.aadharno);
      SetPan(data?.getvendor.pan);
      SetIfsc(data?.getvendor.ifsc);
      SetStartDate(data?.getvendor.startdate);
      SetEndDate(data?.getvendor.enddate);
      SetAccountno(data?.getvendor.accountno);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getvendor();
  }, []);

  const HandleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("phone", phone);
      formData.append("address", address);
      photo && formData.append("photo", photo);
      formData.append("aadharno", aadharno);
      formData.append("accountno", accountno);
      formData.append("pan", pan);
      formData.append("ifsc", ifsc);
      formData.append("startdate", startDate);
      formData.append("enddate", endDate);

      const { data } = await axios.put(
        `http://localhost:8000/api/auth/update-vendor/${id}`,
        formData
      );
        toast.success(data && data.msg);
        Navigate("/dashboard/superadmin/vendors");
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
                  <p className="mb-3">
                    <h2>Update Vendors</h2>
                  </p>
                  <button
                    className="btn btn-primary btn-sm ms-auto"
                    onClick={HandleUpdate}
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
                      src={`http://localhost:8000/api/auth/getvendorphoto/${id}`}
                      height={"100px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
                </div>
                </div>
              </div>

              <div className="card-body">
                <p className="text-uppercase text-sm">Vendor Information</p>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="m-2 text-dark ">StartDate</label>

                      <DatePicker
                        className="form-control"
                        format="DD-MM-YYYY"
                        name="startdate"
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
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="m-2 text-dark ">EndDate</label>
                      <DatePicker
                        className="form-control"
                        format="DD-MM-YYYY"
                        name="enddate"
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
                  <div className="col-md-6">
                    <div className="form-group">
                      <label
                        htmlFor="example-text-input"
                        className="form-control-label"
                      >
                        AadharNo
                      </label>
                      <input
                        className="form-control"
                        onChange={(e) => SetAadharno(e.target.value)}
                        type="number"
                        name="aadharno"
                        defaultValue={aadharno}
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
                        PAN
                      </label>
                      <input
                        className="form-control"
                        onChange={(e) => SetPan(e.target.value)}
                        type="text"
                        name="pan"
                        defaultValue={pan}
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
                        AccountNo
                      </label>
                      <input
                        className="form-control"
                        onChange={(e) => SetAccountno(e.target.value)}
                        type="number"
                        name="accountno"
                        defaultValue={accountno}
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
                        IFSC
                      </label>
                      <input
                        className="form-control"
                        onChange={(e) => SetIfsc(e.target.value)}
                        type="text"
                        name="ifsc"
                        defaultValue={ifsc}
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

export default UpdateVendor;
