import { Component,Inject,OnInit } from '@angular/core';
import {trigger,state,style,animate,transition} from "@angular/animations"
import { CartitemService } from './cartitem.service'
import { Http } from '@angular/http'
import { LowerCasePipe } from '@angular/common';
declare var $:any

/////////////////////////////////////////  ANIMATION //////////////////////////////////////////////////////////
var myanimations=[
  
  trigger("anm3",[
    state("inv",style({
      display:"none"
    })),
    state("vis",style({display:"block"})),

  transition("*=>*",animate("200ms"))
  ])
]
/////////////////////////////////////////////// END /////////////////////////////////////////////////////////////
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations:[myanimations]
})

export class AppComponent implements OnInit {

  constructor(@Inject(Http) public obj,  public cart:CartitemService) { }
  catdata;
  subcatdata;
  sscat;
  tmp3;
  udata;
  userid="";
  password="";
  logvalue=0;
  reg=0;pro;
  rusername="";rmno="";remail="";repassword="";regdata;usermail;cartitemlength;usersdet;lguid;rpassword;
  ////////////////////////////////////////////////  REG & LOGIN SHOW AND HIDE /////////////////////////////////////////////////////////////

  funregval(){
    this.reg=1;
    
  }
  funregvalhide(){
    this.reg=0;
  }
  //////////////////////////////////////////////// END /////////////////////////////////////////////////////////////
  mobile;
  funlogin(){
  
     var userlogdetaila={email:this.userid,password:this.password}
     //alert(userlogdetaila)
     this.obj.post("userser/login",userlogdetaila).subscribe(cbudata=>{
        this.udata=JSON.parse(cbudata._body)
      //  var uname=this.udata.userinfo[0].username
      //  this.mobile=this.udata.userinfo[0].mobile
      alert(this.udata.uemail)
      if(this.udata.count!=0 && this.udata.count!=2){
        
         localStorage.setItem("usertoken",this.udata.token)
         localStorage.setItem("userpf",this.udata.userinfo)
         localStorage.setItem("umobile",this.udata.usermobile)
         localStorage.setItem("cusemail",this.udata.uemail)
      
         localStorage.setItem("uid",this.udata.id)
      
         localStorage.setItem("loginvl","1")
         this.logvalue=1;
         this.tmp3="inv"
        
         location.reload();
         this.insertwishlist();
      }else if(this.udata.count==2){
        alert("Invalid password")
      }else{
        alert("Invalid user name")
      }
    })
   
  }

  ////////////// re password ///////////
  repsw(){
    if(this.rpassword!=this.repassword){
      alert("enter same password")
    }
    
  }
  /////////////////////////////// UPDATE USER ID IN WISHLIST AFTR LOGIN ////////////////////////////

  insertwishlist(){
    var curentuid=this.udata.id
   alert(curentuid)
     var wishprr={userid:curentuid}
    this.obj.post("userser/wishlistup",wishprr).subscribe(obj=>{
     // alert(obj._body)
    })
  }

