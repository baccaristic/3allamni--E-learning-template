import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor() { }
 url!:string ;
 async Update(){
   var nom  = (<HTMLInputElement>document.getElementById("nom")).value;
   var prenom  = (<HTMLInputElement>document.getElementById("prenom")).value;
   var email  = (<HTMLInputElement>document.getElementById("email")).value;
   var status  = (<HTMLInputElement>document.getElementById("status")).value;
   var pwd  = (<HTMLInputElement>document.getElementById("pwd")).value;
   var pwd2  = (<HTMLInputElement>document.getElementById("pwd2")).value;
   var web  = (<HTMLInputElement>document.getElementById("web")).value;
   var git  = (<HTMLInputElement>document.getElementById("git")).value;
   var twt  = (<HTMLInputElement>document.getElementById("twt")).value;
   var insta  = (<HTMLInputElement>document.getElementById("insta")).value;
   var fb  = (<HTMLInputElement>document.getElementById("fb")).value;
   var num = (<HTMLInputElement>document.getElementById("num")).value;
   if (pwd == pwd2 && pwd){
    let body= `{"nom":"${nom}","prenom":"${prenom}" ,"pwd":"${pwd}" ,"email":"${email}" , "status":"${status}" , "web":"${web}" , "git":"${git}" , "twt":"${twt}" , "insta":"${insta}" , "fb":"${fb}" , "num":"${num}","img":"${this.url}" , "id":"${localStorage.getItem("id")}"}`;
    console.log(body)
    let URL = "http://127.0.0.1:8000/profile/update"
    const rep = await fetch(URL , {
      method:"POST",
      body:body
    });
    if (rep.ok){
      rep.json().then(data=>{
        console.log(data);
        localStorage.setItem("img" , this.url);
        var d = document.getElementById("info")
        if(!d){
          document.getElementById("resp")!.insertAdjacentHTML("beforeend" ,`<div id="info" class="alert alert-info alert-dismissable">
          <a class="panel-close close" data-dismiss="alert">×</a> 
          <i class="fa fa-coffee"></i>
          <strong>Done!</strong>. Please log in again update your profile!.
        </div>` )
        }
      })
    }
   }

 }
  ngOnInit(): void {
    this.url = localStorage.getItem("img")!;
  }
  onSelectFile(event: any) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url
     
      reader.onload = async (event) => { // called once readAsDataURL is completed
        this.url = event.target!.result as string;
        
      }
    }
}
  getImg(){
    let MALE_ICON = "https://www.w3schools.com/howto/img_avatar.png";
    let FEMALE_ICON = "https://www.w3schools.com/howto/img_avatar2.png";


    var img =  localStorage.getItem("img");
    if (img){
      return img;
    }
    else{
      if (localStorage.getItem("genre") == "male"){
        return MALE_ICON;
      }
      else{
        return FEMALE_ICON;
      }
    }
  }
 getNom(){
  return localStorage.getItem("nom");
 }
 getPrenom(){
  return localStorage.getItem("prenom");
 }
 getPhone(){
   return localStorage.getItem("phone")
 }
 getEmail(){
   return localStorage.getItem("email")
 }
 getFb(){
   return localStorage.getItem("facebook")
 }
 getInsta(){
   return localStorage.getItem("instagram")
 }
 getStatus(){
   return localStorage.getItem("status")
 }
 getWeb(){
   return localStorage.getItem("website")
 }
 getGit(){
   return localStorage.getItem("github")
 }
 getTwitter(){
   return localStorage.getItem("twitter")
 }
}
