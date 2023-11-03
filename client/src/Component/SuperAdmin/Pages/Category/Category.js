import React, { useEffect, useState } from "react";
import Layout from "../../../Layout/Layout";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Button from '@mui/material/Button';
import SuperAdminMenu from "../../../Layout/SuperAdminMenu";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const   Category = () => {
  const [categories, SetCategories] = useState();

  const getallcategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/category/view-allcategory"
      );
     
      SetCategories(data?.categorydata);
    } catch (error) {
      console.log(error);
    }
  };
useEffect(()=>{
  getallcategory();
},[])

//delete

const HandleDelete = async(id)=>{
  try {
   
    const {data} = await axios.delete(`http://localhost:8000/api/category/delete-category/${id}`)
    toast.success(data?.msg)
   getallcategory();
  } catch (error) {
    console.log(error);
  }
}


const SetLocalStorage = (id,category)=>{
  localStorage.setItem('id',id);
  localStorage.setItem('category',category);
}
  return (
    <Layout>
      <div className="container-fluid m-0 p-1">
        <div className="row">
          <div className="col-md-3">
            <SuperAdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className=" text-white ">All Categories</h1>
          
            <div className="container-fluid py-4">
              <div className="row">
                <div className="col-12">
                  <div className="card mb-4">
                    <div className="card-header pb-0 bg-light">
                      <h6 className="">
                        Categories
                        <Link to={"/dashboard/superadmin/category/add-category"}>
                          <Button variant="outlined" className="float-end mt-0 bg-dark text-white m-2 p-2">
                            Add
                          </Button>
                        </Link>
                      </h6>
                    </div>
                    <div className="card-body px-0 pt-0 pb-2">
                      <div className="table-responsive p-0">
                        <table className="table align-items-center mb-0 bg-light">
                          <thead className="bg-dark">
                            <tr>
                              <th className="text-uppercase text-white text-xxs font-weight-bolder opacity-7">
                                #
                              </th>
                              <th className="text-uppercase text-white text-xxs font-weight-bolder opacity-7 ps-2">
                                Category-Name
                              </th>
                              <th className="text-uppercase text-white text-xxs font-weight-bolder opacity-7 ps-2">
                                Actions
                              </th>
                              <th className="text-secondary opacity-7" />
                            </tr>
                          </thead>
                          <tbody>
                            {categories?.map((c, i) => (
                              <tr key={c._id}>
                                <td>
                                  <div className="d-flex px-2 py-1">
                                    <div>{i+1}</div>
                                  </div>
                                </td>
                                <td>
                                  <div className="d-flex flex-column justify-content-center">
                                    <h6 className="mb-0 text-sm">
                                      {c.category}
                                    </h6>
                                
                                  </div>
                                </td>
                                <td className="align-middle">
                                 
                                 <Link className="m-2" to={`/dashboard/superadmin/category/update-category/${c._id}`}><EditIcon onClick={()=>SetLocalStorage(c._id,c.category)}/></Link>
                               <DeleteIcon className="text-danger" onClick={()=>HandleDelete(c._id)}/>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
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

export default Category;
