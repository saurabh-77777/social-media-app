import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  
  if(!token){
    return res.status(401).json({message:"Please login first"})
  }
  try{
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    
    if(!decoded){
    return res.status(401).json({message: "Invalid token"})
  }
  req.user = decoded;

  next();

  } catch(error) {
    console.log(error)
  }

}