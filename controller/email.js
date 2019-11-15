const nodemailer = require('nodemailer');

const email = (mail) => {
    return new Promise((resolve,reject) =>{
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'chainlinkspassport@gmail.com',
              pass: '224462@chain'
            }
        });
        const mailOptions = {
            from: 'vishnupradeepmahe@gmail.com',
            to: mail,
            subject: 'You have Registered in the system',
            text: 'Welcome to the service!!'
        };
        transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
        reject(error);
      } else {
        resolve(info.response);
      }
    });
});
}

module.exports = {
    email: email
}