const Product = require("../models/product");
const moment = require("moment");

const addproduct = async (req, res) => {
  try {
    // var date = moment();

    var { date, name, description, price, user, category, quantity, total } =
      req.body;

    const productdata = await Product.create({
      name: name,
      description: description,
      price: price,
      user: user,
      vendor: req.params.id,
      category: category,
      quantity: quantity,
      date: date,
      total: total,
    });
    res.status(200).send({
      success: true,
      msg: `${name} product successfully added`,
      productdata,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "error in add-product",
      error,
    });
  }
};

const getallproducts = async (req, res) => {
  try {
    const productdata = await Product.find({})
      .populate("user")
      .select("-photo");
    res.status(200).send({
      success: true,
      msg: "view all products",
      count: productdata.length,
      productdata,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "error in view-all-product",
      error,
    });
  }
};

const updateproduct = async (req, res) => {
  try {
    var date = moment();

    const { id } = req.params;
    var { date, name, description, price, user, category, quantity, total } =
      req.body;

    const data = await Product.findByIdAndUpdate(
      id,
      {
        name: name,
        description: description,
        price: price,
        category: category,
        user: user,
        quantity: quantity,
        date: date,
        total: total,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      msg: `${name} product updated successfully`,
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "error in update-product",
      error,
    });
  }
};

const vendorwiseproducts = async (req, res) => {
  try {
    const vendorproduct = await Product.findById(req.params.id)
      .populate("vendor")
      .select("-photo");
    res.status(200).send({
      success: true,
      msg: "vendor wise product fetched successfully",
      vendorproduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "error in vendorwiseproduct",
      error,
    });
  }
};

const singleproduct = async (req, res) => {
  try {
    const { id } = req.params;

    const productdata = await Product.findOne({ _id: id })
      .populate("user")
      .populate("category")
      .select("-photo");

    res.status(200).send({
      success: true,
      msg: "singleproduct",
      productdata,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "error in singleproduct",
      error,
    });
  }
};

const deleteproduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteproduct = await Product.findByIdAndDelete({ _id: id });
    res.status(200).send({
      success: true,
      msg: "delete-product successfull",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "error in deleteproduct",
      error,
    });
  }
};

const daytotal = async (req, res) => {
  try {
    const { date } = req.body;

    const todaydata = await Product.find({
      date: date,
    });

    const dd = todaydata.map((data) => {
      return data.total;
    });
    const todaytotal = dd.reduceRight((total, all) => {
      return all + total;
    });

    if (todaydata.length) {
      res.status(200).send({
        success: true,
        msg: "today total successfully feched",
        todaytotal,
      });
    } else {
      ("no record found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "error in day-total",
      error,
    });
  }
};

const monthtotal = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;

    const curmonthdata = await Product.find({
      date: { $gte: startDate, $lte: endDate },
    });
    const monthtotalmap = curmonthdata.map((data) => {
      return data.total;
    });

    const curmonthtotal = monthtotalmap.reduceRight((total, all) => {
      return total + all;
    });

    res.status(200).send({
      success: true,
      msg: "current month total feched successfull",
      curmonthtotal,
      startDate,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "error in month-total",
      error,
    });
  }
};

const dashboarddaytotal = async (req, res) => {
  try {
    const date = moment().format("DD-MM-YYYY");

    const todaydata = await Product.find({
      date: date,
    });
    if (todaydata.length) {
      const dd = todaydata.map((data) => {
        return data.total;
      });
      const todaytotal =await dd.reduceRight((total, all) => {
        return all + total;
      });

      res.status(200).send({
        success: true,
        msg: "today total successfully fetched",
        todaytotal,
      });
    } else {
      ("no record found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "error in day-total",
      error,
    });
  }
};

const dashboadmonthtotal = async (req, res) => {
  try {
    const startMonth = moment().clone().startOf("month").format("DD-MM-YYYY");
    const endMonth = moment().clone().endOf("month").format("DD-MM-YYYY");

    const monthdata = await Product.find({
      date: { $gte: startMonth, $lte: endMonth },
    });
    if (monthdata.length) {
      const mtotal = monthdata.map((data) => {
        return data.total;
      });

      const monthtotal = mtotal.reduceRight((total, all) => {
        return total + all;
      });
      res.status(200).send({
        success: true,
        msg: "month total feched successfully",
        monthtotal,
        startMonth,
      });
    } else {
      ("no record found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "error in month-total",
      error,
    });
  }
};

const dashboadyeartotal = async (req, res) => {
  try {
    const startyear = moment().startOf("year").year();
    const yeardata = await Product.find({
      date: new RegExp(".*" + startyear + ".*"),
    });

    if (yeardata.length) {
      const yearmap = yeardata.map((data) => {
        return data.total;
      });

      const yeartotal = yearmap.reduceRight((total, all) => {
        return total + all;
      });
      res.status(200).send({
        success: true,
        msg: "year-total fetched successfully",
        startyear,
        yeartotal,
      });
    } else {
      ("no record found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "error in month-total",
      error,
    });
  }
};

const productcount = async (req, res) => {
  try {
    const perPage = 6;
    const counts = await Product.find().estimatedDocumentCount();
    const totalPage = Math.ceil(counts / perPage);
    res.status(200).send({
      success: true,
      counts,
      totalPage,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "error in product-count",
      error,
    });
  }
};

const perpageproduct = async (req, res) => {
  try {
    const perPage = 8;
    const page = req.params.page ? req.params.page : 1;

    const productdata = await Product.find({ vendor: req.params.id })
      .populate("user")
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: 1 });

    res.status(200).send({
      success: true,
      msg: "pagination",
      count: productdata.length,
      productdata,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "error in perpage-product",
      error,
    });
  }
};

const searchdata = async (req, res) => {
  try {
    const keyword = req.params.keyword ? req.params.keyword : undefined;

    if (keyword) {
      const result = await Product.find({
        $or: [{ name: { $regex: keyword, $options: "i" } }],
      }).populate("user");
      res.send({
        success: true,
        result,
      });
    } else {
      res.send("not found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "error in searchdata",
      error,
    });
  }
};

module.exports = {
  addproduct,
  getallproducts,
  updateproduct,
  singleproduct,
  deleteproduct,
  daytotal,
  monthtotal,
  dashboarddaytotal,
  dashboadmonthtotal,
  dashboadyeartotal,
  productcount,
  perpageproduct,
  vendorwiseproducts,
  searchdata,
};
