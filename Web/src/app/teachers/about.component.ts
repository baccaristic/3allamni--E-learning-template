import { Component, OnInit } from '@angular/core';
import tData from './teachers.json'

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./teachers.component.css']
})
export class AboutComponent implements OnInit {
  public postlist  : {name:string , desc:string , img:string}[] = tData;
  constructor() { }
  getTitle(index : number){
    return this.postlist[index].name;
  }
  getDesc(index : number){
    return  this.postlist[index].desc;
  }
  getImg(index : number){
    return this.postlist[index].img;
  }
  ngOnInit(): void {
  }

}
