const Product = require("../models/product");
const moment = require("moment");
const singleday = async (req, res) => {
  try {
    const { date } = req.body;

    // const finddatedata = await Product.find({ date: date });

    const result = await Product.find({
      $and: [{ vendor: req.params.id }, { date: date }],
    })
      .populate("user")
      .select("-photo");
    res.status(200).send({
      success: true,
      msg: "select date total successfully fetched",
      count: result.length,
      result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "error in day-total",
      error,
    });
  }
};
const monthreport = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;
    const monthdata = await Product.find({
      $and: [
        { vendor: req.params.id },
        { date: { $gte: startDate, $lte: endDate } },
      ],
    })
      .populate("user")
      .select("-photo");
    res.status(200).send({
      success: true,
      msg: "month report successfully feched",
      count: monthdata.length,
      monthdata,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "error in day-total",
      error,
    });
  }
};

const yearreport = async (req, res) => {
  try {
    const { year } = req.body;
    const yeardata = await Product.find({
      $and: [
        { vendor: req.params.id },
        { date: new RegExp(".*" + year + ".*") },
      ],
    })
      .populate("user")
      .select("-photo");

    const yearmap = yeardata.map((data) => {
      return data.total;
    });

    const yeartotal = yearmap.reduceRight((total, all) => {
      return total + all;
    });

    res.status(200).send({
      success: true,
      msg: "year report successfully feched",
      count: yeardata.length,
      yeardata,
      yeartotal,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "error in day-total",
      error,
    });
  }
};

const monthuserreport = async (req, res) => {
  try {
    const { startDate, endDate, user } = req.body;
    const monthdata = await Product.find({
      $and: [{ user: user }, { date: { $gte: startDate, $lte: endDate } }],
    })
      .populate("user")
      .select("-photo");
    if (monthdata.length) {
      const mtotal = monthdata.map((data) => {
        return data.total;
      });

      const monthtotal = mtotal.reduceRight((total, all) => {
        return total + all;
      });
      res.status(200).send({
        success: true,
        msg: "month report feched successfully",
        count:monthdata.length,
        monthdata,
        monthtotal,
        
      });
    } else {
      ("no record found");
    }
    
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "error in monthuserreport",
      error,
    });
  }
};
module.exports = { singleday, monthreport, yearreport, monthuserreport };
