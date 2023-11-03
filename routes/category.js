const express = require('express');
const categoryrouter = express.Router();
const { issignIn, isSuperAdmin,isAdmin } = require("../middleware/auth");
const {add_category,updatecategory,getallcategory,deletecategory,allcategoryforadmin} = require("../controller/category");

categoryrouter.post('/add-category',issignIn,isSuperAdmin,add_category)

categoryrouter.get('/view-allcategory',issignIn,isSuperAdmin,getallcategory)

categoryrouter.get('/view-allcategoryforadmin',issignIn,isAdmin,allcategoryforadmin)

categoryrouter.post('/update-category/:id',issignIn,isSuperAdmin,updatecategory)

categoryrouter.delete('/delete-category/:id',issignIn,isSuperAdmin,deletecategory)

module.exports= categoryrouter;
