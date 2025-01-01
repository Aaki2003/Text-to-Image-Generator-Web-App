import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import razorpay from 'razorpay';
import transactionModel from "../models/transactionModel.js";

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.json({ status: false, message: 'Missing details' });
        }

        //encrypt the password
        const salt = await bcrypt.genSalt(10)
        const hashedpassword = await bcrypt.hash(password, salt) // we will get the hashed password

        // storing the hashed password in database
        const userData = {
            name, email, password: hashedpassword
        }

        const newuser = new userModel(userData)
        const user = await newuser.save()

        // genertae the token that will be sent in response
        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY)
        res.json({ success: true, token, user: { name: user.name } })

    } catch (e) {
        console.log(e)
        res.json({ success: false, message: e.message })
    }
}

// userlogin controller function

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        //find user using email id
        const user = await userModel.findOne({ email })

        if (!user) {
            return res.json({ status: false, message: 'User does not exist' });
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY)
            res.json({ success: true, token, user: { name: user.name } })
        } else {
            return res.json({ status: false, message: 'Invalid Credentials' });
        }
    } catch (e) {
        console.log(e)
        res.json({ success: false, message: e.message })
    }
}

// user credits
const userCredits = async (req, res) => {
    try {
        const { userId } = req.body
        // we will privide user id using middleware
        const user = await userModel.findById(userId)
        res.json({ success: true, credits: user.creditBalance, user: { name: user.name } })
    } catch (e) {
        console.log(e)
        res.json({ success: false, message: e.message })
    }
}

const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET_KEY,

})

const paymentRazpay = async (req, res) => {
    try {
        const { userId, planId } = req.body

        if (!userId || !planId) {
            res.json({ success: false, message: "missng details" })
        }

        let credits, plan, amount, date

        switch (planId) {
            case "Basic":
                plan = 'Basic'
                credits = 100
                amount = 10
                break;
            case "Advanced":
                plan = 'Advanced'
                credits = 500
                amount = 50
                break;

            case "Business":
                plan = 'Business'
                credits = 5000
                amount = 250
                break;

            default:
                return res.json({ success: false, message: "plan not found" })
        }

        date = Date.now()

        const transactionData = {
            userId, plan, amount, credits, date
        }

        const newTransaction = await transactionModel.create(transactionData)

        // whenever a transaction is created and stored in mongodb database a unique id is generated 

        // for razorpay transaction code starts from here

        const options = {
            amount: amount * 100, //to remove the decimal point introduced by razorpay in amount
            currency: process.env.CURRENCY,
            receipt: newTransaction._id
        }

        await razorpayInstance.orders.create(options, (err, order) => {
            if (err) {
                console.log(err)
                res.json({ success: false, message: err.message })
            }
            res.json({ success: true, order })
        })
    }
    catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


const verifyRazorpay = async (req, res) => {
    try {

        const { razorpay_order_id } = req.body;

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
        // from this order info we have to check the status of the order

        if (orderInfo.status === 'paid') {
            // find the transaction data for this order
            const transactionData = await transactionModel.findById(orderInfo.receipt)

            // if transaction data is already verified then the payment will be true for that . it means that our transaction has failed

            if (transactionData.payment) {
                return res.json({ success: false, message: 'Payment Failed' })
            }

            // remember transactionData._id is different and transactionData.userId is different
            const userData = await userModel.findById(transactionData.userId)

            const creditBalance = userData.creditBalance + transactionData.credits

            await userModel.findByIdAndUpdate(userData._id, { creditBalance })

            // set the payment status as true
            await transactionModel.findByIdAndUpdate(transactionData._id, { payment: true })

            res.json({ success: true, message: 'Credits added' })
        }
        else {
            res.json({ success: false, message: 'Payment Failed' })
        }


    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

export { registerUser, loginUser, userCredits, paymentRazpay, verifyRazorpay }