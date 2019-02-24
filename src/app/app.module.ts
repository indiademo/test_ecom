import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http'
import { RouterModule } from '@angular/router'
import { FormsModule } from '@angular/forms'
import { AppComponent } from './app.component';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';
import { FilterPipeModule } from 'ngx-filter-pipe';

import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { LandingComponent } from './landing/landing.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { CartComponent } from './cart/cart.component'
import { CartitemService } from './cartitem.service';
import { SucessorderComponent } from './sucessorder/sucessorder.component'
import {ImageZoomModule} from 'angular2-image-zoom';
import { WishlistComponent } from './wishlist/wishlist.component';
import { OrdersComponent } from './orders/orders.component';
import { ActivateuserComponent } from './activateuser/activateuser.component';


var rout=[{
  path: '', component: LandingComponent 
 
},{
  path:'landing',component:LandingComponent
},{
  path:'product',component:ProductComponent
},{
  path:'productdetails',component:ProductdetailsComponent
},{
  path:'userprofile_old',component:UserprofileComponent
},{
  path:'cart',component:CartComponent
},{
  path:'wishlist',component:WishlistComponent
},{
  path:'sucessorder',component:SucessorderComponent
},{
  path:'orders',component:OrdersComponent
},{
  path:'activateuser',component:ActivateuserComponent
},{
  path:'userprofile',component:UserprofileComponent,
  children: [
    { path: 'wishlist', component: WishlistComponent },
    {path:"landing", component:LandingComponent}
  ]
}]

var routr=RouterModule.forRoot(rout, { useHash: true }) 

//RouterModule.forRoot(yourRoutesHere, { useHash: true })

@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    ProductComponent,
    ProductdetailsComponent,
    LandingComponent,
    UserprofileComponent,
    CartComponent,
    SucessorderComponent,
    WishlistComponent,
    OrdersComponent,
    ActivateuserComponent
  ],
  imports: [
    BrowserModule,HttpModule,routr,RouterModule,FormsModule,BrowserAnimationsModule,ImageZoomModule,FilterPipeModule
   
  ],
  providers: [CartitemService],
  bootstrap: [AppComponent]
})
export class AppModule { }
