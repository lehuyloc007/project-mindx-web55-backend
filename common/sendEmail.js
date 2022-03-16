const nodemailer =  require('nodemailer');
const sendEmail = (content, emailTo) => {
    var transporter =  nodemailer.createTransport({ 
        host: 'smtp.gmail.com',
        port: 587,
        //secure: true,
        auth: {
            user: process.env.EMAIL_SEND,
            pass: process.env.EMAIL_SEND_PASS
        },
        // tls: {
        //     rejectUnauthorized: false
        // }
    });
    transporter.verify(function(error, success) {
        if (error) {
            console.log(error);
        } else {
            console.log('Kết nối thành công!');
        }
    });
    
    var mainOptions = {
        from: 'process.env.EMAIL_SEND',
        to: emailTo,
        subject: 'Xác thực tài khoản Cooking Holics',
        html: content
    }
    transporter.sendMail(mainOptions, function(err, info){
        if(err) {
            throw new Error("Not send email")
        } 
    });
    
} 
module.exports = sendEmail;