import nodemailer from 'nodemailer';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const createTransporter = () => {
    return new Promise((resolve,reject)=>{
        try {
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.EMAIL_NAME ,
                    pass: process.env.EMAIL_PASSWORD
                }
            });
            resolve(transporter);
        } catch (error) {
            console.log(error.message);
            reject(error);
        }
    });
};


export const email_verify_mailer = async (sendEmailTo,jwtToken) => {
    try {
        const verify_link = `http://localhost:2000/users/verifyEmail/${jwtToken}`;
        const email_verify_transporter = await createTransporter();

        await email_verify_transporter.sendMail({
            from: "dzonnna@gmail.com",
            to: sendEmailTo,
            subject: "Successfully Registered. Verify Email.",
            html: `<div>
                    <h2>Hi nice to see you!</h2>
                    <p>
                        Please verify your email in order to login. <br>
                        After that you can login regularly. <br>
                        Link will expire in 10 minutes. 
                    </p>
                    <button><a href="${verify_link}">VERIFY EMAIL</a></button>
           </div>`
        });

    } catch (error) {
        console.log(error);
    }
};


export const password_reset_mailer = async (sendEmailTo,jwtToken) => {
    try {
        const password_reset_link = `http://localhost:3000/password-reset-final/${jwtToken}`;

        const password_reset_transporter = await createTransporter();

        await password_reset_transporter.sendMail({
            from: "dzonnna@gmail.com",
            to: sendEmailTo,
            subject: "Password Reset Link",
            html: `<div>
                    <h2>Hi!</h2>
                    <p>
                        It seams that you requested password reset <br>
                        If you did please click link below. <br>
                        If you did not please delete this email. 
                    </p>
                    <button><a href="${password_reset_link}">Reset Password </a></button>
           </div>`
        });

    } catch (error) {
        console.log(error);
    }
}
