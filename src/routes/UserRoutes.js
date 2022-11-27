const express=require("express");
const { signup, signin } = require("../controllers/userControllers");
const UserRoute=express.Router();

UserRoute.post("/signup",signup)

UserRoute.post("/signin",signin)

module.exports=UserRoute;