const express = require("express");
const router = express.Router();

const { getProductById, createProduct, getProduct, photo, 
        deleteProduct, updateProduct, getAllProduct, getAllUniqueCategories } = require("../controllers/product");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

//all of params
router.param("userId", getUserById);
router.param("productId", getProductById);

//all of actual routes

// Body 
// form-data 
// name -  I write code Ts
// description  - A classic Tshirt
// price - 10$
// category - categoryid as saved in model file so put an id of summer
// stock - 27
// photo - file


// Remove Content-Type - application/json in Header

router.post(
  "/product/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createProduct
);

// read routes
router.get("/product/:productId",getProduct);
router.get("/product/photo/:productId",photo);

// delete route
router.delete("/product/:productId/:userId",isSignedIn,isAuthenticated,isAdmin,deleteProduct);

// update route
router.put("/product/:productId/:userId",isSignedIn,isAuthenticated,isAdmin,updateProduct);

//list all route
router.get("/products",getAllProduct);

router.get("/products/categories",getAllUniqueCategories);

module.exports = router;
