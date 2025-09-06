const userSchema = require("../../models/userSchema")

async function getUserMail(req, res){
    try {
        const { id } = req.params;
        const user = await userSchema.findById(id).select("email");
    
        if (!user) {
          return res.status(404).json({ success: false, message: "User not found" });
        }
    
        // convert to plain object
        const safeUser = user.toObject();
    
    
        res.json({ success: true, data: user.email });
      } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
      }
}



module.exports = getUserMail