const jwt=require("jsonwebtoken");

const {JWT_BUYER_PASSWORD}=require("../config.js");

function buyerMiddleware(req,res,next){
    const token=req.headers.token;
    if(!token){
        return res.status(401).json({
            message:"Authorization Denied"
        });
    }

    try{
        const decoded=jwt.verify(token,JWT_BUYER_PASSWORD);
        req.userId=decoded.id;
        next();
    }catch(err){
        return res.status(403).json({
            message:"Invalid or expired token"
        });
    }

}
module.exports={buyerMiddleware};