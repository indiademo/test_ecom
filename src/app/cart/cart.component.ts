import { Component, OnInit ,Inject} from '@angular/core';
import { CartitemService } from "../cartitem.service"
import { Http } from '@angular/http'
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(@Inject(Http) private obj,public item:CartitemService) { }
  cartdata;cartda;value=1;qtyy=1;cartlength;cartitemlength;list;locit;sms;

  //////////////////////////////
 
     
  //  callOtherDomain() {
  //   var invocation = new XMLHttpRequest();
  //   var url = 'http://www.onlinebulksmslogin.com/spanelv2/api.php?username=nalax&password=nalax@123&to=6202690566&from=TESTIN&message=hii all';
  //   if(invocation) {    
  //     invocation.open('GET', url, true);
     
  //     invocation.send(); 
  //   }
  // }


  /////////////////////////////
funremoveitem(itm){
  
  var locitm=JSON.parse(this.locit)
 
    locitm.splice(itm,1)
    localStorage.setItem("cart_items",JSON.stringify(locitm))
    window.location.href="/cart"
  
}

  increaseValue(dt,ind){
    if(this.arr[ind].selqty==dt)
   // alert("Exceed....")

   alert('We re sorry! Only ' + this.arr[ind].selqty + ' units for each customer.');

    else
    {
      this.arr[ind].selqty++;
    }
  }
  decreaseValue(ind)
  {
    if(this.arr[ind].selqty>1)
    {
      this.arr[ind].selqty--;
    }
  }
  /////////////////////////////////
 
  callOtherDomain(){
    
    // alert(this.umobileno)
    this.obj.post("http://www.onlinebulksmslogin.com/spanelv2/api.php?username=nalax&password=nalax@123&to=+"+this.umobileno+"&from=TESTIN&message=Hi+"+this.username+" your order is sucessfully we will dilever your product shortely").subscribe(function(res) {
      if(res) {
          this.sms = "sucess";
          alert(this.sms)
      } 
     
    });
  }

  // callOthe(){
  //   //alert(this.umobileno)
  //   alert("hhhhh${this.umobileno}")
  //   this.obj.post("http://www.onlinebulksmslogin.com/spanelv2/api.php?username=nalax&password=nalax@123&to="+id+"&from=TESTIN&message=your order is sucessfully").subscribe(function(res) {
  //     if(res) {
  //         this.sms = "sucess";
  //         alert(this.sms)
  //     } 
     
  //   });
  // }
  /////////////////////////FUNCTION SUM OF CART PRICE /////////////////////////

/////////////////////////////////////////////////// PLACE ORDER ///////////////////////////

  funplaceorder(){
    this.payment();
    this.callOtherDomain();
    var cartitm;
    if(localStorage.getItem('cart_items')!=null){
      cartitm=localStorage.getItem('cart_items')
      cartitm=cartitm.replace(/\\/g,"")
      cartitm=cartitm.replace(/"{/g,"{") 
      cartitm=cartitm.replace(/}"/g,"}")
      cartitm=JSON.parse(cartitm)
     
      var userid=localStorage.getItem('uid')  //////////////////   pending  i have to store user info in local storage
      var prodetails=[]
      for (var i=0; i<cartitm.length;i++){
          var pro:any={};
        
          pro.productid=cartitm[i]._id
          pro.productname=cartitm[i].product
          pro.productqty=cartitm[i].selqty
          pro.productimg=cartitm[i].pimg
          pro.productprice=cartitm[i].price
          pro.productcolor=cartitm[i].productcolor
          prodetails.push(pro)
         
        }
        alert(userid)
        var prodet ={userid:userid,product:prodetails}
       this.obj.post("userser/placeorder",prodet).subscribe(suc=>{
        alert(suc._body)
       }) 

    }


  }

  ////////////////////////////////// PAYMENT ////////////////////////////////////////

  payment(){
 
    var userpayinf ={totalamount:this.costarr,usermobileno:this.umobileno,customernam:this.username,custemail:this.useremail}
    this.obj.post("payment/customerpayment",userpayinf).subscribe(suc=>{
     
     var  purl=suc._body;
     
      location=purl
     }) 
  }

  /////////////////////////////////////////////////////////////////////////////////////////
  costarr=0;umobileno;
  
  tot_cart_items;arr;username;useremail;

  ngOnInit() {

    
    this.umobileno=localStorage.getItem("umobile")
    this.username=localStorage.getItem("userpf");
    this.useremail=localStorage.getItem("cusemail");
   //alert(this.username)
    this.locit=localStorage.getItem("cart_items")
    if(localStorage.getItem('cart_items')!=null){
      var cartlength=(JSON.parse(localStorage.getItem('cart_items')));
      this.item.funchangeinitialitem(cartlength.length.toString());
  
    }else
    {
    this.item.funchangeinitialitem("0");
    }
    this.item.currentcartitem.subscribe(citm=>{
      this.cartitemlength=citm
    })
   
    var arr=localStorage.getItem("cart_items")
    
    arr=arr.replace(/\\/g,"")
    arr=arr.replace(/"{/g,"{") 
    arr=arr.replace(/}"/g,"}")
    this.arr=JSON.parse(arr)
     this.tot_cart_items=arr.length
    
     
      var cost=[]
      for(var i=0;i<this.arr.length;i++){
        var obj=this.arr[i]
        cost[i]=obj.price*this.arr[i].selqty
       
      }

        for(var j=0;j<cost.length;j++){
          this.costarr +=parseInt(cost[j])
        }

      
  }


}
