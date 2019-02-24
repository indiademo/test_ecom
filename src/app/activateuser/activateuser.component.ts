import { Component, OnInit,Inject } from '@angular/core';
import { Http } from '@angular/http'

@Component({
  selector: 'app-activateuser',
  templateUrl: './activateuser.component.html',
  styleUrls: ['./activateuser.component.css']
})
export class ActivateuserComponent implements OnInit {

  constructor(@Inject(Http) public obj) { }


  ngOnInit() {
    var url=document.URL;
    var dt=(url.split(";"))
    var av=(dt[1].split("="))
    var ob={active:av[1]}
    this.obj.post("userser/activeuser",ob).subscribe(res=>{
      alert(res._body)
    })
  }

}
