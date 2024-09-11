import { mailtrapClient, sender } from "./mailtrap.js";
import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemp.js";


export const  sendVerificationEmail= async (email,verificationToken) =>{
    const reciepient = [{email}];

    try {
        const response = await mailtrapClient.send({
        from: sender,
        to: reciepient,
        subject: "Verify Your Email!",
        html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}",verificationToken),
        category:"Email Verification"
        });

        console.log("Email Sent Sucessfully");
    } catch (error) {
        console.log(error);
        throw new Error(`Error sending verification email: ${error}`)
    }
}