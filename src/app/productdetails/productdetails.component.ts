import { Component, OnInit,Inject } from '@angular/core';
import { Http } from '@angular/http'
import { ActivatedRoute }  from '@angular/router'
import { CartitemService } from "../cartitem.service"

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent implements OnInit {
  proid;prodetails;qtyy=1;rate;  rat=[];half=false;value=1;cartlength;
  constructor (@Inject (ActivatedRoute) public ar, @Inject(Http) private obj,public item:CartitemService) { }
  //constructor(public appobj:AppComponent,public aobj:ActivatedRoute, public robj:Http,private servar: ShowCartImageServiceService) { 


  funaddcartt(prodid){
    //alert(prodid)
    var proarr=[];
    var probj={id:prodid,qty:this.qtyy}
    if(localStorage.getItem("proinfo")!=null){
    var arr=[]
    var localdata=JSON.parse(localStorage.getItem("proinfo"))
    //alert(localdata[0].qty)
    arr.push(localdata)
    //localStorage.JsonData.id = prodid;
   
    //if(localdata.id)
    //arr.splice(0, prodid);
    arr.push({id:prodid,qty:this.qtyy++})
    alert(JSON.stringify(arr))
    localStorage.setItem("proinfo",JSON.stringify(arr))
   
    }
    else{
    localStorage.setItem("proinfo",JSON.stringify(probj))
    alert(localStorage.getItem("proinfo"))
    }
  }

  updata;arr
  tot_cart_items=0
  funaddcart(pd){
    
    console.log(pd)
    var abc = [];var newarr=[]
              if(localStorage.getItem("cart_items")!=null)
              {
              abc =  JSON.parse(localStorage.getItem('cart_items'));
               pd.selqty=this.value
              var str='\\"_id\\":'+pd._id+",";
              alert(str)
              if((localStorage.getItem('cart_items').indexOf(str)))
              {
                alert("Ex")
              for(var loop=0;loop<abc.length;loop++)
              {
              var str1=JSON.parse(abc[loop])
              console.log(str1)
                if(str1._id==pd._id)
                {
                  alert("Existed")
                  str1.selqty=pd.selqty
                  alert("Product Updated")
                }
                else
                {
                  alert("Not Existed")
                newarr.push(JSON.stringify(str1))
               }
              }
              }
                newarr.push(JSON.stringify(pd));
                this.item.funchangeinitialitem(newarr.length.toString())
                //this.servar.changeMessage(newarr.length.toString())
              }
else{
   pd.selqty=this.value
  newarr.push(JSON.stringify(pd));
  alert("Product added in your cart")
  this.item.funchangeinitialitem(newarr.length.toString())
  //this.servar.changeMessage(newarr.length.toString())

}
  localStorage.setItem('cart_items', JSON.stringify(newarr));
console.log(JSON.parse(localStorage.getItem('cart_items'))) 
}

  ///////////////////////
  ///////////////////////


  ///////////////////////
  //------------rating--------

  
  // rating(){
    
  //   alert(this.rate)
  //   for(var i=1;i<=this.rate;i++){
  //     //alert(this.rate)
  //     //alert("hi")
  //     this.rat.push(i)
  //     //alert(this.rat)
  //   }
  //   i--;
  //   //alert(this.rate)
  //   if(i<(this.rate)){
  //     this.half=true;
  //   }
  // }

  /////////////////////

  /////////////////////////
  qtymsg;
  increaseValue(dt){
    if(this.value==dt)
  //  alert('We re sorry! Only ' + this.value + ' units for each customer.');
    this.qtymsg='We re sorry! Only ' + this.value + ' units for each customer.'
    else
    {
    
      this.value++;
    }
  }
  decreaseValue()
  {
    if(this.value>1)
    {
      this.value--;
      this.qtymsg=""
    }
  }
  ///////////////////////////
  ngOnInit() {
    /////////////////////////////// CART ITEM /////////////////
    if(localStorage.getItem('cart_items')!=null){
      this.cartlength=(JSON.parse(localStorage.getItem('cart_items')));
      this.item.funchangeinitialitem(this.cartlength.length.toString());
    }
    ///////////////////////////////////////// 
   
    this.ar.params.subscribe(x=>{
      
      
      this.proid=parseInt(x["id"])
      var obbj={id:this.proid}
      //alert(this.proid)
      this.obj.post("/productser/prodetails",obbj).subscribe(x=>{
        this.prodetails=JSON.parse(x._body)
         this.rate=this.prodetails[0].rating;
         for(var i=1;i<=this.rate;i++){
          //alert(this.rate)
          //alert("hi")
          this.rat.push(i)
          //alert(this.rat)
        }
        i--;
        //alert(this.rate)
        if(i<(this.rate)){
          this.half=true;
        }
        
      })
    })
  }

}
