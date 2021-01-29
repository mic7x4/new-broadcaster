import express from 'express';
import userControllers from '../controllers/userControllers.js';


const userRoute  = express.Router();
// Getting all Users
userRoute.get('/users',userControllers.getUsers);
// User can signup
userRoute.post('/users',userControllers.userSignUp);
// Getting user by ID
userRoute.get('/users/:id',userControllers.singleUser);
// User can Login
userRoute.post('/signin',userControllers.userSignIn)


export default userRoute;