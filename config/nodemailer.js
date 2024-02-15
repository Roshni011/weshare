const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');








let transporter = nodemailer.createTransport({
    service:'gmail',
    host:'smtp.gmail.com',
    post:587,
    secure:false,
    auth:{
        user:'ajaykumar420.ak79@gmail.com',
        pass:'ajay@3299'
    }
});


let renderTemplate = (data,relativePath) =>{   // relativePath is from where the email is send

    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        function(err,template){
            if(err){console.log('error in rendering the template',err);return;}
            mailHTML = template;
        }
    )
    return mailHTML;

}

module.exports = {
    transporter:transporter,
    renderTemplate:renderTemplate
}