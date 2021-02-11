import Users from '../Model/Users.js'
import bcrypt, { hash } from 'bcrypt';
import helper from '../helper/helper.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

class userControllers {
    // Getting all users
    static getUsers(req,res){
        return res.status(200).json({users:Users});
    }
    // Creating new users
    static userSignUp(req,res){    
        const id = Users.length+1;
        const {firstname,lastname,email,phoneNumber,username,password} = req.body;
        const newUser = {id,firstname,lastname,email,password,phoneNumber,username,isAdmin:false}
        newUser.password = bcrypt.hashSync(newUser.password,10); 
        const findEmail = Users.find((user) => user.email === email);
        const findUsername = Users.find((user) => user.username === username);
        if(findEmail) return res.status(400).json({message:'user with that email exists'});
        if(findUsername) return res.status(400).json({message:'Username already exists'});
        const userToken = jwt.sign(newUser,JWT_SECRET,{expiresIn:'24h'});
        Users.push(newUser);
        res.status(201).json({message:'User Created Successfully',
        data:{
            token:userToken,
            newUser
        }})
   
    }
    // Getting a Single user
    static singleUser(req,res) { 
        const foundUser = Users.find(user => user.id === parseInt(req.params.id,10));
        if(!foundUser){
            return res.status(404).json({message:'User with that id is not found'});
        }
        return res.status(200).json({message:'User Found',user:foundUser});
    }
    // User signin
    static userSignIn(req,res){ 
        const {email,password} = req.body;
        const findUser = Users.find((user) => user.email === email);
        const userEmail = findUser.email;
        const userPassword =  findUser.password;
        const compare = bcrypt.compareSync(password,userPassword);
        const userToken = jwt.sign(findUser,JWT_SECRET);
        if(compare && userEmail){
            return res.status(200).json({
                message:'User Loggin successfully',
                token:userToken
            })
            

        }else{
            console.log('Incorrect email or password');
        }
    }
}



export default userControllers;