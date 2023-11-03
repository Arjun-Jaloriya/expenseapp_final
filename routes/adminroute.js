const express = require("express");
const router = express.Router();
const { User } = require("../models/user");

const { issignIn, isAdmin, isSuperAdmin } = require("../middleware/auth");
const formidable = require("express-formidable");

const {
  register,
  login,
  add,
  update,
  view,
  remove,
  getphoto,
  getuserbyid,
  updateprofile,
  getallpaymentdata
  
} = require("../controller/admin");
const { addvendor,viewallvendor,updatevendor,deletevendor,getvendorphoto ,changestatus,getsinglevendor,makepayment,braintreetoken,makepaymentstripe,sendemail,getpaymentbyid} = require("../controller/vendor");
const { addvuser,venodorwisevuser,updatevuser,deletevuser,getallvuserbyid,viewallvusers,changestatusvuser ,getvuserphoto} = require("../controller/vuser");


//admin
router.post("/register", register);
router.post("/login", login);
router.post("/add", issignIn, isAdmin, add);
router.get("/getuserbyid",issignIn,getuserbyid)
router.put("/update-profile", issignIn, isAdmin,formidable(),update);
router.get("/view", issignIn, isAdmin, view);
router.get("/delete/:id", issignIn, isAdmin, remove);
router.get("/getphoto/:id",getphoto);
router.get("/getvuserphoto/:id",getvuserphoto);

router.post("/add-vuser",issignIn,isAdmin,formidable(),addvuser);
router.get("/view-allvuservendorwise",issignIn,isAdmin,venodorwisevuser);
router.get("/getallvuserbyid/:id",issignIn,isAdmin,getallvuserbyid)
router.put("/update-vuser/:id",issignIn,isAdmin,formidable(),updatevuser);
router.delete("/delete-vuser/:id",issignIn,isAdmin,deletevuser);
router.put("/change-status-vuser/:id",issignIn,isAdmin,changestatusvuser);

// router.get("/braintree/token",issignIn,isAdmin,braintreetoken)
// router.post("/braintree/make-payment",issignIn,isAdmin,makepayment);

 router.post("/make-payment",issignIn,isAdmin,makepaymentstripe);
// router.post("/send-email",issignIn,isAdmin,sendemail);
router.get("/get-paymentbyid",issignIn,isAdmin,getpaymentbyid)
router.get("/admin-auth", issignIn, isAdmin, (req, res) => {
res.status(200).send({ ok: true });
});




//superadmin
router.post("/add-vendor",issignIn,isSuperAdmin,formidable(),addvendor);
router.get("/view-allvendors",issignIn,isSuperAdmin,viewallvendor);
router.put("/update-vendor/:id",issignIn,isSuperAdmin,formidable(),updatevendor);
router.get("/delete-vendor/:id",issignIn,isSuperAdmin,deletevendor);
router.get("/getvendorphoto/:id",getvendorphoto);
router.get("/get-singlevendor/:id",issignIn,isSuperAdmin,getsinglevendor);
router.put("/change-status/:id",issignIn,isSuperAdmin,changestatus);
router.get("/view-allvuser",issignIn,isSuperAdmin,viewallvusers);
router.put("/updateprofile",issignIn,isSuperAdmin,formidable(),updateprofile)

router.get("/getallpaymentdetails",issignIn,isSuperAdmin,getallpaymentdata)

router.get("/superadmin-auth", issignIn, isSuperAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});



// //vendor
//   router.post("/add-vuser",issignIn,isvendor,formidable(),addvuser);
//   router.get("/view-allvuser",issignIn,isvendor,viewallvuser);
//   router.put("/update-vuser/:id",issignIn,isvendor,formidable(),updatevuser);
// router.delete("/delete-vuser/:id",issignIn,isvendor,deletevuser);

// router.get("/admin-auth", issignIn, isvendor, (req, res) => {
//   res.status(200).send({ ok: true });
// });
module.exports = router;
