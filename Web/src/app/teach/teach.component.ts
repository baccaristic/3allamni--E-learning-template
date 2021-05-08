import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teach',
  templateUrl: './teach.component.html',
  styleUrls: ['./teach.component.css']
})
export class TeachComponent implements OnInit {

  constructor() { }
url!:string;
  ngOnInit(): void {
    var div = document.getElementById("bg");
    div?.style.removeProperty("background-image")

  }
  TriggerUpload(){
    var btn  = <HTMLInputElement>document.getElementById("upload");
    btn.click();
  }
  async Upload(){
    var nom = (<HTMLInputElement>document.getElementById("nom")).value;
    var email = (<HTMLInputElement>document.getElementById("email")).value;
    var num = (<HTMLInputElement>document.getElementById("num")).value;
    var link = (<HTMLInputElement>document.getElementById("link")).value;
    var body = `{"name":"${nom}" , "email":"${email}" , "num":"${num}" ,"link":"${link}" ,"cv":"${this.url}"}`
        const rep = await fetch("http://127.0.0.1:8000/request" , {
      method:"POST",
      body:body
    });
    if (rep.ok){
     alert("Request Sent!")
    }
    else{
      alert("Try again!")
    }
  }
  onSelectFile(event: any) { // called each time file input changes
    console.log("here")
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url
     
      reader.onload = async (event) => { // called once readAsDataURL is completed
        this.url = event.target!.result as string;
        console.log(this.url);
      }
    }
}

}
