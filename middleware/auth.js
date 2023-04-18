import jwt from "jsonwebtoken";

export function verifyToken(req, res, next) {
  const token = req.body.token || req.headers["token"].split(" ")[1];
  if (!token) {
    return res.status(403).send("A token is required ");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded;
    console.log(req.user);
  } catch (err) {
    return res.status(401).send(err);
  }
  return next();
}

export function isSuperAdmin(req, res, next) {
  try {
    if (req.user.role === 0 || req.user.role === 2) {
      return res.send({ message: "you are not a super admin" });
    }
    next();
   
  } catch (err) {
    next(err);
  }
}

export function isGeneralAdmin(req, res, next) {
    try{
        if(req.user.role ===2){
            return res.send({ message: "you are not a  admin" }); 
        }
        else if(req.user.role ===0||req.user.role ===1){
        next()}
        else{
            return res.send({ message: "you are not a  admin" }); 
        }
    }catch(err){
        next(err)
    }
}