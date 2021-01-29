import Users from '../Model/Users.js'
import bcrypt, { hash } from 'bcrypt';


class userControllers {
    // Getting all users
    static getUsers(req,res){
        return res.status(200).json(Users);
    }
    // Creating new users
    static userSignUp(req,res){    
        const id = Users.length;
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
        const findUser = Users.find((user) => user.email===email);
        const userPassword = findUser.password;
        const userEmail = findUser.email;
        if(userPassword && userEmail){
            return res.status(200).json({
                message:'User Logged in Successfully!',
                data:{token:"User token"}
            });
        }else{
            return res.status(404).json({message:"Incorrect email or password"});
        }
    }
}



export default userControllers;