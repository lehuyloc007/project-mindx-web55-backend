const nodemailer =  require('nodemailer');
const sendEmail = (content, emailTo) => {
    var transporter =  nodemailer.createTransport({ 
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'coithanh30@gmail.com',
            pass: 'hkqw19@g'
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    
    var mainOptions = {
        from: 'Cooking',
        to: emailTo,
        subject: 'Xác thực tài khoản',
        html: content
    }
    transporter.sendMail(mainOptions, function(err, info){
        if (err) {
            console.log(err);
        } else {
            console.log('Message sent: ' +  info.response);
        }
    });
} 
module.exports = sendEmail;