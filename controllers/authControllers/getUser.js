const userSchema = require("../../models/userSchema");


async function getUser(req, res) {
    try {
        const user = await userSchema.findOne({ _id: req.session.user._id }).select("-password");


        res.status(200).send({
            success: true,
            message: "user fetched successfully",
            data: user,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message,
            data: null,
        });
    }
}


module.exports = getUser