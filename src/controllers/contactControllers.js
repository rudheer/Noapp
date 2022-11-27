const contactModel=require("../models/Contact")

const createContact=async(req,res)=>{
    try{
        upload(storageEngine(outputFolder)).single("file");
        const {name,phone,email,linkdln}=req.body;
        req.body.user = req.user._id;
        req.body.filePath = "contact/" + req.file.filename;

        const contact= new contactModel(req.body);
        await contact.save();
        res.status(200).json(contact);
    }catch(err){
        console.log(err);
        res.status(500).json({message:"something went wrong"});
    }
}

const getContact=async(req,res)=>{
    try{
        const contacts=await contactModel.find({userId:req.userId});
        res.status(200).json(notes);
    }catch(err){
        console.log(err);
        res.status(500).json({message:"something went wrong"});
    }
}

module.exports={createContact,getContact}