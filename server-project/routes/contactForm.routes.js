const express = require("express");
const router = express.Router();
const Contact = '../models/ContactForm.model.js'


//  POST /api/projects  -  Creates a new project
router.post('/contact', (req, res, next) => {
    const { email,name,text } = req.body; //destructuring
    //we creating a project - mongoose method
    Contact.create({ email,name,text })
      .then(response => res.json(response)) //we sending back json object - response
      .catch(err => res.json(err));
  });
  //GET route getting all projects, we sending entire object as res.json(allProjects)
  router.get("/contacts", (req,res,next)=>{
     Contact.find()
     .populate('user')
     .then(allContacts=>{
        res.json(allContacts)
     })
     .catch((err)=>{
        console.log(err)
     })
  })
  //Get route individual project
  router.get("/contacts/:contactId", (req,res,next)=>{
  //  console.log(req.params.contactId)
  const { contactId } = req.params;
   if (!mongoose.Types.ObjectId.isValid(contactId)) {
     res.status(400).json({ message: 'Specified id is not valid' });
     return; //way of handaling err that checks the valid specific id using 400 http err
   }
   Contact.findById(req.params.contactId)//project stored in req.params.projectId
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
