const { User } = require("../models/user");
const { Vuser } = require("../models/vuser");
const fs = require("fs");
const bcrypt = require("bcrypt");
const { Vendor } = require("../models/vendor");

const addvuser = async (req, res) => {
  try {
    const { name, email, phone, password, address } = req.fields;
    const {photo} = req.files;
   

    switch (true) {
      case !name:
        return res.send({ error: "Name is Required" });

      case !email:
        return res.send({ message: "Email is Required" });

      case !phone:
        return res.send({ message: "Phone no is Required" });

      case !address:
        return res.send({ message: "Address is Required" });

      case !password:
        return res.send({ message: "password is Required" });

      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }
    const existinguser = await Vuser.findOne({ email: email });

    if (existinguser) {
      res.status(400).send({ msg: `${name} already registred` });
    }
    
    const hashpassword = await bcrypt.hash(password,10);
    // console.log(req.user,'hi');
    const vendordata = await User.findOne(req.user);

    const vuserdata = new Vuser({
      name: name,
      email: email,
      phone: phone,
      password: hashpassword,
      address: address,
      vendor: vendordata.vendor_id,

    });
    if (photo) {
      vuserdata.photo.data = fs.readFileSync(photo.path);
      vuserdata.photo.contentType = photo.type;
      
    }
    await vuserdata.save();

    const vuserdata1 = new User({
      name: name,
      email: email,
      password: hashpassword,
      phone: phone,
      address: address,
      vendor_id:vendordata.vendor_id,
      vuser_id: vuserdata._id,
      role: 2,
     
     
    });
    if (photo) {
      vuserdata1.photo.data = fs.readFileSync(photo.path);
      vuserdata1.photo.contentType = photo.type;
    }
    await vuserdata1.save();
    res.status(200).send({
      success: true,
      msg: `${name} vuser added successfully`,
      vuserdata,
    
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "error in add-vuser",
      error,
    });
  }
};

const venodorwisevuser = async (req, res) => {
  try {
    const vuserdata = await User.findById(req.user._id).select("-photo");
    const vendorid = vuserdata.vendor_id;
    const vuserdata1 = await Vuser.find({vendor:vendorid}).select("-photo");
   
    res.status(200).send({
      success: true,
      msg: "all venodorwisevuser fetched successfully",
      count: vuserdata1.length,
      vuserdata1,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "error in venodorwisevuser",
      error,
    });
  }
};

const getallvuserbyid = async(req,res)=>{
  try {
    const vuserdata = await Vuser.findOne({vendor:req.user._id});
    res.status(200).send({
      success:true,
      msg:"allvuserbyid successfully fetched",
      vuserdata
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "error in get-allvuserbyid",
      error,
    });
  }
}

const updatevuser = async (req, res) => {
  try {
    const { name, email, phone, password, address } = req.fields;
    const { photo } = req.files;
    switch (true) {
      case !name:
        return res.send({ error: "Name is Required" });

      case !email:
        return res.send({ message: "Email is Required" });

      case !phone:
        return res.send({ message: "Phone no is Required" });

      case !address:
        return res.send({ message: "Address is Required" });

      case photo && photo.size > 5000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }
    const vuserinfo = await Vuser.findById({ _id: req.params.id }).select(
      "-photo"
    );

    const hashpassword = await bcrypt.hash(password,10);
    
    const vuserdata = await Vuser.findByIdAndUpdate(req.params.id, {
      name: name,
      email: email,
      phone: phone,
      password: hashpassword || vuserinfo.password,
      address: address,
    });
    if (photo) {
      vuserdata.photo.data = fs.readFileSync(photo.path);
      vuserdata.photo.contentType = photo.type;
    }
    await vuserdata.save();
    const userinfo = await User.findOne({ vuser_id: req.params.id }).select(
      "-photo"
    );

    const vuserdata1 = await User.findOneAndUpdate(
      { vuser_id: req.params.id },
      {
        name: name,
        email: email,
        password: hashpassword || userinfo.password,
        phone: phone,
        address: address,
      }
    );
    if (photo) {
      vuserdata1.photo.data = fs.readFileSync(photo.path);
      vuserdata1.photo.contentType = photo.type;
    }
    vuserdata1.save();
    res.status(200).send({
      success: true,
      msg: `${name} vuser updated successfully`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "error in update-vuser",
      error,
    });
  }
};

const deletevuser = async (req, res) => {
  try {
    const deletevuserdata = await Vuser.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      msg: "delete vuser successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "error in delete-vuser",
      error,
    });
  }
};

const viewallvusers = async(req,res)=>{
  try {
    const vuserdata = await Vuser.find({}).populate("vendor").select("-photo");
   
    res.status(200).send({
      success: true,
      msg: "all vuser fetched successfully",
      count: vuserdata.length,
      vuserdata,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "error in viewallvusers",
      error,
    });
  }
}

const changestatusvuser = async(req,res)=>{
  try {
    
    const { status } = req.body;
    const updatestatus = await Vuser.findByIdAndUpdate(req.params.id, {
      status: status,
    }).select("-photo");
    const updaterstatusinuser = await User.findOneAndUpdate({vuser_id:req.params.id}, {
      status: status,
    }).select("-photo");

    res.status(200).send({
      success: true,
      msg: "update status successfully",
      updatestatus,
      updaterstatusinuser
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "error in change-status",
      error,
    });
  }
}

const getvuserphoto = async(req,res)=>{
  try {
    const vuserphoto = await User.findOne({vuser_id:req.params.id}).select("photo");
   console.log(vuserphoto);
    if(vuserphoto.photo.data){
      res.set("Content-Type", vuserphoto.photo.contentType);
      res.status(200).send(vuserphoto.photo.data);
    }
  
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "error in vuserphoto",
      error,
    });
  }
}

module.exports = { addvuser, venodorwisevuser, updatevuser, deletevuser,getallvuserbyid,viewallvusers,changestatusvuser,getvuserphoto };
