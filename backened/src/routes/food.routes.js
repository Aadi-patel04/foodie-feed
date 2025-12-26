const express = require('express');
const foodControler = require("../controllers/food.controller")
const authFoodPartnerMiddleware = require("../middlewares/auth.middleware")
const multer = require("multer")

const router = express.Router();

const upload = multer({
    Storage:multer.memoryStorage})

/*POST /api/food [protected]--- as only food partner can add the items */

router.post('/',authFoodPartnerMiddleware.authFoodPartnerMiddleware,
    upload.single("video"),
foodControler.createFood)

router.get("/",
    authFoodPartnerMiddleware.authUserMiddleware,
    foodControler.getFoodItems
)

/*GET /api/food/food-partner/:id */


module.exports = router;