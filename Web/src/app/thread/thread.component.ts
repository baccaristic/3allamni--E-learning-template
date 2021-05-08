import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css']
})
export class ThreadComponent implements OnInit {
id!:  string;
img!:string;
question : {nom:string , prenom:string , img:string , title:string , cont:string , id_user:number} = {nom:""  , prenom:"" , img:"" , title:"" , cont:"" , id_user:0}
reponses:{nom:string , prenom:string  , img:string  , cont_rep:string  , id_rep:number}[] = [];
  constructor(private route: ActivatedRoute , private router:Router) { 
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
     
  });
this.img = localStorage.getItem("img")!;
  }
  async Post(){
    var cnt = (<HTMLInputElement>document.getElementById("cnt")).value;
    var usrid=localStorage.getItem("id");
    const rep = await fetch("http://127.0.0.1:8000/thread"  , {
      "method":"POST",
      body:`{"id":"${usrid}" , "qid":"${this.id}" , "cnt":"${cnt}"}`
    })
  }
goTo(id:any){
  this.router.navigate([`/users/profile`],{ queryParams: { id: id }});
}
  async ngOnInit() {
    console.log("here" + this.id)
    const op = await fetch(`http://127.0.0.1:8000/question?id=${this.id}`);
    if(op.ok){
      op.json().then(async (ds)=>{
        this.question.title = ds[0].question_title;
        this.question.cont = ds[0].contenu;
        this.question.id_user = ds[0].question_asker;
        let userid = ds[0].question_asker;
        const userask = await fetch(`http://127.0.0.1:8000/user?id=${userid}`);
        if(userask.ok){
          userask.json().then(finalrep =>{
            this.question.nom = finalrep[0].nom;
            this.question.prenom = finalrep[0].prenom;
        
            if (finalrep[0].img_etu !=""){
              this.question.img = finalrep[0].img_etu;
            }
            else{
              if (finalrep[0].genre == "male"){
                this.question.img = "https://www.w3schools.com/howto/img_avatar.png";
              }
              else{
                this.question.img = "https://www.w3schools.com/howto/img_avatar2.png";
              }
            }
            
            console.log(this.question);
          })
        }
      })
    }
    const response = await fetch(`http://127.0.0.1:8000/reponse?id=${this.id}`);
    if (response.ok){
      response.json().then(async (data) =>{
        
        for(let i=0;i<data.length;i++){
         
          const kek = await fetch(`http://127.0.0.1:8000/user?id=${data[i].id_user}`);
          if (kek.ok){
            kek.json().then((rep) =>{
              var datas : {nom:string , prenom:string  , img:string  , cont_rep:string  , id_rep:number} = {nom:"" , prenom:"" , img:"" , cont_rep:"" , id_rep:data[i].id_user};
              
              datas.nom = rep[0].nom;
              datas.prenom = rep[0].prenom;
              datas.img = rep[0].img_etu;
              datas.cont_rep = data[i].cont_rep;
              this.reponses.push(datas);
            })
          }
          
        }
               
       
      })
    }
  }

}
