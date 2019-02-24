var request= require('request');
var express=require("express")
rouuter=express.Router();


rouuter.post("/customerpayment",function(req,res){
    ob=req.body
    
    console.log(ob)  
     headers = { 'X-Api-Key': '4b57b73c5ba307e298f5db6c1274ebfa', 'X-Auth-Token': '6dc09c0ddeec5e39cea629517052e413'}
     payload = {
    purpose: 'Product Purchase',
    amount: ob.totalamount,
    phone: ob.usermobileno,
    buyer_name: ob.customernam,
    redirect_url: 'http://www.sssworld.org/',
    loginurl:"http://www.instamojo.com/abhishek03094/",
    send_email: true,
    webhook: 'http://www.example.com/webhook/',
    send_sms: true,
    email: 'bheru7@gmail.com',
    allow_repeated_payments: false}

    request.post('https://www.instamojo.com/api/1.1/payment-requests/',{form:payload,  headers: headers}, function(error, response, body){
    if(!error && response.statusCode == 201){
        str=JSON.parse(body);
        
       res.send(str.payment_request.longurl)
    }
  
    })

    
  
  })

module.exports=rouuter;