import React, { useEffect, useState } from "react";
import AdminMenu from "../../../Layout/AdminMenu";
import Layout from "../../../Layout/Layout";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Button from "@mui/material/Button";
import { useAuth } from "../../../Context/Auth";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Product = () => {
  const [products, SetProducts] = useState([]);
  const [page, SetPage] = useState(1);
  const [total, SetTotal] = useState();
  const [totalPage, SetTotalPage] = useState(1);
  const [auth] = useAuth();
  const [keyword, SetKeyword] = useState();
  const [Data, SetData] = useState();
  const id = auth?.user.vendor_id;

  const getproducts = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/product/countperpage/${page}/${id}`
      );
      SetProducts(data?.productdata);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getproducts();
    gettotal();
  }, []);

  const gettotal = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/product/product-count"
      );
      SetTotal(data?.counts);
      SetTotalPage(data?.totalPage);
    } catch (error) {
      console.log(error);
    }
  };

  const loadmore = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/product/countperpage/${page}/${id}`
      );
      SetProducts(data?.productdata);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // if (page === 1) return;
    loadmore();
  }, [page]);

  const HandleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:8000/api/product/delete-product/${id}`
      );
      getproducts();
      toast.success(data?.msg);
    } catch (error) {
      console.log(error);
      toast.error("'something went wrong");
    }
  };

  const handleSearch = async (e) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/product/search/${keyword}`
      );
     
      SetData(data?.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
  (keyword)? handleSearch():getproducts()
  }, [keyword]);

  return (
    <Layout>
      <div className="container-fluid p-1 m-0">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-white">All Products</h1>
         
            <div className="container-fluid py-4">
              <div className="row">
                <div className="col-12">
                  <div className="card mb-4">
                    <div className="card-header pb-0 bg-light">
                      <h6>
                        Products
                       <input
                         className="form-control "
                          type="search"
                          name="keyword"
                          placeholder="Search"
                          defaultValue={keyword ||""}
                          onChange={(e)=>{SetKeyword(e.target.value)}}
                          
                        />
                        
                        <Link to={"/dashboard/admin/product/add-product"} className="float-end mt-0  m-2 p-2">
                          
                            <AddIcon />
                          
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
                              <th className="text-uppercase text-white text-xxs font-weight-bolder opacity-7">
                                Date
                              </th>
                              <th className="text-uppercase text-white text-xxs font-weight-bolder opacity-7 ps-2">
                                Product-Name
                              </th>
                              <th className="text-uppercase text-white text-xxs font-weight-bolder opacity-7">
                                quantity
                              </th>
                              <th className="text-uppercase text-white text-xxs font-weight-bolder opacity-7">
                                Price
                              </th>
                              <th className="text-uppercase text-white text-xxs font-weight-bolder opacity-7">
                                Total
                              </th>
                              <th className="text-uppercase text-white text-xxs font-weight-bolder opacity-7">
                                Customer-Name
                              </th>
                              <th className="text-uppercase text-white text-xxs font-weight-bolder opacity-7 ps-2">
                                Actions
                              </th>
                              <th className="text-white opacity-7" />
                            </tr>
                          </thead>
                          <tbody>
                         {/* {(keyword){}elseif(){}else{}} */}
                           { (Data)?( Data?.map((p, i) => (
                        
                              <tr key={p._id}>
                                <td>
                                  <div className="d-flex px-2 py-1">
                                    <div>{i + 1}</div>
                                  </div>
                                </td>
                                <td>
                                  <div className="d-flex px-2 py-1">
                                    <div>{p.date}</div>
                                  </div>
                                </td>

                                <td>
                                  <div className="d-flex flex-column justify-content-center">
                                    <h6 className="mb-0 text-sm">{p.name}</h6>
                                  </div>
                                </td>
                                <td>
                                  <div className="d-flex px-2 py-1">
                                    <div>{p.quantity}</div>
                                  </div>
                                </td>
                                <td>
                                  <div className="d-flex px-2 py-1">
                                    <div>{p.price}</div>
                                  </div>
                                </td>
                                <td>
                                  <div className="d-flex px-2 py-1">
                                    <div>{p.total}</div>
                                  </div>
                                </td>
                                <td>
                                  <div className="d-flex px-2 py-1">
                                    <div>{p.user.name}</div>
                                  </div>
                                </td>
                                <td className="align-middle">
                                  <Link
                                    to={`/dashboard/admin/product/update-product/${p._id}`}
                                  >
                                   
                                    <EditIcon/>
                                  
                                  </Link>
                                  <Button
                                    onClick={() => HandleDelete(p._id)}
                                  
                                  >
                                    <DeleteIcon/>
                                  </Button>
                                </td>
                              </tr>
                            ))):( products?.map((p, i) => (
                              <tr key={p._id}>
                                <td>
                                  <div className="d-flex px-2 py-1">
                                    <div>{i + 1}</div>
                                  </div>
                                </td>
                                <td>
                                  <div className="d-flex px-2 py-1">
                                    <div>{p.date}</div>
                                  </div>
                                </td>

                                <td>
                                  <div className="d-flex flex-column justify-content-center">
                                    <h6 className="mb-0 text-sm">{p.name}</h6>
                                  </div>
                                </td>
                                <td>
                                  <div className="d-flex px-2 py-1">
                                    <div>{p.quantity}</div>
                                  </div>
                                </td>
                                <td>
                                  <div className="d-flex px-2 py-1">
                                    <div>{p.price}</div>
                                  </div>
                                </td>
                                <td>
                                  <div className="d-flex px-2 py-1">
                                    <div>{p.total}</div>
                                  </div>
                                </td>
                                <td>
                                  <div className="d-flex px-2 py-1">
                                    <div>{p.user.name}</div>
                                  </div>
                                </td>
                                <td className="align-middle">
                                  <Link
                                    to={`/dashboard/admin/product/update-product/${p._id}`} 
                                  >
                                     <EditIcon/>
                                  </Link>
                                  <Button
                                    onClick={() => HandleDelete(p._id)}
                                   
                                  >
                                   <DeleteIcon/>
                                  </Button>
                                </td>
                              </tr>
                            )))
                            }
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="outlined"
                    className="bg-dark text-white m-2"
                    onClick={() => SetPage(page + 1)}
                    hidden={page === totalPage}
                    
                  >
                    Next
                  </Button>
                  <Button
                    variant="outlined"
                    className="bg-dark text-white"
                    onClick={() => SetPage(page - 1)}
                    hidden={page === 1}
                  >
                    Prev
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Product;
