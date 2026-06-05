const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

const validate = (schema) => {

  return (req,res,next)=>{

    const { error, value } =
      schema.validate(req.body,{
        abortEarly:false,
        stripUnknown:true
      })

    if(error){

      return res.status(400).json({
        success:false,
        type:'validation',
        message:'validation failed',
        errors:error.details.map((err)=> (
          {message:err.message,field:err.path[0]}
        )
        )
      })
    }

    req.body = value

    next()
  }
}


const authMiddleware = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      if (!token) return res.status(401).json({ message: "unAuthorized" });
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
      req.user = await user.findById(decoded.id);
      next();
    } catch (err) {
      res.status(401).json({ message: err.message });
    }
  }
};
module.exports = {authMiddleware,validate}
