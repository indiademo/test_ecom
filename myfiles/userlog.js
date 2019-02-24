exp = require("express")

rt = exp.Router()
nodemailer = require('nodemailer');

jst=require("jsonwebtoken")
bc=require("bcrypt")

  ses=require("express-session")
  app.use(ses({secret:"gfg",saveUninitialized:true,resave:true}))
  sec=require("./encript")
  require("./otp")

//////////////////////// GET USER PROFILE/////////////////
// rt.get("/fun1",function(req,res){
//   sess=req.session
//   sess.x=100
//   //console.log(sess.x)
// })


var otp  ;
rt.get("/funsotp",function(req,res){
  var totpObj = new TOTP();
  otp = totpObj.getOTP("3micy2hguz5j2p6smnnoelcngpchn4sq",1000);
  //console.log(otp)
  res.send(otp)
})

rt.get("/funs",function(req,res){
  ////console.log("hiiii")
  var tk=jst.sign({id:"123"},sec.secret)
  //console.log(tk)
  sess=req.session
  sess.x=100
  //console.log(sess.x)
})
////////////////////////////////////////////////////
rt.post("/userprf",function(req,res){
  ob=req.body
  conn.tbl_user.find({email:ob.email}, function(err,result){
      
      res.send(result)
    
     ////console.log(ob.catid)
  })

})


//////////////////////// USER LOGIN /////////////////

rt.post("/login",function(req,res){
  udata=req.body
  ////console.log(udata)
   sess = req.session;
       conn.tbl_user.find({email:udata.email,active:1},function(err,ress){
        console.log(ress.length)
      if(ress.length!=0){
        id=ress[0]._id
         upass=ress[0].password
         uemail=ress[0].email
         uname=ress[0].username
         umobile=ress[0].mobile
        if(upass!=udata.password){
          res.send({count:2})
          //console.log("err password")
         }else{
          var tk=jst.sign({id:udata.email},sec.secret)
            sess.email=tk;
            ////console.log(id)
            
            res.send({token:tk,userinfo:uname,usermobile:umobile,id:id,uemail:uemail})
         }

       
      }else{
        res.send({count:0})
      }
    })

})
////////////check pf utoken ///////////////
rt.post("/checkutoken",function(req,res){
  pftoken=req.body
  ss=sess.email
  //console.log(ss)
  if(pftoken.utoken==ss){
   
    res.send("success")
  }else{
    res.send("error")
   
  }
 
})

///////////////////////////////////////

rt.post("/userreg",function(req,res){
    //$and: [ { mobile:ob.subsub },{ mobileotp:ob.subsub }]
  ob=req.body
  mobileno=mno
  //console.log(mobileno)
  var id=conn.tbl_user.find({ mobileotp:ob.uotp}).sort({_id:-1}).limit(1,function(err,otp){
    if (otp.length==0){
     console.log("Invalid OTP")
     res.send("Invalid OTP");
    }else{
      var id=conn.tbl_user.find({email:ob.email}).sort({_id:-1}).limit(1,function(err,result){
      
        if (result.length==1){
          res.send("Email id is allready registerd");
        }else{
          var id=conn.tbl_user.find().sort({_id:-1}).limit(1,function(err,re){

            if (re.length==0)
            iid=1
            else{
              iid=(re[0]._id)
              iid++
            }
            // var random=Math.random()
            // random=random*10000;
            // var rmdn=Math.round(random)
            // rmdn=ob.username+rmdn;
          
        
        
            //conn.tbl_user.insert({_id:iid,username:ob.username,mobile:ob.mobile,email:ob.email,password:ob.password})
            conn.tbl_user.update({ mobileotp:ob.uotp },{username:ob.username,mobile:mobileno,email:ob.email,password:ob.password,active:1})
            // conn.tbl_product.find( { $and: [ { subsubcatid:ob.subsub }, { price: { $gte:ob.min } },{ price: { $lte:ob.maxamo } } ] } , function(err,result){})

            res.send("Regesterd sucessfully plese login")

          })
            
        }
     })
    }

  })

     
})

////////////////////////////////////////
rt.post("/placeorder",function(req,res){
  pro=req.body
  ////console.log(pro)
  var id=conn.tbl_purchaseorder.find().sort({_id:-1}).limit(1,function(err,result){
    if (result.length==0)
    orderid=1
    else{
      orderid=(result[0]._id)
      orderid++

    }
    conn.tbl_purchaseorder.insert({_id:orderid,orderdate:new Date(),userid:pro.userid,product:pro.product})

  })
})


//////////////////////////////////////////////////// GET WISHLIST //////////////////////
rt.post("/wishpro",function(req,res){
  ob=req.body
  //console.log(ob)
  conn.tbl_wishlist.find({userid:ob.uid}, function(err,result){
    //console.log(result)
      res.send(result)
    
     ////console.log(result)
  })

})
///////////////////////////////////////////  UPDATE USER IN  WISHLIST PRODUCT //////////////////////
rt.post("/wishlistup",function(req,res){
  act=req.body
  //console.log(act)
  conn.tbl_wishlist.update({userid:null},{$set:{userid:act.userid}},{multi: true});
  ////console.log(res)
  res.send("Updated...")
})
/////////////////////////////////////////////////////// SEARCH PRODUCTS //////////////////////////////////


