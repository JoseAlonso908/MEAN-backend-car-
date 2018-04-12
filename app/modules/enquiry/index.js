const enquiry = require('../../models/enquiry');

const mailer = require('nodemailer');


var smtpTransport = mailer.createTransport({
    service: "Gmail",
    auth: {
        user: "tnikam21@gmail.com",
        pass: "Tushar#8866"
    }  
});


module.exports.new = function(req, res){
    var data = req.body ;    
    enquiry.save(data, function(err, enquiryResponse){
        if(err) res.status(501).send(err);
        console.log(enquiryResponse.listing.dealer.email, "enquiryResponse.listing.dealer.email");
        var dealerEail = {
            from: "1StopLease <testing@gmail.com>",
            to: enquiryResponse.listing.dealer.email,
            subject: "New enquiry for car lease",
            /* text: "Node.js New world for me", */
            html: "You have received new enquiry from customer !!. Please login to your acount for more details."
        }
        
        smtpTransport.sendMail(dealerEail, function(error, response){
            if(error){
                console.log(error);
            }else{
                console.log("Message sent: " + response.message);
            }
        
            smtpTransport.close();
        });

        res.send(enquiryResponse);
    })    
}

module.exports.list = function(req, res){    
    enquiry.find({}, function(err, enquiries){
        if(err) res.status(501).send(err);
        res.send(enquiries);
    })    
}