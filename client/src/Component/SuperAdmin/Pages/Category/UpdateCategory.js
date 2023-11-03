import Layout from "../../../Layout/Layout";
import React, { useEffect, useState } from "react";
import AdminMenu from "../../../Layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import SuperAdminMenu from "../../../Layout/SuperAdminMenu";


const UpdateCategory = () => {

const [id,SetId] = useState();
const [category,Setcategory] = useState();
useEffect(()=>{
SetId(localStorage.getItem('id'));
Setcategory(localStorage.getItem('category'));
},[])

const Navigate = useNavigate();

   const handleSubmit = async(e)=>{
    e.preventDefault()
    try {
        const {data} = await axios.post(`http://localhost:8000/api/category/update-category/${id}`,{category});
        console.log(data);
        toast.success(data?.msg);
        Navigate('/dashboard/admin/category') 
    } catch (error) {
        console.log(error);
    }
    
   }

  return (
    <Layout>
    <div className="container-fluid m-3 p-3">
      <div className="row">
        <div className="col-md-3">
        <SuperAdminMenu />
        </div>
        <div className="col-md-9">
          <h1>Edit Category</h1>

          <div className="col-md-6">
            <form method="POST" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Category</label>
                <input
                  type="text"
                  name="category"
                  
                  className="form-control"
                  placeholder="Enter New Category"
                  onChange={(e)=>Setcategory(e.target.value)}
                  value={category || ""}
                  
                />
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
  )
}

export default UpdateCategory
