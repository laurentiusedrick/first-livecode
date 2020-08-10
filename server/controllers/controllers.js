"use strict"

const {User,Food} = require("../models/index.js")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

class Controllers {
    //user controllers start here
    static async register(req,res) {
        try {
            let {email,password} = req.body
            const result = await User.create({email,password})
            res.status(201).json({
                "id":result.id,
                "email":result.email
            })
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    }
    static async login(req,res) {
        try {
            let {email,password} = req.body
            let user = await User.findOne({
                where:{
                    email
                }
            })
            if (user) {
                if (bcrypt.compareSync(password,user.password)) {
                    let access_token = jwt.sign({
                        id:user.id,
                        email:user.email,
                    },'123456')
                    res.status(200).json({
                        access_token
                    })
                }
                else throw new Error //password error
            } else {
                throw new Error //email error
            }
        } catch (error) {
            console.log(error)
            res.status(400).json({
                "message":"Wrong email/password combination"
            })
        }
    }
    //user controllers ends here

    //foods controllers start here
    static async post(req,res) {
        try {
            let form = {
                title:req.body.title,
                price:req.body.price,
                ingredients:req.body.ingredients,
                tag:req.body.tag,
                UserId:req.access_id
            }
            const result = await Food.create(form)
            res.status(201).json({
                id:result.id,
                price:result.price,
                ingredients:result.ingredients,
                tag:result.tag,
                UserId:result.UserId,
            })
        } catch (error) {
            console.log(error)
            res.status(400).json(error)
        }
    }
    static async get(req,res) {
        
    }
    static async delete(req,res) {
        
    }
    //foods controllers ends here
}

module.exports = Controllers