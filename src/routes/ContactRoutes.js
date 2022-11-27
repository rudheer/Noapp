const express=require("express");
const { createContact, getContact } = require("../controllers/contactControllers");
const auth =require("../middleware/auth")
const ContactRoute=express.Router();

ContactRoute.post("/createcontact",auth,createContact);
ContactRoute.get("/contacts",auth,getContact);

module.exports=ContactRoute;