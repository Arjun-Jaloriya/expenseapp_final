const express = require('express');
const productrouter = express.Router();
const { issignIn, isAdmin } = require("../middleware/auth");

const {addproduct,vendorwiseproducts,getallproducts,updateproduct,singleproduct,deleteproduct,searchdata,daytotal,monthtotal,dashboarddaytotal,dashboadmonthtotal,dashboadyeartotal,productcount,perpageproduct} = require("../controller/product");

productrouter.post("/add-product/:id",issignIn,isAdmin,addproduct);
productrouter.get("/viewall-product",issignIn,isAdmin,getallproducts);
productrouter.put("/update-product/:id",issignIn,isAdmin,updateproduct);
productrouter.get("/single-product/:id",issignIn,isAdmin,singleproduct);
productrouter.delete("/delete-product/:id",issignIn,isAdmin,deleteproduct);
productrouter.get("/vendorwise-product/:id",issignIn,isAdmin,vendorwiseproducts);

// productrouter.get("gel-alltotal",issignIn,isAdmin,getalltotal);
// productrouter.get("month-total",issignIn,isAdmin,monthtotal);
productrouter.post("/day-total",issignIn,isAdmin,daytotal);
productrouter.post("/month-total",issignIn,isAdmin,monthtotal);
productrouter.get("/todaytotal",issignIn,isAdmin,dashboarddaytotal);
productrouter.get("/monthtotal",issignIn,isAdmin,dashboadmonthtotal);
productrouter.get("/yeartotal",issignIn,isAdmin,dashboadyeartotal);


//search
productrouter.get("/search/:keyword",issignIn,isAdmin,searchdata);


//pagination
productrouter.get("/product-count",productcount);
productrouter.get("/countperpage/:page/:id",perpageproduct)
module.exports = productrouter;