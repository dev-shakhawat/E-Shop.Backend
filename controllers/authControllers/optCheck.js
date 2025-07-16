const userSchema = require("../../models/userSchema");

function otpCheck(req, res) {

    try {
        const { email, otp } = req.body; 
        userSchema.findOne({ email }).then((user) => {
            if (user.otp == otp) {
                user.emailVerified = true;
                user.otp = null;
                user.save();
                res.status(200).send({
                    success: true,
                    message: "user verified successfully",
                    data: user
                });
            } else {
                res.status(400).send({
                    success: false,
                    message: "invalid otp",
                    data: null
                });
            }
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message,
            data: null
        });
    }
    
}

module.exports = otpCheck