"use strict"

const express = require("express")
const app = express()
const port = 3000
const cors = require("cors")
const Controllers = require("./controllers/controllers.js")
const Access = require("./middlewares/access.js")

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

app.post("/register",Controllers.register)
app.post("/login",Controllers.login)
app.post("/foods",Access.Authenticate,Controllers.post)
app.get("/foods",Access.Authenticate,Controllers.get)
app.delete("/foods/:id",Access.Authenticate,Access.Authorize,Controllers.delete)


app.listen(port,()=>console.log(`Foods listening at port:${port}`))