import React, { useEffect, useState } from "react";
import Layout from "../../../Layout/Layout";
import toast from "react-hot-toast";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import Button from "@mui/material/Button";
import { useAuth } from "../../../Context/Auth";
import AdminMenu from "../../../Layout/AdminMenu";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

const Payment = () => {
  const Navigate = useNavigate();
  const [auth] = useAuth();
  const [token, SetToken] = useState();
  const [instance, SetInstance] = useState();
  const [amount] = useState(2500);
  const [paymentdata, SetPaymentData] = useState(null);
  const email = auth?.user?.email;

  // const gettoken = async () => {
  //   try {
  //     const { data } = await axios.get(
  //       "http://localhost:8000/api/auth/braintree/token"
  //     );
  //     SetToken(data?.clientToken);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   gettoken();
  //   // eslint-disable-next-line
  // }, [auth?.token]);

  // const makepayment = async () => {
  //   try {
  //     const { nonce } = await instance.requestPaymentMethod();
  //     const { data } = await axios.post(
  //       "http://localhost:8000/api/auth/braintree/make-payment",
  //       { nonce, amount }
  //     );
  //     toast.success("payment done successfully");
  //     Navigate("/dashboard/admin");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const makepayment = async () => {
    try {
      const stripe = await loadStripe(
        "pk_test_51O3BMJSGZMOK1X0ayn0gaYUcDdrh3MlUxoAcqHINmkt1WwEIVwJaZHZBnRiQZ4QOfkJFWmsSF7mw1JpfRRgnH5Eb00Ut8XK33I"
      );

      const response = await axios.post(
        "http://localhost:8000/api/auth/make-payment",
        { amount }
      );
      const sessionid = response.data.id;

      const result = stripe.redirectToCheckout({
        sessionId: sessionid,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getpaymentdata = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/auth/get-paymentbyid"
      );
      SetPaymentData(data?.result);
      if (paymentdata) {
        toast.success("Please check your Registerd email");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getpaymentdata();
  }, []);

  // useEffect(()=>{
  //  sendmsg();
  // },[paymentdata])

  // const sendmsg = async()=>{
  //   try {
  //     const {data} = await axios.post("http://localhost:8000/api/auth/send-email",{email});

  //     toast.success("successfull payment done");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  return (
    <Layout>
      <div className="container-fluid p-1 m-0">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-4">
            <h1 className="text-white">Make Payment</h1>

            <div className="container-fluid py-4">
              <div className="row">
                {/* <div className="col-md-6">
                  <div className="card mb-4">
                    {!token ? (
                     ""
                    ) : (
                        <>
                        <DropIn
                          options={{
                            authorization: token,
                            paypal: {
                              flow: "vault",
                            },
                          }}
                          onInstance={(instance) => SetInstance(instance)}
                        />
                        <Button
                          variant="outlined"
                          className="bg-dark text-white m-2"
                          onClick={makepayment}
                          disabled={!instance}
                        >
                          Make payment
                        </Button>
                      </>
                    )}
                  </div>
                </div> */}
                <Button
                  variant="outlined"
                  className="bg-dark text-white m-2"
                  onClick={makepayment}
                  // disabled={!instance}
                >
                  Make payment
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Payment;
