const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const {Vendor} = require("../models/vendor");
const { Vuser } = require("../models/vuser");

const issignIn = async (req, res, next) => {
  try {
    
      const token = await req.headers.authorization;
      const verifyuser = jwt.verify(token, process.env.JWT_SECRET);
      
      req.user= await User.findOne({_id:verifyuser._id});
      // console.log(req.user,'hello');

      next();
  } catch (error) {
    console.log(error);
  }
};

// const isAdmin = async (req, res, next) => {
//   try {
//     const userdata = await User.findById(req.user._id)
   
//     if (userdata.role !== 1) {
//       res.status(404).send({
//         success: false,
//         msg: "UnAuthorized Access",
//       });
//     } else {
//       next();
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       msg: "Error in admin middelware",
//     });
//   }
// };

const isSuperAdmin = async(req,res,next)=>{
try {
  const userdata = await User.findById(req.user._id)
 
    if (userdata.role !== 0) {
      res.status(404).send({
        success: false,
        msg: "UnAuthorized Access",
      });
    } else {
      next();
    }
} catch (error) {
  console.log(error);
    res.status(500).send({
      success: false,
      msg: "Error in superadmin middelware",
    });
}
}

const isAdmin = async(req,res,next)=>{
  try {
    // console.log(req.user,'hi');
    const vdata = await User.findOne({_id:req.user._id});
   
    if(vdata.role !==1){
      res.status(404).send({
        success: false,
        msg: "UnAuthorized Access",
      });
    } else {
      next();
    }
    
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "Error in vuser middelware",
    });
  }
}

module.exports = {issignIn,isAdmin,isSuperAdmin};