const userSchema = require("../../models/userSchema");

 

async function mailverify(req, res) {

    try{
       const {otp} = req.body;
       const id = req.params.id;
       const user = await userSchema.findOne({ _id: id });
       if(!user) return res.status(400).send({ success: false, message: "user not found", data: null  });

       if(user.otp != otp) return res.status(400).send({ success: false, message: "invalid otp", data: null  });
       
       await userSchema.findOneAndUpdate({ _id: id }, { emailVerified: true , otp: null });
       res.status(200).send({
           success: true,
           message: "email verified successfully",
           data: user,
           redirectID: "/account"
       });



    }catch(error){
        res.status(500).send({
            success: false,
            message: error.message,
            data: null
        });
    }
 
}


module.exports = mailverify;