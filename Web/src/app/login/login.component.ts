import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  router: any;
 

  constructor(router:Router) { 
  this.router = router;
  }

  ngOnInit(): void {
  }
  async Login(){
    var user  = (<HTMLInputElement>document.getElementById("users")).value;
    var pwd  = (<HTMLInputElement>document.getElementById("pwds")).value;
    console.log(user , pwd);
    const response = await fetch("http://127.0.0.1:8000/login", {
      method: 'POST',
      body:`{"user":"${user}","pwd":"${pwd}"}`});
      if(response.ok){
          response.json().then(async (data) =>{
            console.log(data);
            if (JSON.stringify(data) !="[]"){
              let datas=  JSON.parse(JSON.stringify(data));
              localStorage.setItem("nom" , datas["0"].nom);
              localStorage.setItem("prenom" , datas["0"].prenom);
              if (datas["0"].img_etu){
                localStorage.setItem("img",datas["0"].img_etu);
              }
              else{
                if (datas["0"].genre == "male"){
                  localStorage.setItem("img","https://www.w3schools.com/howto/img_avatar.png");
                }
                else{
                  localStorage.setItem("img","https://www.w3schools.com/howto/img_avatar2.png");
                }
              }
              if (datas["0"].phone){
                localStorage.setItem("phone" , datas["0"].phone)
              }
              else{
                localStorage.setItem("phone" , "Not specified")
              }
              localStorage.setItem("genre" , datas["0"].genre);
              localStorage.setItem("id" , datas["0"].id_etu);
              localStorage.setItem("isLoggedin" , "true");
              localStorage.setItem("email" , datas["0"].email_etu)
              localStorage.setItem("facebook" , datas["0"].facebook)
              localStorage.setItem("instagram" , datas["0"].instagram)
              localStorage.setItem("status" , datas["0"].status)
              localStorage.setItem("twitter" , datas["0"].twitter)
              localStorage.setItem("website" , datas["0"].website)
              localStorage.setItem("github" , datas["0"].github)
              this.router.navigate(['/home']);
            }
            else{
              var d = document.getElementById("wrong");
              if(!d){document.getElementById("wrongholder")!.insertAdjacentHTML('beforeend', '<b style="color: red;" id = "wrong">Email/password invalid</b>');}
              
            }
            
          });
          
        
          

}
  }
  async SignUp(){
  var nom = (<HTMLInputElement>document.getElementById("nom")).value;
  var prenom = (<HTMLInputElement>document.getElementById("prenom")).value;
  var email = (<HTMLInputElement>document.getElementById("email")).value;
  var password = (<HTMLInputElement>document.getElementById("password")).value;
  var dn = (<HTMLInputElement>document.getElementById("dn")).value;
  var genre = (<HTMLInputElement>document.getElementById("genre")).value;

  const response = await fetch("http://127.0.0.1:8000/register", {
        method: 'POST',
        body:`{"email":"${email}","pwd":"${password}" , "nom":"${nom}" , "prenom":"${prenom}" , "dn":"${dn}" ,"genre":"${genre}"}`});
        if(response.ok){
          response.json().then(data =>{
            if (JSON.stringify(data).includes("Email")){
              var d = document.getElementById("wrong2");
              if(!d){document.getElementById("wrongholder2")!.insertAdjacentHTML('beforeend', '<b style="color: red;" id = "wrong2">Email already exists</b>');}
            }
            else{
              localStorage.setItem("id" , data[0].id_etu);
              localStorage.setItem("nom" , nom);
              localStorage.setItem("prenom" , prenom);
              localStorage.setItem("isLoggedin" , "true")
              localStorage.setItem("genre" , "male");
              this.router.navigate(['/profile']);
            }
          })
        }
  
  }
  su(){
    let c=document.getElementById("container")!;
    c.classList.add("sign-up-mode");
   
    }
    si(){
      let c1=document.getElementById("container")!;
     c1.classList.remove("sign-up-mode");
    }
}
