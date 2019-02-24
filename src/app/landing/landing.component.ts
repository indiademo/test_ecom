import { Component,Inject,OnInit } from '@angular/core';
import { Http } from '@angular/http'

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(@Inject(Http) public obj) { }
  pro;

  fungetallpro(){
    this.obj.get("productser/get_product").subscribe(pr=>{
      this.pro=JSON.parse(pr._body)
      alert(pr._body)
    })
  }

   //  GET PRODUCTS FOR LANDING PAGE

  ///////////////////////////////////// 
  prodat
  fungetpro(){
    this.obj.get("productser/get_product").subscribe(
      pr=>{
        this.prodat=JSON.parse(pr._body)
       // alert(pr._body)
        
      })
    
    }
    ////////////////////////////////////////////////

  ngOnInit() {
    this. fungetpro()

      var url=document.URL;
    var dt=(url.split(";"))
    var av=(dt[1].split("="))
    var ob={active:av[1]}
    this.obj.post("userser/activeuser",ob).subscribe(res=>{
      alert(res._body)
    })
  }

}
