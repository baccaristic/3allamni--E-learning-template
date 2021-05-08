import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  isMine:boolean = false;
  threads!:number;
  posts!:number;
  views!:number;
  id!:string;
  img!:any
  email!:any;
  nom!:any
  prenom!:any
  phone!:any
  status:any
  web:any;
  git:any;
  twt:any
  insta:any
  fb:any
  genre:any;
  constructor(private route :ActivatedRoute) {
    
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
      this.isMine  = this.id == localStorage.getItem("id");
  });
   }

  async ngOnInit() {
    
    const rep = await fetch(`http://127.0.0.1:8000/countThreads?id=${this.id}`) 
    if (rep.ok){
      rep.json().then(data =>{
        if (JSON.stringify(data) !="[]"){
          this.threads = data[0].threads;
        }
        else{
          this.threads = 0;
        }
        
      })
    }
    const rep2 = await fetch(`http://127.0.0.1:8000/countPosts?id=${this.id}`);
    if (rep2.ok){
      rep2.json().then(data =>{
        if (JSON.stringify(data) !="[]"){
          this.posts = data[0].posts;
        }
        else{
          this.posts = 0;
        }
      })
    }
    const rep3= await fetch(`http://127.0.0.1:8000/countViews?id=${this.id}`)
    if (rep3.ok){
      rep3.json().then(data =>{
        if (JSON.stringify(data) !="[]"){
          this.views = data[0].views;
        }
        else{
          this.views = 0;
        }
      })
    }
    const rep4 = await fetch(`http://127.0.0.1:8000/user?id=${this.id}`);
    if(rep4.ok){
      rep4.json().then(data =>{
        this.nom = data[0].nom;
        this.prenom = data[0].prenom;
        this.email =data[0].email_etu;
        this.img = data[0].img_etu
        this.phone = data[0].phone
        this.status = data[0].status
        this.fb = data[0].facebook
        this.insta = data[0].instagram
        this.twt = data[0].twitter
        this.git = data[0].github
        this.web = data[0].website
        this.genre  = data[0].genre
      })
    }
  }
  getImg(){
    let MALE_ICON = "https://www.w3schools.com/howto/img_avatar.png";
    let FEMALE_ICON = "https://www.w3schools.com/howto/img_avatar2.png";


    
    if (this.img){
      return this.img;
    }
    else{
      if (this.genre == "male"){
        return MALE_ICON;
      }
      else{
        return FEMALE_ICON;
      }
    }
  }
 getNom(){
  return this.nom;
 }
 getPrenom(){
  return this.prenom;
 }
 getPhone(){
   return this.phone
 }
 getEmail(){
   return this.email
 }
 getFb(){
   return this.fb
 }
 getInsta(){
   return this.insta
 }
 getStatus(){
   return this.status
 }
 getWeb(){
   return this.web
 }
 getGit(){
   return this.git
 }
 getTwitter(){
   return this.twt
 }
}
