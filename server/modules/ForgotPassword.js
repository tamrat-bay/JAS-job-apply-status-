const User = require('../models/User');
const ResetRequest = require('../models/ResetRequest');
const sendEmail = require('./SendEmail').sendEmail
const bcrypt = require('bcrypt');

const crypto = require("crypto");


//! delete uuid
function forgotPassword(req,res) {
    const { email } =  req.params;

    User.findOne({email}, (err, user) => {
        if (err) return res.status(400).send(err);
        if (!user) return res.status(404).send('Email does not exist ');
        if (user) {
            const id = crypto.randomBytes(16).toString("hex");
            const request = {
                id:id,
                email:email
            }
            ResetRequest.create(request)
            //send email
            console.log('request',request);
            
            sendEmail(request).catch(err=> console.log(err))
            
          return res.status(201).send(user);  
        }
        
    })
}


function resetPassword(req,res) {
    const {id }= req.body;
    console.log('id :',id);
    
    ResetRequest.findOne({id})
    .then(request =>{
       const {email} = request

        User.findOne({email}, (err, user) => {
            if (err) return res.status(400).send(err);
            if (!user) return res.status(404).send('Email does not exist ');
            if (user){
                bcrypt.hash(req.body.password,10)
                .then( hashed =>{
                    user.password = hashed;
                    //update the user data
                    User.findByIdAndUpdate(user._id,user)
                    .then(userUpdate => { 
                             //!Delete ResestRequest after use so that id is used only once
                             request.remove().then(request => console.log(email,'request was deleted'))
                             
                       return res.status(204).send('Passwoed was changed')
                })
                })
            }
           
        })
        .catch(err =>res.status(400).send(err))
    
})
}

module.exports.forgotPassword = forgotPassword
module.exports.resetPassword = resetPassword