// pages/api/submitData.js

import { sendMailForOtp } from "../../controllers/sendEmail";

export default async function handler (req, res) {
    if (req.method === 'POST') {
      // Handle POST request logic here
      const {email} = req.body;
      
      console.log('Received data:', email);
      
      try{
        const otp = await sendMailForOtp(email)
        console.log(otp)
        res.status(200).json({ status:true,message: 'otp sent succesfully', receivedData: email ,otp:otp});
      }
      catch(error){
        console.log(error)
        res.json({status:"false"})
      }
     
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  }
  