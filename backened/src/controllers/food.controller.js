const foodModel = require("../models/food.model");
const storageService = require("../services/storage.service")
const likesModel = require("../models/likes.model")
const saveModel = require("../models/save.model");
const { v4: uuid } = require('uuid')


async function createFood(req, res) {

    const fileUploadResult = await storageService.uploadFile(req.file.buffer, uuid())
    console.log(fileUploadResult)

    const foodItem = await foodModel.create({
        name: req.body.name,
        description: req.body.description,
        video: fileUploadResult.url,
        foodPartner: req.foodPartner._id
    })
    res.status(201).json({
        message: "food created successfully",
        food: foodItem
    })
}

async function getFoodItems(req, res) {
    const foodItems = await foodModel.find({})
    res.status(200).json({
        message: "Food Item Fetch successfully",
        foodItems: foodItems
    })
}


async function likeFood(requq, res) {
    const { foodId } = req.body;

    const user = req.user;

    const isAlreadyLiked = await likesModel.findOne({
        user: user._id,
        food: foodId
    })

    if (isAlreadyLiked) {
        await likesModel.deleteOne({
            user: user._id,
            food: foodId
        })

        await foodModel.findByIdAndUpdate(foodId, {
            $inc: { likesCount: -1 }
        })

        return res.status(200).json({
            message: "Food unliked successfully",
        })
    }


    const like = await likesModel.create({
        user: user._id,
        food: foodId
    })

    await foodModel.findByIdAndUpdate(foodId, {
        $inc: { likesCount: 1 }
    })

    res.status(200).json({
        message: "Food liked successfully",
        like: like
    })


}

async function saveFood(req, res) {
    // Implementation for saving food goes here
    const { foodId } = req.body;

    const user = req.user;  

    const isAlreadySaved = await saveModel.findOne({
        user: user._id,
        food: foodId
    })
    if (isAlreadySaved) {
        await saveModel.deleteOne({
            user: user._id,
            food: foodId
        })  

        return res.status(200).json({
            message: "Food unsaved successfully",
        })
    }   

    const save = await saveModel.create({
        user: user._id,
        food: foodId
    })
    res.status(200).json({
        message: "Food saved successfully",
        save: save
    })

}



module.exports = {
    createFood,
    getFoodItems,
    likeFood,
    saveFood
}