import nodemailer from 'nodemailer'
import generator from 'generate-password'


export const generatePassword = async (email:string,message:string)  => {


    // const generatedPassword = Math.floor(100000 + Math.random() * 900000);
    // var generator = require('generate-password');

    const generatedPassword= generator.generate({
        length: 15,
        numbers: true,
        symbols: true,
        // strict: true,
    });

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: `${message} `,
        text: `Your temporary password is: ${generatedPassword}.`,
    });

    console.log(generatedPassword)
    return generatedPassword.toString()
};

// export const generateSmsOTP = async (phone) => {
//     // const generatedOTP = Math.floor(100000 + Math.random() * 900000);

//     const vonage = new Vonage({
//         apiKey: process.env.VONAGE_API_KEY,
//         apiSecret: process.env.VONAGE_API_SECRET
//     })

//     const from = "P2P System"
//     const to = phone
//     const text = `Your OTP for login is: ${generatedOTP}`

//     await vonage.sms.send({ to, from, text })
//         .then(resp => { console.log('Message sent successfully'); console.log(resp); })
//         .catch(err => { console.log('There was an error sending the messages.'); console.error(err); });

//     return generatedOTP.toString()
// }