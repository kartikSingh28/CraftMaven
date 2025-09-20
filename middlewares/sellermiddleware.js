const jwt=require("jsonwebtoken");

const {JWT_SELLER_PASSWORD}=require("../config.js");

function sellerMiddleWare(req,res,next){
    const token=req.headers.token;

    if(!token){
        return res.status(401).json({
            message:"Authorization denied"
        });
    }

    try{
        const decoded=jwt.verify(token,JWT_SELLER_PASSWORD);

        req.userId=decoded.id;
        next();
    }catch(err){
        return res.status(403).json({
            message:"Invalid token"
        })
    }
}

module.exports(sellerMiddleWare);