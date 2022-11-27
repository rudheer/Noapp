const jwt=require("jsonwebtoken")
const SECRET_KEY="NOAPP"

const auth=(req,res,next)=>{
    try{
        let token = req.headers.authorization;
        if(token){
            token=token.split(" ")[1];
            let user= jwt.verify(token,SECRET_KEY);
            req.userId=user.id;
        }else{
            res.status(400).json({message:"Unauthorized user"});
        }
        next();
    }catch(err){
        console.log(err);
        res.status(400).json({message:"Unauthorized user"});
    }
}

module.exports=auth