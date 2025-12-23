const foodPartnerModel = require("../models/foodpartner.model");
const userModel = require("../models/user.models")
const jwt = require("jsonwebtoken");
require("mongoose");

async function authFoodPartnerMiddleware(req, res, next) {

    const token =req.cookies.token    
    if (!token) {
        return res.status(401).json({
            message: "Please login first",
        });
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const foodPartner = await foodPartnerModel.findById(decoded.id);
        if (!foodPartner) {
            return res.status(401).json({ message: "User not found" });
        }

        req.foodPartner = foodPartner;

        next();
    } 
    catch (error) {

        return res.status(401).json({
            message: "Invalid token or was not able to verify",
        });
    }
}

async function authUserMiddleware(req,res,next) {
    
     const token =req.cookies.token    
    if (!token) {
        return res.status(401).json({
            message: "Please login first",
        });
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const foodPartner = await foodPartnerModel.findById(decoded.id);
        if (!foodPartner) {
            return res.status(401).json({ message: "User not found" });
        }

        req.foodPartner = foodPartner;

        next();
    } 
    catch (error) {

        return res.status(401).json({
            message: "Invalid token or was not able to verify",
        });
    }    
}
module.exports = { authFoodPartnerMiddleware,
    authUserMiddleware
 };
