import { Component, OnInit, Inject } from '@angular/core';
import { Http } from '@angular/http'
import { ActivatedRoute }  from '@angular/router'

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  // constructor(@Inject(Http) private obj) { }
  constructor (@Inject (ActivatedRoute) public ar, @Inject(Http) private obj) { }


  userid;orderspro;
//////////////////// GET ORDERS  ///////////


lwt;
fungetorders(){
  
  this.lwt=localStorage.getItem("usertoken")
  //alert(this.lwt)
  var utk={utoken:this.lwt}
  this.obj.post("userser/checkutoken",utk).subscribe(ut=>{
    //alert(ut._body)
    if(ut._body=="success"){
      this.ar.navigateByUrl("/")
    }else{
     this.ar.navigateByUrl("/userprofile")
    }
  })

  var obbj={uid:this.userid}
  //alert(this.subsubid)
  this.obj.post("/productser/product",obbj).subscribe(x=>{
    this.orderspro=JSON.parse(x._body)
  
   
  })
}

  ngOnInit() {
    
    
    this.userid=localStorage.getItem("uid");
    this.fungetorders();
  }

}
