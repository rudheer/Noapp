const express=require('express')
const UserModel=require("../models/User")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const SECRET_KEY="NOAPP"

const signup=async(req,res)=>{
    const {username,email,password}=req.body;
    try{
        const existingUser=await UserModel.findOne({email:email});
        if(existingUser){
            return res.status(400).json({message:"user already exists"})
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const result=await UserModel.create({
            email:email,
            password:password,
            username:username
        })
        const token=jwt.sign({email:result.email,id:result._id},SECRET_KEY)
        res.status(200).json({user:result,token:token})
    }catch(err){
        console.log(err);
        res.status(500).json({message:"someting went wrong"});
    }
}

const signin=async(req,res)=>{
    const {email,password}=req.body;
    try{
        const existingUser=await UserModel.findOne({email:email});
        if(!existingUser){
            return res.status(404).json({message:"user not found"})
        }
        //console.log(password,existingUser.password);
        
        if(password!=existingUser.password){
            return res.status(400).json({message:"Invalid credentials"})
        }
        const token=jwt.sign({email:existingUser.email,id:existingUser._id},SECRET_KEY);
        res.status(201).json({user:existingUser,token:token});
    }catch(err){
        console.log(err);
        res.status(500).json({message:"someting went wrong"});
    }
}

module.exports={signup, signin}