const express = require("express");
const router = express.Router();
const Contact = require ('../models/ContactForm.model.js')
const mongoose = require('mongoose');


//  POST create Contact
router.post('/contact', (req, res, next) => {
    const { email,name,text,title } = req.body; //destructuring
  
    Contact.create({ email,name,text,title })
      .then(response => res.json(response)) 
      .catch(err => res.json(err));
  });
  
  //GET route getting all contacts
  router.get("/contacts", (req,res,next)=>{
     Contact.find()
  
     .then(allContacts=>{
        res.json(allContacts)
     })
     .catch((err)=>{
        console.log(err)
     })
  })
  //Get route individual contact
  router.get("/contacts/:contactId", (req,res,next)=>{
  
  const { contactId } = req.params;
   if (!mongoose.Types.ObjectId.isValid(contactId)) {
     res.status(400).json({ message: 'Specified id is not valid' });
     return; //Error handeling
   }
   Contact.findById(req.params.contactId)
  //  .populate('User') 
   .then(oneUser =>
      res.status(200).json(oneUser))
   .catch((err)=>{
     console.log(err)
  })
  })

router.get("/", (req, res, next) => {
  res.json("All good in here");
});


//DELETE

router.delete('/contacts/:contactId', (req, res, next) => {
   const { contactId } = req.params;
   if (!mongoose.Types.ObjectId.isValid(contactId)) {
     res.status(400).json({ message: 'Specified id is not valid' });
     return;
   }
   Contact.findByIdAndRemove(contactId)
     .then(() => res.json({ message: `Project with ${contactId} is removed successfully.` }))
     .catch(error => res.json(error));
 });
 


module.exports = router;
