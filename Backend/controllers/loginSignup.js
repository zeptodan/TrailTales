import User from "../models/User.js"
import bcrypt from "bcryptjs"

async function login(req,res){
    const username = req.body.username
    const password = req.body.password
    if (!username){
        res.status(400).json({msg: "No username"})
    }
    if (!password){
        res.status(400).json({msg: "No password"})
    }
    try {
        const user = await User.findOne({username: username})
        if(!user){
            return res.status(400).json({msg: "Username does not exist"})
        }
        if (!(await bcrypt.compare(password,user.password))){
            return res.status(401).json({msg: "Incorrect password"})
        }
        const token = user.createJWT()
        res.cookie("token",token,{httpOnly: true,sameSite: "none",expiresIn:"30d"})
        return res.status(200).json({msg: "User logged in"})
    } catch (error) {
        console.log(error)
        return res.status(400).json({msg: "Error logging in"})
    }
}
async function signup(req,res){
    const username = req.body.username
    const password = req.body.password
    if (!username){
        res.status(400).json({msg: "No username"})
    }
    if (!password){
        res.status(400).json({msg: "No password"})
    }
    try {
        await User.create({username, password})
    } catch (error) {
        console.log(error)
        return res.status(400).json({msg: "Error creating user"})
    }
    return res.status(200).json({msg: "User created"})
}
async function logout(req,res){
    res.clearCookie("token",{httpOnly: true,sameSite: "none",expiresIn:"30d"})
    return res.status(200).json({msg: "User logged out"})
}
async function auth(req,res){
    return res.status(200).json(req.user)
}
export {login,signup, logout,auth}
