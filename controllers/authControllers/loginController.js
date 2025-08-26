const argon = require("argon2");
const userSchema = require("../../models/userSchema");

async function login(req, res) {
  
  try {
    const { email, password } = req.body; 

    const user = await userSchema.findOne({ email });

    if (!user) return res.status(400).send({ success: false, message: "user not found , please register first", data: null  });
    
    const isMatch = await argon.verify(user.password, password);

    if (!isMatch) return res.status(400).send({ success: false, message: "invalid password", data: null  });
    

    if (!user.emailVerified) return res.status(400).send({ success: true, message: "please verify your email first", data: null , redirectID: user._id });
    

    const { password: _, ...safeUser } = user.toObject();

    req.session.user = safeUser
    
    res.status(200).send({
      success: true,
      message: "user logged in successfully",
      data: user,
    });


  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
      data: null
    });
  }
     
}

module.exports = login;