  //////////////////////////////////////////////// GET USER PROFILE /////////////////////////////////////////////////////////////
  fungetuser(){
    var userm={email:this.userid}
    this.obj.post("userser/userprf",userm).subscribe(reg=>{
       this.regdata=JSON.parse(reg._body)
       //localStorage.setItem("userem", JSON.stringify(this.regdata[0].email));
       //localStorage.setItem("user",this.userid)
      //alert(localStorage.getItem("user"))
     
    })
  }
////////////////////////////////////////////////// SEARCH ///////////////////////////////////////////////
searchdata;search;srchitm=0;
funsearch(){
  console.log(this.search)

  if(this.search == 0){
    this.srchitm=0
  }else{
    this.srchitm=1
  var srch={proid:this.search}
  this.obj.post("userser/search",srch).subscribe(reg=>{
    (this.searchdata)=JSON.parse(reg._body)
    console.log(this.searchdata)
   
 })
}

}
///////////////////////////////////////////////closeresetpwd///////////////////////////////////////////////
closeresetpwd(){
  this.rspw1=1;
  this.rspw=0;
}

/////////////////////////////////////////////// FORGET PASSWORD ////////////////////////////////////////////
uemailid;otpuser;eidcount=0;
rspw=0;rspw1=1
sendotp(){
 
  alert(this.uemailid)
  var uemail={useremail:this.uemailid}
  this.obj.post("userser/generateotp",uemail).subscribe(ott=>{
    this.otpuser=JSON.parse(ott._body)
    this.eidcount=this.otpuser.count
   
     if(this.eidcount!=0){
       this.rspw=1;
      this.rspw1=0;
      localStorage.setItem("userotp",this.otpuser.otp)
      this.funemailotp()
     }else{
      console.log(this.eidcount)
      this.rspw=0
      alert("wrong email id please give correct email id o send OTP")
     }
    
    
  })

}
/////////////////// SEND EMAIL OTP //////////////////

funemailotp(){
  var otpaccstoken=localStorage.getItem("userotp")
  var ee={useremail:this.uemailid,eaccstoken:otpaccstoken}
  this.obj.post("userser/mail",ee).subscribe(emai=>{
    alert("password updated")
  })
}

//////////////////////////////////////////////////////////////////////////
emailotp;otp;newpsw
funsavenew(){
  var otpaccstoken=localStorage.getItem("userotp")
  alert(otpaccstoken)

   var eotp={eaccstoken:otpaccstoken,emailotp:this.otp,newpassword:this.newpsw}
   this.obj.post("userser/updatepassword",eotp).subscribe(reg=>{
     alert("password updated")
   })
}


//////////////////////////////////////////////////////// SEND MOBILE OTP FOR SIGNUP //////////////////////
umobile="";smsotp
sendmobileotp(){
  var motp={mobilno:this.umobile}
  this.obj.post("userser/signupotp",motp).subscribe(reg=>{
    this.smsotp=reg._body
    alert(this.smsotp)
   this.obj.post("http://www.onlinebulksmslogin.com/spanelv2/api.php?username=nalax&password=nalax@123&to=+"+this.umobile+"&from=TESTIN&message=Hi Use this OTP to create your Ekart4u OTP NO:+"+this.smsotp+"")
   .subscribe(function(res) {
    if(res) {
        this.sms = "sucess";
        alert(this.sms)
    } 
   
  });
    
    this.rspw=1;
    this.rspw1=0;
  })
}

//////////////////////////////////////////////// END /////////////////////////////////////////////////////////////
 
// funses(){
   
//     this.obj.get("/funs").subscribe(reg=>{
//       this.regdata=JSON.parse(reg._body)
//       alert(reg._body)
     
//     })
//   }

////////////////////
// checkloguserid(){
//   if(localStorage.getItem("user")){
//     this.logvalue=1;
//     alert(this.logvalue)
//   }else{
//    this.logvalue=0;
//    alert(this.logvalue)
//   }
// }

/////////////////////
//////////////////////////////////////////////// LOGOUT /////////////////////////////////////////////////////////////
valied=1; usmsotp="";
funlreg(form1){
  alert(this.usmsotp)
   if(form1.valid){
    if(this.rpassword==this.repassword){
      var regobj={username:this.rusername,mobile:this.rmno,email:this.remail,password:this.repassword,uotp:this.usmsotp}
    this.obj.post("userser/userreg",regobj).subscribe(reg=>{
      // this.regdata=JSON.parse(reg._body)
      alert(reg._body)
      this.reg=0;
      // this.obj.post("userser/activationlink",regobj).subscribe(reg=>{
      //   alert("activation link sended")
      // })
    })
    }else{
      alert("enter same password")
    }
   
   }else{
     this.valied=0
   }


}
//////////////////////////////////////////////// END /////////////////////////////////////////////////////////////


  //////////////////////////////////////////////// LOGOUT /////////////////////////////////////////////////////////////
  funlogout(){
      localStorage.removeItem("loginvl");
      localStorage.removeItem("usertoken");
      localStorage.removeItem("userpf");
      localStorage.removeItem("uid");
      localStorage.removeItem("cusemail");
      localStorage.removeItem("umobile");
      this.logvalue=0;
      location.reload();
      window.location.href="#"
      
    }
  //////////////////////////////////////////////// END /////////////////////////////////////////////////////////////

