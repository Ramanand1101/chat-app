require("dotenv").config()
const nodemailer=require("nodemailer")



async function sendEmail(data){
    const transporter=nodemailer.createTransport({
        host:"smtp.gmail.com",
        port:587,
        auth:{
            user:"rntiwari383@gmail.com",
            pass:process.env.googleKey

        }
    })
    transporter.sendMail({
        to:`${data.email}`,
        form:"tiwariramanand098@gmail.com", 
        subject:data.subject,
        html:data.body,
    })
    .then(()=>console.log("mail send successfully"))
    .catch((error)=>console.log("err",err.message))
}
module.exports={sendEmail}