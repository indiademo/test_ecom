import { Component, OnInit ,Inject} from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  constructor(@Inject(Http) public obj,) { }
  wishpro;userid;uuid=null
  ///////////////////////////////// GET WISH LIST //////////////////////////////////////////////////////
funwishlist(){
 
    var obbj={uid:parseInt(this.userid)}
    alert(this.userid)
    this.obj.post("/userser/wishpro",obbj).subscribe(x=>{
      this.wishpro=JSON.parse(x._body)
      // alert(x._body)
    })
  
    
  
}




  ngOnInit() {
    this.userid=localStorage.getItem("uid");
    this.funwishlist();
    

  }

}
