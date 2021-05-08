import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router:Router) { }
  public isLoggedIn : boolean  = false;
  isLoggedInTeach :boolean = false;
  prenom : string = "";
  nom : string = "";
  id:any;
  ngOnInit(): void {
    this.id = localStorage.getItem("id")
    this.isLoggedIn = localStorage.getItem("isLoggedin") == "true";
    this.isLoggedInTeach = localStorage.getItem("isLoggedInTeach") == "true";
  }
  getIsLoggedIn(){
    console.log(localStorage.getItem("isLoggedin") == "true");
    return localStorage.getItem("isLoggedin") == "true";
   
  }
  getIsLoggedInTeach(){
    return localStorage.getItem("isLoggedInTeach") == "true";
  }
  Logout(){
    localStorage.clear();
    this.isLoggedIn = false;
    this.isLoggedInTeach = false;
  }
  getPrenom(){
    return localStorage.getItem("prenom");
  }
  getNom(){
    return localStorage.getItem("nom");
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
  goToProfile(){
    this.router.navigate([`/profile`],{ queryParams: { id: localStorage.getItem("id") }});
  }
  async LoginClick(){
    
      var user  = (<HTMLInputElement>document.getElementById("user")).value;
      var pwd =(<HTMLInputElement>document.getElementById("pwd")).value;
      const response = await fetch("http://127.0.0.1:8000/login", {
        method: 'POST',
        body:`{"user":"${user}","pwd":"${pwd}"}`});
        if(response.ok){
            response.json().then(function(data){
              if (JSON.stringify(data) !="[]"){
                let datas=  JSON.parse(JSON.stringify(data));
                localStorage.setItem("nom" , datas["0"].nom);
                localStorage.setItem("prenom" , datas["0"].prenom);
                localStorage.setItem("img",datas["0"].img_etu);
                localStorage.setItem("genre" , datas["0"].genre);
                localStorage.setItem("id" , datas["0"].id_etu);
                localStorage.setItem("isLoggedin" , "true");
                window.location.reload();
              }
              else{
                var d = document.getElementById("wrong");
                if(!d){document.getElementById("logform")!.insertAdjacentHTML('beforeend', '<b style="color: red;" id = "wrong">Email/password invalid</b>');}
                
              }
              
            });
            
          
            

  }
}

}
