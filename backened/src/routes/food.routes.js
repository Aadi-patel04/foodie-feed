const express = require('express')
const foodControler = require("../controllers/food.controller")
const authFoodPartnerMiddleware = require("../middlewares/auth.middleware")

const router = express.Router();


/*POST /api/food [protected]--- as only food partner can add the items */

router.post('/',authFoodPartnerMiddleware.authFoodPartnerMiddleware,foodControler.createFood)



module.exports = router;