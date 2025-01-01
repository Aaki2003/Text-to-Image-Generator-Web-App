import { response } from "express";
import userModel from "../models/userModel.js";
import FormData from 'form-data'
import { createConnection } from "mongoose";
import axios from "axios";


export const generateImage = async (req, res) => {
    try {

        //generate the image using prompt
        const { userId, prompt } = req.body
        const user = await userModel.findById(userId)

        if (!user || !prompt) {
            return res.json({ success: false, message: "Missing Details" })
        }

        if (user.creditBalance === 0 || userModel.creditBalance < 0) {
            return res.json({ success: false, message: "No Credit Balance", creditBalance: user.creditBalance })
        }

        const formData = new FormData()
        formData.append('prompt', prompt)

        const { data } = await axios.post('https://clipdrop-api.co/text-to-image/v1', formData, {
            headers: {
                'x-api-key': process.env.CLIPDROP_API_KEY,
            },
            responseType: 'arraybuffer'
        })

        const base64Image = Buffer.from(data , 'binary').toString('base64')
        const resultImage = `data:image/png;base64,${base64Image}`

        // const blob = new Blob([data], { type: 'image/png' });
        // const resultImage = URL.createObjectURL(blob);



        await userModel.findByIdAndUpdate(user._id, { creditBalance: user.creditBalance - 1 })

        res.json({ success: true, message: "Image generated", creditBalance: user.creditBalance - 1, resultImage })



    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}