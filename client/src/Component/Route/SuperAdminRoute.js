import React, { useEffect, useState } from "react";
import { useAuth } from "../Context/Auth";
import axios from "axios";
import { Outlet } from "react-router-dom";
import Spinner from "../Spinner";
const SuperAdminRoute = () => {
    const [auth, SetAuth] = useAuth();
    const [ok, SetOk] = useState(false);
  
    useEffect(() => {
      const AuthCheck = async () => {
        const { data } = await axios.get(
          "http://localhost:8000/api/auth/superadmin-auth"
        );
        if (data.ok) {
          SetOk(true);
        } else SetOk(false);
      };
      if(auth?.token) AuthCheck()
    }, [auth?.token]);
    return ok ? <Outlet/> : <Spinner path = ""/>
  };

export default SuperAdminRoute
