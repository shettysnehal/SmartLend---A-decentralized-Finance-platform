import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config()
export const services =async (from,to,subject,text)=>{
    const transporter = nodemailer.createTransport({
    
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        secure: Boolean(process.env.EMAIL_SECURE), // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
          
        })
        const mailOptions = {
            from:from,
            to: to,
            subject: subject,
            text: text,
           
          };
          try {
            console.log(2)
            const info = await transporter.sendMail(mailOptions)}
            catch(error){
                console.log(error)
            }
}
