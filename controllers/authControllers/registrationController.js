const mailsend = require("../../helpers/mailSend");
const otpGen = require("../../helpers/optGen");
const User = require("../../models/userSchema");
const argon = require('argon2');

async function registration(req, res) {
    
    try {
        const { email, password, username } = req.body; 
        const hash = await argon.hash(password);
        const otp = otpGen(6);
        
        const user = new User({
            email,
            password: hash,
            username ,
            otp
        })
        
        await user.save();

        await mailsend(email, "Email verification", `Hello ${username}, your otp is <b>${otp}</b>`);

        // remove otp from database
        setTimeout(async () => {
            await User.findOneAndUpdate({ email }, { otp: null });
        }, 60000 * 5);
    
        res.status(201).send({
            success: true,
            message: "user registered successfully",
            data: user
        });
    
    } catch (error) {
        res.status(400).send({
            success: false,
            message: error.message || "user registration failed"  
        });
    }
}



module.exports = registration;