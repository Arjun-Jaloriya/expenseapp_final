const express = require("express");
const app = express();
const port = 8000 ||process.env.PORT;
const db = require("./config/db");
const cors = require("cors");
const authroutes = require("./routes/adminroute");
const dotenv = require("dotenv");
dotenv.config();
const morgan = require('morgan')
const categoryrouter = require('./routes/category');
const productrouter = require("./routes/productroute");
const reportRouter = require("./routes/report");
const bodyParser = require("body-parser");
const path = require("path");



app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,"./client/build")));


app.use("/api/auth",authroutes);
app.use("/api/category",categoryrouter);
app.use("/api/product/",productrouter);
app.use("/api/report/",reportRouter);


app.use('*',function(req,res){
    res.sendFile(path.join(__dirname,"./client/build/index.html"));
});

app.listen(port,()=>{
    console.log(`app live at port ${port}`);
})