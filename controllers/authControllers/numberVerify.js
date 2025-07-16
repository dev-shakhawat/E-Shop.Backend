const twilio = require('twilio');
const client = twilio(process.env.twilio_sid, process.env.twilio_auth_token);


async function numberVerify(req, res) {
    const { number } = req.body;
    
    await client.verify.v2.services(process.env.twilio_service_sid)
        .verifications
        .create({ to: number, channel: 'call' })
        .then((verification) => {
            res.status(200).send({
                success: true,
                message: "otp sent successfully",
                data: verification
            });
        })
        .catch((error) => {
            res.status(500).send({
                success: false,
                message: error.message,
                data: null
            });
        });
}


module.exports = numberVerify;