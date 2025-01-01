import express from 'express';
import { registerUser, loginUser, userCredits, paymentRazpay, verifyRazorpay } from '../controller/userController.js';
import userAuth from '../middleware/auth.js';

//creatin a router

const userRouter = express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/credits', userAuth, userCredits)

// userAuth will add the userid using token or convert the token into userId
userRouter.post('/pay-razor', userAuth, paymentRazpay)

userRouter.post('/verify', verifyRazorpay)


export default userRouter;

// http://localhost:4000/api/user/register
// http://localhost:4000/api/user/login