"use strict"

const {User,Food} = require("../models/index.js")
const jwt = require("jsonwebtoken")

class Access {
    static async Authenticate(req,res,next) {
        try {
            let credential = jwt.verify(req.headers.access_token,"123456")
            const user = await User.findOne({where:{email:credential.email}})
            if (user) {
                req.access_id = credential.id
                next()
            } else throw new Error 
        } catch (error) {
            res.status(400).json({
                "message":"Invalid Token"
            }) //did not next error because more practical this way in LC
        }
    }

    static async Authorize(req,res,next) {
        try {
            let food = await Food.findByPk(req.params.id)
            if (food.UserId === req.access_id) {
                next()
            } else throw new Error //wrong food user
        } catch (error) {
            res.status(401).json({
                "message":"Unauthorized access"
            })
        }
    }
}

module.exports = Access