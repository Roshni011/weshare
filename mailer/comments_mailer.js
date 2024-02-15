const nodemailer = require('../config/nodemailer');
//const comment = require('../models/comment');



// another way of exporting the method

exports.newComment = (comment)=>{
    let htmlString = nodemailer.renderTemplate({comment:comment},'/comments/new_comment.ejs');

    console.log('inside newcomment mailer',comment);  
    nodemailer.transporter.sendMail({
        from:'ajaykumar420.ak79@gmail.com',
        to:'ajayrathod50000@gmail.com',
        subject:'new comment published',
        html:htmlString,
    },(err,info)=>{
        if(err){console.log('error in sending the mail',err);return;}
        console.log("message sent",info);
        return;

    })
}