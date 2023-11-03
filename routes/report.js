const express = require('express');
const { issignIn, isAdmin } = require('../middleware/auth');
const { singleday ,monthreport,yearreport,monthuserreport} = require('../controller/report');
const reportrouter = express.Router();

reportrouter.post("/single-day/:id",issignIn,isAdmin,singleday)
reportrouter.post("/month-report/:id",issignIn,isAdmin,monthreport);
reportrouter.post("/year-report/:id",issignIn,isAdmin,yearreport);


reportrouter.post("/month-reportuser",issignIn,isAdmin,monthuserreport);
// reportrouter.get("/singledayuserreport/:id",issignIn,isAdmin,singledayreportuserwise);




module.exports= reportrouter;