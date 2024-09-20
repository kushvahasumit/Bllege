import { mailtrapClient, sender } from "./mailtrap.js";
import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemp.js";


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
          template_uuid: process.env.WELCOME_MAIL_ID,
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

export const sendResetSucessEmail = async (email) =>{
    const recipient = [{ email }];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Password reset sucessfully!!",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Password Reset!",
        });

        console.log("password reset sucessfully")
    } catch (error) {
        console.log(error);
        throw new Error(`Error sending password reset email: ${error}`);
    }
}