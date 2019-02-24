import { Component, OnInit,Inject } from '@angular/core';
import { Http } from '@angular/http'
import { ActivatedRoute }  from '@angular/router'

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
//   template:`
//   <div>
//     <h2>Hello {{name}}</h2>
//   </div>
  
// `,
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  constructor (@Inject (ActivatedRoute) public ar, @Inject(Http) private obj) { }
lwt;username;
  funuserprf(){
    this.obj.post("userprofile/uacount").subscribe(ua=>{
      alert(ua._body)
    })
  }

   //////////////////////////////////////////////// LOGOUT /////////////////////////////////////////////////////////////
   funlogout(){
    localStorage.removeItem("loginvl");
    localStorage.removeItem("usertoken");
    localStorage.removeItem("userpf");
   
    //location.reload();
    window.location.href="/"
    
  }
//////////////////////////////////////////////// END /////////////////////////////////////////////////////////////


  ngOnInit() {
    this.username=localStorage.getItem("userpf");
    this.lwt=localStorage.getItem("usertoken")
   var utk={utoken:this.lwt}
   this.obj.post("userser/checkutoken",utk).subscribe(ut=>{
     //alert(ut._body)
     if(ut._body=="success"){
       this.ar.navigateByUrl("/")
     }else{
      this.ar.navigateByUrl("/userprofile")
     }
   })
  }

}
