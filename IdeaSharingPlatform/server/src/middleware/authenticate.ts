import { NextFunction,Response,Request } from "express";
import jwt from "jsonwebtoken"

declare global {
    namespace Express {
      interface Request {
        authUser?: any; // or specify the type of user if known
      }
    }
  }

export const authenticated = (req:Request,res:Response,next:NextFunction) =>
{
   try {
    const token = req.headers.authorization;
    if(!token)
    {
        res.json({
            msg:"Please provide token"
        })
    }

    const decoded = jwt.verify(token || "",process.env.JWT_SECRET ||"");
    if(!decoded)
    {
        res.json({
            msg:'Invalid Token'
        })
    }
    req.authUser = decoded; 
    
    next()
   } catch (error) {
    res.json({
        msg:'Something unexpected happen'+ error
    })
   }
    
}