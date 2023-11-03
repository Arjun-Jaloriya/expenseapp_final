const express = require("express");
const { User } = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const fs = require("fs");
const { Vendor } = require("../models/vendor");
const { Payment } = require("../models/payment");
const { log } = require("console");
const register = async (req, res) => {
  try {
    const { name, email, password, phone, address, role, status } = req.body;
    // const { photo } = req.files;
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

      // case photo && photo.size > 1000000:
      //   return res
      //     .status(500)
      //     .send({ error: "photo is Required and should be less then 1mb" });
    }
    const existinguser = await User.findOne({ email });

    if (existinguser) {
      return res.status(400).send({
        success: true,
        msg: "User Allready Register please login",
      });
    }
    const hashpassword = await bcrypt.hash(password, 10);

    const userdata = new User({
      name: name,
      email: email,
      password: hashpassword,
      address: address,
      phone: phone,
    });
    // if (photo) {
    //   userdata.photo.data = fs.readFileSync(photo.path);
    //   userdata.photo.contentType = photo.type;
    // }

    await userdata.save();
    res.status(200).send({
      success: true,
      msg: "User Register Successfully",
      userdata,
    });
  } catch (error) {
    console.log(error);
   return res.status(500).send({
      success: false,
      msg: "error in register",
      error,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.send({ message: "Email and password is Required" });
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).send({
        success: false,
        msg: "email is not registred",
      });
    }

    const matchpass = await bcrypt.compare(password, user.password);

    if (!matchpass) {
      return res.status(404).send({
        success: false,
        msg: "invalid email or password",
      });
    }
    if (!user.status == 1) {
      return res.status(404).send({
        success: false,
        msg: "sorry you cannot login",
      });
    }

    const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    user.tokens = await user.tokens.concat({ token: token });
    await user.save();
    res.status(200).send({
      success: true,
      msg: `${user.name}-you are successfully login`,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
        vendor_id: user.vendor_id,
        vuser_id: user.vuser_id,
      },
      token,
    });
  } catch (error) {
    return res.status(500).send({
      success: true,
      msg: "error in login",
    });
  }
};

const add = async (req, res) => {
  try {
    if (!name) {
      return res.send({ error: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    if (!phone) {
      return res.send({ message: "Phone no is Required" });
    }
    if (!address) {
      return res.send({ message: "Address is Required" });
    }
    if (!photo) {
      return res.send({ message: "Photo is required" });
    }

    const { name, email, password, phone, address, role, status } = req.body;

    const userdata = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
      address: req.body.address,
      role: req.body.role,
      status: req.body.status,
    });
    await userdata.save();
    res.status(200).send({
      success: true,
      msg: "added successfull",
      userdata,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      msg: "error in add user",
    });
  }
};

const update = async (req, res) => {
  try {
    var { name, email, password, phone, address } = req.body;
    const { photo } = req.files;
   

    const user = await User.findById(req.user._id).select("-photo");

    //password
    if (password && password.length < 6) {
      return res.json({ error: "Passsword is required and 6 character long" });
    }
    // const hashedpassword = password
    //   ? await bcrypt.hash(password, 10)
    //   : undefined;

    if (password == null) {
      password = user.password;
    } else {
      password = await bcrypt.hash(password, 10);
    }

    console.log(password);
    // const hashedpassword = await bcrypt.hash(password,10);
    const updatedata = await User.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        email: email || user.email,
        password: password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    if (photo) {
      updatedata.photo.data = fs.readFileSync(photo.path);
      updatedata.photo.contentType = photo.type;
    }
    await updatedata.save();

    const vendordata = await Vendor.findOne(user.vendor_id);
    const updatedata1 = await Vendor.findOneAndUpdate(
      user.vendor_id,
      {
        name: name,
        email: email,
        password: password,
        phone: phone,
        address: address,
      },
      { new: true }
    );
    if (photo) {
      updatedata1.photo.data = fs.readFileSync(photo.path);
      updatedata1.photo.contentType = photo.type;
    }
    await updatedata1.save();

    res.status(200).send({
      msg: "updated successfully",
      updatedata,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      msg: "error in update profile",
    });
  }
};

const view = async (req, res) => {
  try {
    const userdata = await User.find();
    res.status(200).send({
      success: true,
      msg: "view all user",
      userdata,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      msg: "error in view user",
    });
  }
};

const remove = async (req, res) => {
  try {
    const id = req.params.id;
    const userdata = await User.findByIdAndDelete({ _id: id });
    res.status(200).send({
      success: true,
      msg: "user deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      msg: "error in delete user",
    });
  }
};

const getphoto = async (req, res) => {
  try {
    const getuserphoto = await User.findOne({ _id: req.params.id }).select(
      "photo"
    );

    if (getuserphoto.photo.data) {
      res.set("Content-Type", getuserphoto.photo.contentType);
      return res.status(200).send(getuserphoto.photo.data);
    }
  } catch (error) {
    // console.log(error);
    // res.status(500).send({
    //   success: true,
    //   msg: "error in getphoto",
    // });
  }
};

const getuserbyid = async (req, res) => {
  try {
    const getuser = await User.findById(req.user._id);
    res.status(200).send({
      success: true,
      msg: "user fetched",
      getuser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      msg: "error in getuserbyid",
    });
  }
};

const updateprofile = async (req, res) => {
  try {
    var { name, email, password, phone, address } = req.body;
    const { photo } = req.files;

    const user = await User.findById(req.user._id).select("-photo");

    //password
    if (password && password.length < 6) {
      return res.json({ error: "Passsword is required and 6 character long" });
    }

    if (password == null) {
      password = user.password;
    } else {
      password = await bcrypt.hash(password, 10);
    }


    var updatedata = await User.findByIdAndUpdate(
      req.user._id,
      {
        name: name,
        email: email,
        password: password,
        phone: phone,
        address: address,
      },
      { new: true }
    );
    if (photo) {
      updatedata.photo.data = fs.readFileSync(photo.path);
      updatedata.photo.contentType = photo.type;
    }
    await updatedata.save();

    res.status(200).send({
      msg: "updated successfully",
      updatedata,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      msg: "error in update profile-superadmin",
    });
  }
};

const getallpaymentdata = async (req, res) => {
  try {
    const paymentdata = await Payment.find({})
      .populate("vendor", "-photo")
      .sort({ createdAt: "-1" });
    res
      .status(200)
      .send({
        success: true,
        msg: "successfully fetched paymentdata",
        count: paymentdata.length,
        paymentdata,
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      msg: "error in allpaymentdata",
    });
  }
};

module.exports = {
  register,
  login,
  add,
  update,
  view,
  remove,
  getphoto,
  getuserbyid,
  updateprofile,
  getallpaymentdata,
};
