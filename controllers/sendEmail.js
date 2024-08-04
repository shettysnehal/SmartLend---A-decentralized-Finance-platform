import crypto from "crypto";
import dotenv from "dotenv";
import { services } from "@/utils/services";
import factory from "../etherum/factory";
import web3 from "../etherum/web3";

dotenv.config();

export const sendMailForOtp = async (email) => {
  console.log("Attempting to send OTP");

  function generateOTP() {
    let otp = '';
    for (let i = 0; i < 6; i++) {
      const randomDigit = crypto.randomInt(0, 10);
      otp += randomDigit.toString();
    }
    return otp;
  }

  const otp = generateOTP();
  const sender = process.env.EMAIL_USER;
  const receiver = email;
  const subject = "Email Verification";
  const text = `OTP: ${otp}`;

  try {
   
    // Send OTP to the smart contract
  
    // Check if the transaction was successful
   
      // Send OTP via email if the transaction succeeded
      await services(sender, receiver, subject, text);
      console.log("OTP sent successfully");
    return otp;

  } catch (error) {
    console.error("Error:", error);
  }
};
