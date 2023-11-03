const express = require("express");
const { Vendor } = require("../models/vendor");
const { User } = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const fs = require("fs");
const moment = require("moment");
const { Payment } = require("../models/payment");
const nodemailer = require("nodemailer");
const stripe = require("stripe")(
  "sk_test_51O3BMJSGZMOK1X0aSp28uGgYB7mPMhgbLQY1qcqZNa54Rz9IGgoHUnPjVfZig2NSIvOYmq8Lwic6SaeLBnS0N7oH00oUWAYaGM"
);
// const braintree = require("braintree");

// //payment gateway
// var gateway = new braintree.BraintreeGateway({
//   environment: braintree.Environment.Sandbox,
//   merchantId: "fznw2qwjcd5fsxjk",
//   publicKey: "x2yt9qfzxtp6hzvd",
//   privateKey: "510bfc8282830b8baa3f3547f7e6ba29",
// });

const addvendor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      address,
      role,
      status,
      aadharno,
      pan,
      accountno,
      ifsc,
      startdate,
      enddate,
    } = req.fields;
    const { photo } = req.files;
    switch (true) {
      case !name:
        return res.send({ error: "Name is Required" });

      case !email:
        return res.send({ message: "Email is Required" });

      case !password:
        return res.send({ message: "Password is Required" });

      case !phone:
        return res.send({ message: "Phone no is Required" });

      case !address:
        return res.send({ message: "Address is Required" });

      case !aadharno:
        return res.send({ message: "aadharno is Required" });

      case !pan:
        return res.send({ message: "pan is Required" });

      case !accountno:
        return res.send({ message: "accountno is Required" });

      case !ifsc:
        return res.send({ message: "ifsc is Required" });

      case !startdate:
        return res.send({ message: "startdate is Required" });
      case !enddate:
        return res.send({ message: "enddate is Required" });

      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }
    const existinguser = await Vendor.findOne({ email });

    if (existinguser) {
      res.status(400).send({
        success: true,
        msg: "vendor Allready Register",
      });
    }

    const hashpassword = await bcrypt.hash(password, 10);

    const vendordata = new Vendor({
      name: name,
      email: email,
      phone: phone,
      password: hashpassword,
      address: address,
      aadharno: aadharno,
      pan: pan,
      startdate: startdate,
      enddate: enddate,
      ifsc: ifsc,
      accountno: accountno,
    });
    if (photo) {
      vendordata.photo.data = fs.readFileSync(photo.path);
      vendordata.photo.contentType = photo.type;
    }
    await vendordata.save();
    const vendordata1 = new User({
      name: name,
      email: email,
      phone: phone,
      password: hashpassword,
      address: address,
      vendor_id: vendordata._id,
    });
    if (photo) {
      vendordata1.photo.data = fs.readFileSync(photo.path);
      vendordata1.photo.contentType = photo.type;
    }
    vendordata1.save();
    res.status(200).send({
      success: true,
      msg: "Vendor Register Successfully",
      vendordata,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "error in add-vendor",
      error,
    });
  }
};

const viewallvendor = async (req, res) => {
  try {
    const vendordata = await Vendor.find({}).select("-photo");
    const activevendors = await Vendor.find({ status: 1 });
    if (vendordata && activevendors) {
      res.status(200).send({
        success: true,
        msg: "vendors fetched successfully",
        count: vendordata.length,
        vendordata,
        active_vendor_count: activevendors.length,
      });
    } else {
      return res.json("no Vendors found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "error in getallvendors",
      error,
    });
  }
};

const updatevendor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      address,
      role,
      status,
      aadharno,
      pan,
      accountno,
      ifsc,
      startdate,
      enddate,
    } = req.body;
    const { photo } = req.files;
    
    const vdata = await Vendor.findById(req.params.id).select("-photo");
    const userdata = await User.findOne({ vendor_id: req.params.id });

    const hashedpassword = password
      ? await bcrypt.hash(password, 10)
      : undefined;

    const vendordata = await Vendor.findByIdAndUpdate(
      req.params.id,
      {
        name: name,
        email: email,
        phone: phone,
        address: address,
        password: hashedpassword || vdata.password,
        ifsc: ifsc,
        accountno: accountno,
        aadharno: aadharno,
        pan: pan,
        startdate: startdate,
        enddate: enddate,
      },
      { new: true }
    );
    if (photo) {
      vendordata.photo.data = fs.readFileSync(photo.path);
      vendordata.photo.contentType = photo.type;
    }
    await vendordata.save();

    const vendordata1 = await User.findOneAndUpdate(
      { vendor_id: req.params.id },
      {
        name: name,
        email: email,
        phone: phone,
        password: hashedpassword || userdata.password,
        address: address,
      }
    );
    if (photo) {
      vendordata1.photo.data = fs.readFileSync(photo.path);
      vendordata1.photo.contentType = photo.type;
    }
    vendordata1.save();
    res.status(200).send({
      success: true,
      msg: `update vendor successfully`,
      vendordata,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "error in update-vendor",
      error,
    });
  }
};

const deletevendor = async (req, res) => {
  try {
    const vid = req.params;
    const vendordata = await Vendor.findByIdAndDelete(vid);
    res.status(200).send({
      success: true,
      msg: "vendor deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "error in delete-vendor",
      error,
    });
  }
};

const getvendorphoto = async (req, res) => {
  try {
    const vendorphoto = await Vendor.findById(req.params.id).select("photo");
    if (vendorphoto.photo.data) {
      res.set("Content-Type", vendorphoto.photo.contentType);
      return res.status(200).send(vendorphoto.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "error in getphoto",
      error,
    });
  }
};

