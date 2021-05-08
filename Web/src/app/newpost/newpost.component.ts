import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-newpost',
  templateUrl: './newpost.component.html',
  styleUrls: ['./newpost.component.css']
})
export class NewpostComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  async Post(){
var title =  (<HTMLInputElement>document.getElementById("title")).value;
var desc =  (<HTMLInputElement>document.getElementById("desc")).value;
var cnt =  (<HTMLInputElement>document.getElementById("cnt")).value;
var id = localStorage.getItem("id");
const response = await fetch("http://127.0.0.1:8000/post", {
        method: 'POST',
        body:`{"title":"${title}","desc":"${desc}" , "cnt":"${cnt}" , "id":"${id}"}`});
        if(response.ok){
          console.log("Done");
        }
}
}
