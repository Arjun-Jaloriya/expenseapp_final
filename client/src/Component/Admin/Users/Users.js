import React, { useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import toast from "react-hot-toast";
import AdminMenu from "../../Layout/AdminMenu";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

const Users = () => {
  const Navigate = useNavigate();
  const [users, SetUsers] = useState();
  const [status, SetStatus] = useState(1);

  const getallUsers = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/auth/view-allvuservendorwise"
      );
      SetUsers(data?.vuserdata1);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getallUsers();
  }, []);

  const handleChangeStatus = async (id) => {
    try {
      SetStatus(!status);
      const { data } = await axios.put(
        `http://localhost:8000/api/auth/change-status/${id}`,
        { status }
      );
      toast.success(data?.msg);
      getallUsers();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="container-fluid p-1 m-0">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-white">All users</h1>
            <div className="container-fluid py-4">
              <div className="row">
                <div className="col-12">
                  <div className="card mb-4">
                    <div className="card-header pb-0 bg-light">
                      <h6>
                        Users
                        <Link to={"/dashboard/admin/users/add-user"} className="float-end mt-0  m-2 p-2">
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

                              <th className="text-uppercase text-white text-xxs font-weight-bolder opacity-7 ps-2">
                                User-Name
                              </th>
                              <th className="text-uppercase text-white text-xxs font-weight-bolder opacity-7">
                                Address
                              </th>
                              <th className="text-uppercase text-white text-xxs font-weight-bolder opacity-7">
                                Phone
                              </th>
                              <th className="text-uppercase text-white text-xxs font-weight-bolder opacity-7">
                                Photo
                              </th>
                              <th className="text-uppercase text-white text-xxs font-weight-bolder opacity-7">
                                Status
                              </th>
                              <th className="text-uppercase text-white text-xxs font-weight-bolder opacity-7 ps-2">
                                Actions
                              </th>
                              <th className="text-white opacity-7" />
                            </tr>
                          </thead>
                          <tbody>
                            {users?.map((u, i) => (
                              <tr key={u._id}>
                                <td>
                                  <div className="d-flex px-2 py-1">
                                    <div>{i + 1}</div>
                                  </div>
                                </td>
                                <td>
                                  <div className="d-flex px-2 py-1">
                                    <div>{u.name}</div>
                                  </div>
                                </td>

                                <td>
                                  <div className="d-flex px-2 py-1">
                                    <div>{u.address}</div>
                                  </div>
                                </td>
                                <td>
                                  <div className="d-flex px-2 py-1">
                                    <div>{u.phone}</div>
                                  </div>
                                </td>
                                <td>
                                  <div className="d-flex px-2 py-1">
                                    <div>
                                      <img
                                        src={`http://localhost:8000/api/auth/getvuserphoto/${u._id}`}
                                        height={"100px"}
                                        className="img img-responsive"
                                      />
                                    </div>
                                  </div>
                                </td>

                                <td>
                                  <div className="d-flex px-2 py-1 mt-2">
                                    <div>
                                      <button
                                        className={`${
                                          u.status === 1
                                            ? "btn btn-success"
                                            : "btn btn-danger"
                                        }`}
                                        onClick={(id) => {
                                          handleChangeStatus(u._id);
                                        }}
                                      >
                                        {u.status == 1 ? "Active" : "Disable"}
                                      </button>
                                    </div>
                                  </div>
                                </td>
                                <td className="align-middle">
                                  <Link
                                    to={`/dashboard/admin/users/update-user/${u._id}`}
                                  >
                                    <EditIcon/>
                                  </Link>
                                  {/* <Button
                                     onClick={() => HandleDelete(v._id)}
                                     variant="outlined"
                                     className="bg-dark text-white"
                                   >
                                     DELETE
                                   </Button> */}
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

export default Users;
