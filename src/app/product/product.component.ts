import { Component, OnInit ,Inject,ElementRef} from '@angular/core';
import { Http } from '@angular/http'
import { ActivatedRoute }  from '@angular/router'
import { stringify } from 'querystring';
import { parse } from 'url';
import { toBase64String } from '@angular/compiler/src/output/source_map';
import { STRING_TYPE } from '@angular/compiler/src/output/output_ast';

declare var $:any


//import * as $ from 'jquery';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {

  constructor (@Inject (ActivatedRoute) public ar, @Inject(Http) private obj,@Inject(ElementRef) elementRef: ElementRef) { this.elementRef = elementRef;}
  prodata;
  subsubid;wishpro;userid;xyz=1;


  elementRef: ElementRef;
  slideValue: number;
  slideValue1;

  ///////////////////////////////// FILTER ////////////////////////////

  

  /////////////////////////////////////////////////////////////////////////
////////////////////SLIDER ///////////


  funcat_insert(){
    var obj={maxamo:this.slideValue1}
    this.obj.post("products/proamount",obj).subscribe(obj=>{
     // alert(obj._body)
      
    })

  }
 


   
/////////////////////// WISHLIST ///////////////////



funwishlist(proid){
  //alert(proid)
 
  var obbj={id:proid}
  //alert(this.subsubid)
  this.obj.post("/productser/wishpro",obbj).subscribe(x=>{
    this.wishpro=JSON.parse(x._body)
  
     this.insertwishlist();
  })


}


///////////////////////////////////// INSERT WISH PRODUCTS //////////////////////////////
insertwishlist(){
  //alert(this.userid)
   var wishprr={wishpr:this.wishpro,userid:parseInt(this.userid)}
  this.obj.post("productser/wishlist",wishprr).subscribe(obj=>{
    //alert(obj._body)
  })
}
 /////////////////////////////////////////// ACTIVE ///////////////////////////////////////////
 active=1;

 funactive(bb1,act){
  // alert(act)
  bb1.active=0;
  var old={_id:bb1._id,active:act}
 
  this.obj.post("productser/wishactive",old).subscribe(this.cbac2)

}
funinactive(bb2,act){
 // alert(act)
  bb2.active=1;
  var old={_id:bb2._id,active:act}
 
  this.obj.post("productser/wishinactive",old).subscribe(this.cbac3)
  
}
cbac2=(obj)=>{
   
  //alert(obj._body)
}
cbac3=(obj)=>{

   // alert(obj._body)
  }
//////////////////////////////////////////////END////////////////////////////////////////




///////////////////////////////////// 

  fungetpro(){
    this.obj.get("products/get_product").subscribe(
      pr=>{
        this.prodata=JSON.parse(pr._body)
       // alert(pr._body)
        
      })
    
    }

    ///////////////////////////////////// GET WISHLIST PRODUCT USER WISE /////////////////////
    wishlistpr;wishactv;
  fungetwishpro(){
    //alert(this.userid)
    var user={userid:parseInt(this.userid)}
    console.log(user)
    this.obj.post("productser/getwishpro",user).subscribe(
      pr=>{
        this.wishlistpr=JSON.parse(pr._body)
        this.wishactv=this.wishlistpr[0].active
        //alert(this.wishactv)
        
      })
    
    }
    ///////////////////////////////////////////////////// SLIDER FILTER PRICE WISE ////////////
    fltrprice;
    filterprice(){
      $(".slider").slider({
        range: true,
       // orientation: "vertical",
        min: 0,
        max: 80000,
        step: 1000,
        slide: (event, ui) => {
         // alert(ui.value)
          
            this.slideValue = ui.values[0];
            this.slideValue1 = ui.values[1];

            var dd={maxamo:parseInt(this.slideValue1),min:this.slideValue,subsub:parseInt(this.subsubid)}
            this.obj.post("productser/proamount",dd).subscribe(obj=>{
              this.prodata=JSON.parse(obj._body)
              // console.log(this.prodata)
              
              
            })
        }
    });
    }
  
   // userFilter
    userFilter= { product: '' };
  ngOnInit() {
    this.filterprice();

    
    this.userid=localStorage.getItem("uid");
    this.fungetwishpro()
    //alert(this.userid)

 

    //this.fungetpro();
    //this.funcat_insert();
    this.ar.params.subscribe(x=>{
      
      this.subsubid=x["_id"]
      var obbj={id:parseInt(this.subsubid),user:this.userid}
      //alert(this.subsubid)
      this.obj.post("/productser/getproducts",obbj).subscribe(x=>{
        this.prodata=JSON.parse(x._body)
      console.log(this.prodata)
      
        //alert(x._body)
      })
    })
    
  }

}
