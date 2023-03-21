const express = require("express");
const router = express.Router();
const Product = '../models/ContactForm.model.js'


//  POST /api/projects  -  Creates a new product
router.post('/product', (req, res, next) => {
    const { brand, nameOfProduct, categoryOfProduct, image,price,size, quantity, RelatedProducts, ProductDetails, } = req.body; //destructuring
    //we creating a project - mongoose method
    Product.create({ email,name,text })
      .then(response => res.json(response)) //we sending back json object - response
      .catch(err => res.json(err));
  });
  //GET route getting all projects, we sending entire object as res.json(allProjects)
  router.get("/products", (req,res,next)=>{
     Product.find()
     .populate('user')
     .then(allContacts=>{
        res.json(allContacts)
     })
     .catch((err)=>{
        console.log(err)
     })
  })
  //Get route individual project
  router.get("/products/:productId", (req,res,next)=>{
  //  console.log(req.params.contactId)
  const { productId } = req.params;
   if (!mongoose.Types.ObjectId.isValid(productId)) {
     res.status(400).json({ message: 'Specified id is not valid' });
     return; //way of handaling err that checks the valid specific id using 400 http err
   }
   Product.findById(req.params.productId)//project stored in req.params.projectId
   .populate('User') //we populate here too as we want to see the entire task in ralation to project not just id of it
   .then(oneUser =>
      res.status(200).json(oneUser))
   .catch((err)=>{
     console.log(err)
  })
  })

router.get("/", (req, res, next) => {
  res.json("All good in here");
});


module.exports = router;
