const UserModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')
require('dotenv').config()
const JWT_SECRET = process.env.JWT_SECRET; // signature token

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
        const authToken = JWT.sign({data: user[0].id},JWT_SECRET,{expiresIn: '24h'})
        const username = user[0].username;
        // console.log(user[0].username)
        res.json([authToken,username])
    } catch (error) {
     res.status(500).send("Something went wrong!")   
     console.log(error)
    }
}
// exports.loginUser = async(req,res)=>{
//     const {email,password} = req.body;
//     const user = await UserModel.find({email});
//     if(user.length){
//         bcrypt.compare(password, user[0].password, async (err, result)=>{
//             if(err) res.send(err);
//             if(result){
//                 const token = JWT.sign(user[0].id, JWT_SECRET);
//                 res.json({token})
//             }else{
//                 return res.status(400).json({ error: "Wrong Password!" });
//             }
//         })
//     } else {
//         res.status(404).send("User Does not exsist!")
//     }
// }