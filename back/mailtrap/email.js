import { mailtrapClient, sender } from "./mailtrap.js";
import { PASSWORD_RESET_REQUEST_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemp.js";


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

export const sendWelcomeEmail = async (email, name) => {
    const recipient = [{ email }];

    try {
        const response = await mailtrapClient.send({
        from: sender,
        to: recipient,
        template_uuid: "f5e4b694-0cbd-47fb-b539-ced4d3e38276",
        template_variables: {
            company: "Bllege",
            name: name,
            },
        });

        console.log("Welcome Email Sent Sucessfully!",response );
    } catch (error) {
        console.log(error);
        throw new Error(`Error sending verification email: ${error}`);
    }
}

export const sendResetEmail = async (email,resetURL) => {
    const recipient = [{ email }];
    
    try {
        const response = await mailtrapClient.send({
        from: sender,
        to: recipient,
        subject : "Reset Your Password!!",
        html : PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}",resetURL),
        category: "Password Reset!"
        });
    } catch (error) {
        console.log(error);
        throw new Error(`Error sending verification email: ${error}`);
    }
}