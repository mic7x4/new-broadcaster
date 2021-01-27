import express from 'express';
import Users from '../Model/Users.js'
import bcrypt, { hash } from 'bcrypt';


const userRoute  = express.Router();

userRoute.get('/users',(req,res) =>{
    res.status(200).json({users: Users});
});


// Create user
userRoute.post('/users',(req,res) => { 
    const id = Users.length + 1;
    const {firstname,lastname,email,phoneNumber,username,password} = req.body;

    bcrypt.hash(password,10, (err,hash) => {
        if(err) return res.status(500).json({err:err});
        const newUser = {id:id+1,firstname,lastname,email,password,phoneNumber,username,isAdmin:false};
        newUser.password = hash;

        const findEmail = Users.find((user) => user.email === email);
        const findUsername = Users.find((user) => user.username === username);
        console.log(findEmail);

        if(findEmail) return res.status(400).json({message:'user with that email exists'});
        if(findUsername) return res.status(400).json({message:'Username already exists'});

        Users.push(newUser);
        return res.status(201).json({Users});
    });
});

// Getting user by ID
userRoute.get('/users/:id',(req,res)=>{
    const foundUser = Users.find(user => user.id === parseInt(req.params.id,10));
    if(!foundUser){
        return res.status(404).json({message:'User with that id is not found'});
    }
    return res.status(200).json({message:'User Found',user:foundUser});
    
});
// Edit user
userRoute.patch('/users/:id',(req,res) => {
    const foundUser = Users.find((user) => user.id === parseInt(req.params.id,0));
    console.log(foundUser);
});
// Delete User
userRoute.delete('/users/:id',(req,res) =>{
    

});


export default userRoute;