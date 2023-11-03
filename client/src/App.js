import "./App.css";

import { Routes, Route } from "react-router-dom";
import Login from "./Component/Admin/Auth/Login";
import Register from "./Component/Admin/Auth/Register";
import AdminRoute from "./Component/Route/AdminRoute";
import AdminDashboard from "./Component/Admin/Pages/AdminDashboard";
import Category from "./Component/SuperAdmin/Pages/Category/Category";
import AddCategory from "./Component/SuperAdmin/Pages/Category/AddCategory";
import UpdateCategory from "./Component/SuperAdmin/Pages/Category/UpdateCategory";
import Product from "./Component/Admin/Pages/Product/Product";
import AddProduct from "./Component/Admin/Pages/Product/AddProduct";
import UpdateProduct from "./Component/Admin/Pages/Product/UpdateProduct";
import DayReport from "./Component/Admin/Pages/Report/DayReport";
import Daywise from "./Component/Admin/Pages/Report/Daywise";
import Monthwise from "./Component/Admin/Pages/Report/Monthwise";
import Yearwise from "./Component/Admin/Pages/Report/Yearwise";
import Home from "./Component/Admin/Pages/Home";
import Profile from "./Component/Admin/Pages/Profile/Profile";

import SuperAdminDashboard from "./Component/SuperAdmin/SuperAdminDashboard";
import SuperAdminRoute from "./Component/Route/SuperAdminRoute";
import Vendors from "./Component/SuperAdmin/Pages/Vendors/Vendors";

import AddVendors from "./Component/SuperAdmin/Pages/Vendors/AddVendors";
import UpdateVendor from "./Component/SuperAdmin/Pages/Vendors/UpdateVendor";
import Vuser from "./Component/SuperAdmin/Pages/Users/Vuser";
import SuperadminProfile from "./Component/SuperAdmin/Pages/SuperadminProfile";
import Users from "./Component/Admin/Users/Users";
import AddUser from "./Component/Admin/Users/AddUser";
import UpdateUser from "./Component/Admin/Users/UpdateUser";
import UserReport from "./Component/Admin/Pages/Report/UserReport";
import Payment from "./Component/Admin/Pages/Payment/Payment";
import Payments from "./Component/SuperAdmin/Pages/Payment/Payments";
import UpdateVPayment from "./Component/SuperAdmin/Pages/Payment/UpdateVPayment";



function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<SuperAdminRoute />}>
          <Route path="superadmin" element={<SuperAdminDashboard />} />
          <Route path="superadmin/vendors" element={<Vendors />} />
          <Route
            path="superadmin/vendors/add-vendor"
            element={<AddVendors />}
          />
          <Route
            path="superadmin/vendors/update-vendor/:id"
            element={<UpdateVendor />}
          />

          <Route path="superadmin/category" element={<Category />} />
          <Route
            path="superadmin/category/add-category"
            element={<AddCategory />}
          />
          <Route
            path="superadmin/category/update-category/:id"
            element={<UpdateCategory />}
          />

          <Route path="superadmin/users" element={<Vuser />} />
          <Route path="superadmin/payments" element={<Payments/>}/>
          <Route path="superadmin/payments/update-vpayment/:id" element={<UpdateVPayment/>}/>
         
          <Route path="superadmin/profile" element={<SuperadminProfile />} />
        </Route>

        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />

          <Route path="admin/product" element={<Product />} />
          <Route path="admin/product/add-product" element={<AddProduct />} />
          <Route
            path="admin/product/update-product/:id"
            element={<UpdateProduct />}
          />

          <Route path="admin/report" element={<DayReport />} />
          <Route path="admin/report/daywise" element={<Daywise />} />
          <Route path="admin/report/monthwise" element={<Monthwise />} />
          <Route path="admin/report/yearwise" element={<Yearwise />} />

          <Route path="admin/users" element={<Users />} />
          <Route path="admin/users/add-user" element={<AddUser />} />
          <Route path="admin/users/update-user/:id" element={<UpdateUser />} />
          <Route path="admin/userreport" element={<UserReport/>}/>
          <Route path="admin/profile" element={<Profile />} />

          <Route path="admin/payment" element={<Payment/>}/>
 

        </Route>
      </Routes>
    </>
  );
}

export default App;
