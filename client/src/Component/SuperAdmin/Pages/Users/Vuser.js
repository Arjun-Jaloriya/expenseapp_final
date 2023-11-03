import React, { useEffect, useState } from "react";
import Layout from "../../../Layout/Layout";
import SuperAdminMenu from "../../../Layout/SuperAdminMenu";
import axios from "axios";

const Vuser = () => {
  const [vuser, SetVuser] = useState();

  const getallvusers = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/auth/view-allvuser"
      );
      console.log(data);
      SetVuser(data?.vuserdata);
     
    } catch (error) {
      console.log(error);
    }
  };



  useEffect(()=>{
    getallvusers();
  },[])
  return (
    <Layout>
      <div className="container-fluid p-1 m-0">
        <div className="row">
          <div className="col-md-3">
            <SuperAdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-white">All Vusers</h1>
     
            <div className="container-fluid py-4">
              <div className="row">
                <div className="col-12">
                  <div className="card mb-4">
                    <div className="card-header pb-0 bg-light">
                      <h6>Vusers</h6>
             
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
                                Vuser-Name
                              </th>
                              <th className="text-uppercase text-white text-xxs font-weight-bolder opacity-7">
                                Vendor-Name
                              </th>
                              <th className="text-uppercase text-white text-xxs font-weight-bolder opacity-7">
                                Email
                              </th>
                              <th className="text-uppercase text-white text-xxs font-weight-bolder opacity-7">
                                Address
                              </th>
                              <th className="text-uppercase text-white text-xxs font-weight-bolder opacity-7">
                                Status
                              </th>
                              
                              <th className="text-white opacity-7" />
                            </tr>
                          </thead>
                          <tbody>
                            {vuser?.map((v, i) => (
                              <tr key={v._id}>
                                <td>
                                  <div className="d-flex px-2 py-1">
                                    <div>{i + 1}</div>
                                  </div>
                                </td>
                                <td>
                                  <div className="d-flex px-2 py-1">
                                    <div>{v.name}</div>
                                  </div>
                                </td>

                                <td>
                                  <div className="d-flex px-2 py-1">
                                    <div>{v.vendor.name}</div>
                                  </div>
                                </td>
                                <td>
                                  <div className="d-flex px-2 py-1">
                                    <div>{v.email}</div>
                                  </div>
                                </td>
                                <td>
                                  <div className="d-flex px-2 py-1">
                                    <div>{v.address}</div>
                                  </div>
                                </td>
                                <td>
                                  <div className="d-flex px-2 py-1 mt-2">
                                    <div>
                                    <button className={`${v.status === 1 ? 'btn btn-success' : 'btn btn-danger'}`}>{v.status == 1?'Active':'Disable'}</button>
                                    </div>
                                  </div>
                                </td>
                               
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* <Button
                    variant="outlined"
                    className="bg-dark text-white"
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
                  </Button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Vuser;
