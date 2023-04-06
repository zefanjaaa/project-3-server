const express = require("express");
const router = express.Router();
const Product = require ("../models/Products.model")
const mongoose = require('mongoose');
const User = require('../models/User.model')
const fileUploader = require("../config/cloudinary.config")


//UPLOAD IMAGE TO CLOUDINARY ROUTE "/product/upload"

router.post('/upload', fileUploader.single('image'), (req, res, next) => {
  console.log('The file that is being uploaded ==>', req.file)
  
  if (!req.file) {
    next(new Error('NO FILE BEING UPLOADED'))
    return
  }
  res.json({fileUrl:req.file.path})
})

//Route to add a product to your wishlist

router.post('/product/:userId/wishlist', (req, res, next) => {

  const { userId } = req.params
  const {productId} = req.body

  User.findById(userId)
   
    .then(user => {
      if (!user) {
      return res.status(404).json({error:"user does not excist"})
      }
      console.log(user)
      user.wishlist.push(productId)
      user.save()
        .then((user) => { res.json(user) })
      
      .catch((err) => res.status(404).json({error:err.message}))
    })
    .catch((err) => res.status(404).json({error:err.message}))
  

})

//route to retrieve your wishlist from the backend

router.get('/auth/:UserId/wishlist', (req, res, next) => {
  const { userId } = req.params
  
  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({error:"user does not excist"})
      } else {
        res.json(user.wishlist)
    }
    })
  .catch((err) => res.status(404).json({error:err.message}))
})


//  POST Create new product

router.post('/product', (req, res, next) => {
    const { brand, nameOfProduct, categoryOfProduct, image,price,size, quantity, RelatedProducts, ProductDetails } = req.body; //destructuring
   
    Product.create({ brand, nameOfProduct, categoryOfProduct, image,price,size, quantity, RelatedProducts, ProductDetails })
      .then(response => res.json(response)) 
      .catch(err => res.json(err));
  });


 //GET route for all the products
  router.get("/products", (req,res,next)=>{
     Product.find()
     
     .then(allProducts=>{
        res.json(allProducts)
     })
     .catch((err)=>{
        console.log(err)
     })
  })

 
  
//GET route for one product
  router.get("/products/:productId", (req,res,next)=>{
  
  const { productId } = req.params;
   if (!mongoose.Types.ObjectId.isValid(productId)) {
     res.status(400).json({ message: 'Specified id is not valid' });
     return; //error handeling
   }
   Product.findById(req.params.productId)
   // .populate('User') 
   .then(oneProduct =>
      res.status(200).json(oneProduct))
   .catch((err)=>{
     console.log(err)
  })
  })

router.get("/", (req, res, next) => {
  res.json("All good in here");
});


module.exports = router;