  //////////////////////////////////////////////// CHECKING LOGIN OR NOT /////////////////////////////////////////////////////////////

 checklog(){
   if(localStorage.getItem("loginvl")){
     this.logvalue=1;
   }else{
    this.logvalue=0;
   }
 }

 ////////////////////////////////////////////////SHOW & CLOSE LOGIN EVEND WITH ANIMATION  /////////////////////////////////////////////////////////////

  closelogin(event) {
    alert("abhi")
    this.tmp3="inv"
  
  }

  loginshide(){
    alert("hi")
    this.tmp3="vis"
  }
  //////////////////////////////////////////////// END /////////////////////////////////////////////////////////////


  //////////////////////////////////////////////// GET CAT /////////////////////////////////////////////////////////////

   fungetcat(){
    
    this.obj.get("catser/getcat").subscribe(this.cback2)
  }

  cback2=(obj)=>{
    //alert("hii")
    this.catdata=JSON.parse(obj._body)
    //console.log(this.catdata)
    //alert(this.catdata)
  }  
  //////////////////////////////////////////////// END /////////////////////////////////////////////////////////////


  //////////////////////////////////////////////// GET SUB CAT /////////////////////////////////////////////////////////////

   fungetsubcat(){
    //alert("hii")
    this.obj.get("subcatser/get_scat").subscribe(this.cback3)
  }

  cback3=(obj)=>{
    //alert("hii")
    this.subcatdata=JSON.parse(obj._body)
    //console.log(this.subcatdata)
    
  }
  //////////////////////////////////////////////// END /////////////////////////////////////////////////////////////


  ///////////////////////////////// GET SUB SUB CATEGORY  /////////////////////////////////////////////////
  
  funsubsubcat(){
     
    this.obj.get("subsubcatser/get_sscat").subscribe(this.cbackk2)
  }

  cbackk2=(obj)=>{
    
    this.sscat=JSON.parse(obj._body)
    //alert(obj._body)
    
  }
  //////////////////////////////////////////////// END /////////////////////////////////////////////////////////////
 
 
  ///////////////////////////////////////////// NG ON INIT ////////////////////////////////////////////////////
  username;otpaccstoken
  ngOnInit() {

    // var url=document.URL;
    // var dt=(url.split(";"))
    // var av=(dt[1].split("="))
    // var ob={active:av[1]}
    // this.obj.post("userser/activeuser",ob).subscribe(res=>{
    //   alert(res._body)
    // })
    
    
    // alert(JSON.parse(localStorage.getItem("userotp")))
 
    // product slider in main page /////////////

  //   (function($) {
  //     "use strict";
  
  //     // manual carousel controls
  //     $('.next').click(function(){ $('.carousel').carousel('next');return false; });
  //     $('.prev').click(function(){ $('.carousel').carousel('prev');return false; });
      
  // })(jquery);

  //////////////////////////////////////////////////////////////////////////////////////
    
   this.username=localStorage.getItem("userpf");
   if(localStorage.getItem('uid')!=null){
   this.lguid=localStorage.getItem("uid");

   }

    if(localStorage.getItem('cart_items')!=null){
      var cartlength=(JSON.parse(localStorage.getItem('cart_items')));
      this.cart.funchangeinitialitem(cartlength.length.toString());
  
     
    }
    else
    {
    this.cart.funchangeinitialitem("0");
    }
    this.cart.currentcartitem.subscribe(citm=>{
      this.cartitemlength=citm
      
    })
// alert(this.cartitemlength)
   
  
    // this.funses();
    //this.username=(localStorage.getItem("user"));
    //alert(JSON.parse(localStorage.getItem("userem")));
  this.fungetuser();
  
    this.checklog();
    this.fungetcat();
    this.fungetsubcat();
    this. funsubsubcat();
  }
  ///////////////////////////////////////// END ///////////////////////////////////////////////////////////
}