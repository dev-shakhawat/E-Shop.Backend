const mailsend = require("../../helpers/mailSend");
const otpGen = require("../../helpers/optGen");
const userSchema = require("../../models/userSchema");
const { use } = require("../../routes/api/authApi");

function sendOTP(req, res) {

    try { 
        const id = req.params.id;
        const otp = otpGen(6);

        userSchema.findOneAndUpdate({ _id: id }, { otp }, { new: true })
        .then((user) => {
            mailsend(user.email, "Email verification", `Hello ${user.username}, your otp is <b>${otp}</b>`);
            setTimeout(() => {
                userSchema.findOneAndUpdate({ _id: id }, { otp: null });
            }, 60000 * 5);
            return res.status(200).send({
                success: true,
                message: "otp sent successfully",
                data: user
            });
        })
        .catch((error) => {
            res.status(500).send({
                success: false,
                message: error.message,
                data: null
            });
        });

 
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message,
            data: null
        });
    }
    
}

module.exports = sendOTP