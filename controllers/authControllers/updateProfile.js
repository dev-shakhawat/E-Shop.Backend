const mailsend = require("../../helpers/mailSend");
const otpGen = require("../../helpers/optGen");
const userSchema = require("../../models/userSchema");

async function updateProfile(req, res) {
    try {
      const { firstname, lastname, email, username } = req.body;
      const { id } = req.params;
  
      const user = await userSchema.findOne({ _id: id });  
  
      if (!user) return res.status(400).send({ success: false, message: "user not found", data: null });
  
      let updatedUser = user;
  
      // Update firstName
      if (firstname && firstname !== user.firstName) {
        updatedUser = await userSchema.findOneAndUpdate({ _id: id }, { firstName:firstname  }, { new: true });
      }
  
      // Update lastName
      if (lastname && lastname !== user.lastName) {
        updatedUser = await userSchema.findOneAndUpdate({ _id: id }, { lastName: lastname }, { new: true });
      }
  
      // Update username
      if (username && username !== user.username) {
        const usernameExists = await userSchema.findOne({ username });
        if (usernameExists) {
          return res.status(400).send({ success: false, message: "username already exists", data: null });
        }
        updatedUser = await userSchema.findOneAndUpdate({ _id: id }, { username }, { new: true });
      }
  
      // Update email
      if (email && email !== user.email) {
        const mailExists = await userSchema.findOne({ email });
        if (mailExists) return res.status(400).send({ success: false, message: "email already exists on another account", data: null });
  
        const otp = otpGen(8);
  
        await mailsend(email, "Email verification", `Hello ${user.username}, your otp is <b>${otp}</b>`);
        updatedUser = await userSchema.findOneAndUpdate({ _id: id }, { email, emailVerified: false, otp }, { new: true });
  
        // remove otp after 5 min
        setTimeout(async () => {
          await userSchema.findOneAndUpdate({ email }, { otp: null });
        }, 60000 * 5);
  
        return res.status(200).send({
          success: true,
          message: "Updated successfully, please verify your email first",
          data: updatedUser,
          redirectID: `${user._id}`
        });
      }
  
      // ✅ IMPORTANT: যদি email case না হয়, তাহলেও শেষে response পাঠাতে হবে
      return res.status(200).send({
        success: true,
        message: "Updated successfully",
        data: updatedUser
      });
  
    } catch (err) {
      return res.status(500).send({
        success: false,
        message: err.message,
        data: null
      });
    }
  }
  


module.exports = updateProfile