const changestatus = async (req, res) => {
  try {
    const { status } = req.body;
    const updatestatus = await Vendor.findByIdAndUpdate(req.params.id, {
      status: status,
    }).select("-photo");
    const updaterstatusinuser = await User.findOneAndUpdate(
      { vendor_id: req.params.id },
      {
        status: status,
      }
    ).select("-photo");

    res.status(200).send({
      success: true,
      msg: "update status successfully",
      updatestatus,
      updaterstatusinuser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "error in change-status",
      error,
    });
  }
};

const getsinglevendor = async (req, res) => {
  try {
    const getvendor = await Vendor.findOne({ _id: req.params.id }).select(
      "-photo"
    );
    res.status(200).send({
      success: true,
      msg: "single vendor fetched successfully",
      getvendor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "error in single vendor",
      error,
    });
  }
};

// //braintree token
// const braintreetoken= async(req,res)=>{
//   try {
//     gateway.clientToken.generate({}, function (err, response) {
//       if (err) {
//         res.status(500).send(err);
//       } else {
//         res.send(response);
//       }
//     });
//   } catch (error) {
//     console.log(error);
//   }
// }

// //makepayment-api
// const makepayment = async(req,res)=>{
//   try {
//     const {nonce,amount} = req.body;
//     const vendordata = await User.findOne(req.user._id);

//     let newTransaction = gateway.transaction.sale(
//       {
//         amount: amount,
//         paymentMethodNonce: nonce,
//         options: {
//           submitForSettlement: true,
//         },
//       },
//       function (error, result) {
//         if (result) {
//           const paymentdata = new Payment({

//             payment: result,
//             vendor: vendordata.vendor_id,
//           }).save();
//           res.json({ ok: true });
//         } else {
//           res.status(500).send(error);
//         }
//       }
//     );
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       msg: "error in make-payment",
//       error,
//     });
//   }
// }

const makepaymentstripe = async (req, res) => {
  try {
    const { amount } = req.body;
    const date = moment().format("DD-MM-YYYY");
    const priceInCents = amount * 100;
    const vendordata = await User.findOne(req.user._id);
   
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr", // Replace with your preferred currency
            product_data: {
              name: "Your Product Name",
              description: "Description of your product",
            },
            unit_amount: priceInCents,
          },
          quantity: 1, // You can adjust the quantity if needed
        },
      ],
      mode: "payment",
      success_url: "http://localhost:3000/dashboard/admin/payment",
      cancel_url: "http://localhost:3000/dashboard/admin/payment",
    });

    res.json({ id: session.id });

    const paymentdata = new Payment({
      payment: session,
      vendor: vendordata.vendor_id,
      date: date,
    }).save();
  } catch (error) {
    if (error.type === "StripeInvalidRequestError") {
      console.error("Stripe Invalid Request Error:", error.message);
      // Handle the specific error, such as providing user feedback
      res.status(400).json({ error: "Invalid request to Stripe" });
    } else {
      console.error("Stripe API Error:", error.message);
      // Handle other types of Stripe errors or unexpected errors
      res
        .status(500)
        .json({ error: "An error occurred while processing your request" });
    }
  }
};

// const sendemail = async (req, res) => {
//   try {
//     const { email } = req.body;

//     res.status(200).send({
//       success: true,
//       msg: "please check your email ",
//       statusCode: res.statusCode,
//     });
//     const tranporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.SENDEMAIL,
//         pass:  process.env.SENDPASSWORD,
//       },
//     });

//     const mailOption = {
//       from: "arjunjaloriya100@gmail.com",
//       to: email,
//       subject: "Successful Payment done",
//       html: `<p>${email} you are successfully done payment please logout and re-login again your membership is continued</p>`,
//     };

//     tranporter.sendMail(mailOption, (error, info) => {
//       if (error) {
//         console.log(error.message);
//        return res.status(400).json({
//           msg: error.msg,
//           status: "false",
//           statusCode: res.statusCode,
//         });
//       } else {
//         res.status(201).json({
//           msg: `Email sent ${info.response}`,
//           success: true,
//           statusCode: res.statusCode,
//         });
//       }
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       msg: "error in send-msg",
//       error,
//     });
//   }
// };

const getpaymentbyid = async (req, res) => {
  try {
    const todaydate = moment().format("DD-MM-YYYY");
    const vendordata = await User.findOne(req.user._id);
    const email = vendordata.email;

    const result = await Payment.find({
      $and: [{ vendor: vendordata.vendor_id }, { date: todaydate }],
    }).populate("vendor","-photo");
     
    if(result){
        
      res.status(200).send({
        success: true,
        msg: "please check your email ",
        statusCode: res.statusCode,
      });
      const tranporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.SENDEMAIL,
          pass:  process.env.SENDPASSWORD,
        },
      });
  
      const mailOption = {
        from: process.env.SENDEMAIL,
        to: email,
        subject: "Successful Payment done",
        html: `<p>${email} you are successfully done payment please logout and re-login again your membership is continued</p>`,
      };
  
      tranporter.sendMail(mailOption, (error, info) => {
        if (error) {
          console.log(error.message);
        return  res.status(400).json({
            msg: error.msg,
            status: "false",
            statusCode: res.statusCode,
          });
        } else {
          res.status(201).json({
            msg: `Email sent ${info.response}`,
            success: true,
            statusCode: res.statusCode,
          });
        }
      });
    }else{
      return res.send("please make payment first")
    }

 
  } catch (error) {
    console.log(error);
   return res.status(500).send({
      success: false,
      msg: "error in getpaymentbyid",
      error,
    });
  }
};

module.exports = {
  addvendor,
  viewallvendor,
  updatevendor,
  deletevendor,
  getvendorphoto,
  changestatus,
  getsinglevendor,
  // makepayment,
  // braintreetoken,
  makepaymentstripe,
  // sendemail,
  getpaymentbyid,
};
