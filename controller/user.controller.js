const UserModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')
require('dotenv').config()
const JWT_SECRET = process.env.JWT_SECRET; // signature token
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET; // signature token

exports.registerUser = async(req, res) => {
   const {email,password,username,DOB,Role,location} = req.body;
    try {
        // check if user is already exsist
        let user = await UserModel.find({email})
        if (user.length) {
            return res.status(400).json({error: "Ops! User Already exsists" });
        }
        bcrypt.hash(password,10, async (err,secPass)=>{
            if(err) res.send(err)
            user = new UserModel({email,password:secPass,username,DOB,Role,location})
            await user.save()
            res.send('User Registered!')
        })
    } catch (error) {
        console.log(error)
    }
}

exports.loginUser = async(req,res)=>{
    const {email,password} = req.body;
    try {
        let user = await UserModel.find({email});
        if (!user.length) {
            return res.status(400).json({ error: "Invalid" });
        }
        const comparePass = await bcrypt.compare(password,user[0].password);
        if(!comparePass){
            return res.status(400).json({ error: "Wrong Password!" });
        }
        const payload = user[0].id;
        const token = JWT.sign({data: payload},JWT_SECRET,{expiresIn: '7d'})
        res.cookie('token',token,{
            httpOnly: false
        })
        const refresh_token = JWT.sign({data: payload},JWT_REFRESH_SECRET,{expiresIn: '28d'})
        const username = user[0].username;
        // console.log(user[0].username)
        res.json({token,username,refresh_token})
    } catch (error) {
     res.status(500).send("Something went wrong!")   
     console.log(error)
    }
}

exports.token = async (req,res)=>{
    const {refresh_token} = req.body;
    if(refresh_token){
        JWT.verify(refresh_token, JWT_REFRESH_SECRET, (err,decode)=>{
                if(err){
                    return res.status(401).json({"error": true, "message": "Login required!"})
                }
                const token = JWT.sign({data: decode}, JWT_SECRET, {expiresIn: '7d'});
                res.send({token})
        })
    } else{
        res.status(400).send('Invalid request')
    }
}

exports.login_github = async (req,res)=>{
    
}