rt.post("/search",function(req,res){
  objsrch=req.body
  //console.log(objsrch)
  conn.tbl_product.find({product:{$regex:objsrch.proid}}, function(err,result){
    // //console.log(result)
  res.send(result)
    

  })
})

otp;
///////////////////////////////////////////  OTP GENERATE FOR FORGETPASSWORD //////////////////////
rt.post("/generateotp",function(req,res){
  omail=req.body
  ses=req.session
  var totpObj = new TOTP();
   otp = totpObj.getOTP("3micy2hguz5j2p6smnnoelcngpchn4sq");
   //console.log("frst"+otp)
  ses.emailotp=otp

 //console.log(req.session.emailotp)
  var id=conn.tbl_user.find({email:omail.useremail}).limit(1,function(err,result){
    if (result.length!=0){
      email=result[0].email
      var tk=jst.sign({id:omail.useremail},sec.secret)
      ses.email=tk;
     

      var id=conn.tbl_user.update({email:email},{$set:{otp:otp,exptime:new Date(),otpaccesstoken:tk}},function(err,result){
        // //console.log(tk)
         res.send({otp:tk})
      })

      
   ////console.log(email)
  //  conn.tbl_user.update({email:omail.useremail},{$set:{otp:otp}},function(err,result){
  //     //console.log(count(result.length))
    
  
  //    });
   
  
   } else{
      // orderid=(result[0]._id)
      // orderid++
      //console.log("wrong email id please your email")
      //console.log("hiiii")
      res.send({count:0})
    }
  })
 
 
  //  conn.tbl_user.update({email:omail.useremail},{$set:{otp:otp}},function(err,result){
  //   //console.log(count(result.length))
  

  //  });
   
  
})
 


/////////////////////////////////////////////////////// SEARCH PRODUCTS //////////////////////////////////

/////////////////////////////////////////// UPDATE PASSWORD ///////////////////////////////////////////////
rt.post("/updatepassword",function(req,res){
  eotp=req.body
 dt=new Date()
 
 olddt=conn.tbl_user.find({otp:eotp.emailotp},function(err,result){
   et=new Date(result[0].exptime)
   res=(dt.getTime()-et.getTime())
   res=res/1000
   //console.log(res)
 })
  //console.log(eotp.eaccstoken)
  conn.tbl_user.update({ otpaccesstoken:eotp.eaccstoken},{$set:{password:eotp.newpassword}});
 
  res.send("Updated...")
})

/////////////////      SEND EMAIL OTP     ////////////////////////////////////////////

////////////////////////////////// EMAIL SENDING /////////////////////////
rt.post("/mail",function(req,res){
  var dt=req.body
  // usereotp=req.session.emailotp
  //console.log("this id global"+otp)
 
 
  var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'abhishek03094@gmail.com',
        pass: '1.jaanabhi'
      }
    });
    
    var mailOptions = {
      from: 'abhishek03094@gmail.com',
      to: dt.useremail,
      subject: 'Ekart4U.com OTP FOR Reset password',
      html:  'USE this OTP to reset your password'+ otp,
      
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        //console.log(error);
      } else {
        //console.log('Email sent: ' + info.response);
      }
    });
})

//////////////////////////////////////////////////////////////////////
rt.post("/activationlink",function(req,res){
  var dt=req.body
  //console.log(dt)
  conn.tbl_user.find({email:dt.email},function(err,result){
    var str="http://localhost:4200/activateuser;activate="+ result[0].active
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'abhishek03094@gmail.com',
        pass: '1.jaanabhi'
      }
    });
    
    var mailOptions = {
      from: 'abhishek03094@gmail.com',
      to: dt.email,
      subject: 'Ekart4U.com OTP FOR Reset password',
      html:  'Your activation link'+'<a href='+str+'> Click to activate e4ukart</a>'
      
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        //console.log(error);
      } else {
        //console.log('Email sent: ' + info.response);
      }
    });
  })
})


///// //////////////////////////////////////// USER ACTIVATION LINK SENDING /////////////////

rt.post("/activeuser",function(req,res){
  ob=req.body
  //console.log(ob.active)
  conn.tbl_user.update({active:ob.active},{$set:{active:1}})
  conn.tbl_user.find(function(err,result){
      //console.log(result)
  })
  res.send("activated")
})

///////////////////////////////////////////// SEND SIGNUP OTP THROUGH MOBILE ////////////////////////

rt.post("/signupotp",function(req,res){
  ob=req.body
  mno=req.session
  mno=ob.mobilno
     
  

  var totpmobile = new TOTP();
  smsotp = totpmobile.getOTP("3micy2hguz5j2p6smnnoelcngpchn4sq");

 


  var id=conn.tbl_user.find({mobile:ob.mobilno}).sort({_id:-1}).limit(1,function(err,result){
   
        if (result.length==1){
          res.send("Mobile no allready registerd");
        //  console.log("Mobile no allready registerd")
        }else{
          var id=conn.tbl_user.find().sort({_id:-1}).limit(1,function(err,re){
           
            if (re.length==0)
            iid=1
            else{
                iid=(re[0]._id)
                iid++

            }
          // console.log("sucess insert otp")
             conn.tbl_user.insert({_id:iid,mobile:ob.mobilno,mobileotp:smsotp})
             
            res.send(smsotp)
           })
            
        }
     })


  
})
module.exports=rt;