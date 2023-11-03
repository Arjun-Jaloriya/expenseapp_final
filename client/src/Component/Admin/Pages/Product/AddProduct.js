import Layout from "../../../Layout/Layout";
import React, { useState, useEffect } from "react";
import AdminMenu from "../../../Layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import Moment from "react-moment";
import "moment-timezone";
import moment from "moment";
import { useAuth } from "../../../Context/Auth";

const AddProduct = () => {

  const Navigate = useNavigate();
  const [auth] = useAuth();
  const [user, SetUser] = useState();
  var [date, SetDate] = useState();
  const [category, SetCategory] = useState();
  const [categories, SetCategories] = useState();
  const [name, SetName] = useState();
  const [description, SetDescription] = useState();
  const [price, SetPrice] = useState();
  const [quantity, SetQuantity] = useState();
  var [total, SetTotal] = useState();
  const [users, SetUsers] = useState();
const id = auth?.user?.vendor_id;
  const alltotal = () => {
    var t = quantity * price;
    SetTotal(t);
    return t;
  };

  useEffect(() => {
    // currdate();
    if (price && quantity) alltotal();
  }, [price, quantity]);

  const getallvuservendorwise = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/auth/view-allvuservendorwise`
      );
    
      SetUsers(data?.vuserdata1);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getallvuservendorwise();
  }, []);

  const getallcategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/category/view-allcategoryforadmin"
      );

      SetCategories(data?.categorydata);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getallcategory();
    // eslint-disable-next-line
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `http://localhost:8000/api/product/add-product/${id}`,
        { name, description, price, user, category, quantity, date, total }
      );

      toast.success(data?.msg);
      Navigate("/dashboard/admin/product");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
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
  
            <h1 className="text-dark">Add Products</h1>
            {/* <div className="col-md-6"> */}
              <form method="POST" onSubmit={handleSubmit}>
                <div className="card-body">
                  <div className="row">
                  <div className="col-md-12">
                <div className="form-group">
                  <label className="text-dark" htmlFor="date">
                    Date
                  </label>

                  <DatePicker
                    className="form-control"
                    format="DD-MM-YYYY"
                    value={date}
                    placeholder="Select Date"
                    // selected={new Date()}
                    onChange={(value) =>
                      SetDate(moment(value).format("DD-MM-YYYY"))
                    }
                  />
                </div>
                </div>
                <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Category</label>
                  <select
                    name="category"
                    onChange={(e) => SetCategory(e.target.value)}
                    className="form-control"
                    defaultValue={category}
                  >
                    <option disabled selected value="">
                      Select Category
                    </option>
                    {categories?.map((c) => (
                      <option value={c._id} key={c._id}>
                        {c.category}
                      </option>
                    ))}
                  </select>
                </div>
                </div>
                <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">User</label>
                  <select
                    name="user"
                    onChange={(e) => SetUser(e.target.value)}
                    className="form-control"
                    defaultValue={user}
                  >
                    <option disabled selected value="">
                      Select Customer
                    </option>
                    {users?.map((u) => (
                      <option value={u._id} key={u._id}>
                        {u.name}
                      </option>
                    ))}
                  </select>
                </div>
                </div>
                <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Product-Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Enter Product name"
                    onChange={(e) => SetName(e.target.value)}
                    value={name || ""}
                  />
                </div>
                </div>
                <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Description</label>
                  <input
                    type="text"
                    name="description"
                    className="form-control"
                    placeholder="Enter description"
                    onChange={(e) => SetDescription(e.target.value)}
                    value={description || ""}
                  />
                </div>
                </div>
                <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Quantity</label>
                  <input
                    type="text"
                    name="quantity"
                    className="form-control"
                    placeholder="Enter quantity"
                    onChange={(e) => SetQuantity(e.target.value)}
                    value={quantity || ""}
                  />
                </div>
                </div>
                <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Price</label>
                  <input
                    type="text"
                    name="price"
                    className="form-control"
                    placeholder="Enter Price"
                    onChange={(e) => SetPrice(e.target.value)}
                    value={price || ""}
                  />
                </div>
                </div>
                <div className="col-md-4">

                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Total</label>
                  <input
                    disabled
                    type="text"
                    name="total"
                    className="form-control"
                    onChange={() => SetTotal({ ...total })}
                    value={total || ""}
                  />
                </div>
                </div>
                  </div>
                </div>
            

                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="btn btn-primary"
                >
                  Submit
                </button>
              </form>
            
          </div>
          </div>
        </div>
      </div>
      
    </Layout>
  );
};

export default AddProduct;
