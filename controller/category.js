const Category = require("../models/category");

const add_category = async (req, res) => {
  try {
    const { category } = req.body;
    const data = await Category.findOne({ category: category });
    if (data) {
      res.status(400).send({
        success: false,
        msg: "This category-allready added",
      });
    } else {
      const catdata = Category.create({
        category: category,
      });
      res.status(200).send({
        success: true,
        msg: `${category}-category successfully added`,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "error in add-category",
      error,
    });
  }
};

const getallcategory = async (req, res) => {
  try {
    const categorydata = await Category.find({});
    res.status(200).send({
      success: true,
      count: categorydata.length,
      msg: "view all categories",
      categorydata,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "error in viewall-category",
      error,
    });
  }
};



const updatecategory = async (req, res) => {
  try {
    
    const { id } = req.params;
    
    const { category } = req.body;
    const updatedata = await Category.findByIdAndUpdate(
      id,
      {
        category: category,
      },
      { new: true }
    );
    
    res.status(200).send({
      success: true,
      msg: "update category successfull",
      updatedata,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "error in update-category",
      error,
    });
  }
};


const deletecategory = async(req,res)=>{
  try {
    const { id } = req.params;
    console.log(id);
    const deletedata = await Category.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      msg: "delete category successfull",
      
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "error in delete-category",
      error,
    });
  }
}


const allcategoryforadmin = async(req,res)=>{
  try {
    const categorydata = await Category.find({});
    res.status(200).send({
      success:true,
      msg:"all category fetched successfully",
      categorydata
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "error in allcategoryforadmin",
      error,
    });
  }
}
module.exports = { add_category, updatecategory, getallcategory,deletecategory,allcategoryforadmin };
