const foodPartnerModel = require("../models/foodpartner.model")
const jwt = require("jsonwebtoken");
require('mongoose')

async function authFoodPartnerMiddleware(req, res, next) {

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Please login first"
        })
    }

    try {

        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        const foodPartner = await foodPartnerModel.findById(decoded.id);

        req.foodPartner = foodPartner;
        console.log("Moiddleware raeched")
        next()
    }
    catch (error) {
        return res.status(401).json({
            message: "Invalid token"
        })
    }
}

module.exports = {authFoodPartnerMiddleware}