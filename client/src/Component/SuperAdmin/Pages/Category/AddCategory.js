import Layout from "../../../Layout/Layout";
import React from "react";

import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { useFormik } from "formik";
import {CategoryValidation} from "../../../Admin/ValidationSchema/CategoryValidation";
import SuperAdminMenu from "../../../Layout/SuperAdminMenu";

const AddCategory = () => {
  const Navigate = useNavigate();
  const initialValues = { category: "" };

  const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
    useFormik({
      initialValues: initialValues,
      validationSchema: CategoryValidation,
      onSubmit: async (values, action) => {
        action.resetForm();
       
        try {
          
          const { category } = values;
          const { data } = await axios.post(
            "http://localhost:8000/api/category/add-category",
            { category}
          );
          console.log(data);
          toast.success(data?.msg);
          Navigate("/dashboard/superadmin/category")
        } catch (error) {
          console.log(error);
          toast.error("Something went wrong");
        }
      },
    });

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
          <SuperAdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-white">Add Category</h1>

            <div className="col-md-6">
              <form method="POST" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1" className="text-white">Category</label>
                  <input
                    type="text"
                    name="category"
                    className="form-control"
                    placeholder="Enter New Category"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.category}
                  />
                  {errors.category && touched.category ? (
                            <p className="text-white">{errors.category}</p>
                          ) : null}
                </div>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="btn btn-dark"
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

export default AddCategory;
