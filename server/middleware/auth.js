// find userid using jason web token

import jwt from 'jsonwebtoken'

const userAuth= async (req,res,next)=>{
    const {token} = req.headers;

    if(!token){
        return res.json({success: false , message:'Not Authorised Login again'})
    }

    try{
        const tokendecode = jwt.verify(token , process.env.SECRET_KEY)

        if(tokendecode.id){
            req.body.userId = tokendecode.id;
        }else{
            return res.json({success: false , message:'Not Authorized. Login again '})
        }

        // execute the controller function that will return the user credit
        next();
    }
    catch(err){
        res.json({success: false , message: err.message})
    }
}

export default userAuth;