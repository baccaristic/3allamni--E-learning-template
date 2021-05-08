import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {
  public questions : any;
  router : any;
  constructor(private http : HttpClient , router:Router){
    this.router = router;

  }
  title = 'Forum';
  public current_page = 1;
  public prev_btn_state="disabled";
  public next_btn_state="";
  public start = 0;
  public MAX_PAGE = 4
 
   async ngOnInit() {
     this.http.get("http://127.0.0.1:8000/forum")
       .subscribe((googleVolumeListResponse) => {

        this.questions= googleVolumeListResponse;
       
        let data : {nom:string,prenom:string , img:string , title:string , desc:string , id:number}[] = [];
        let i = 0;
        for (let obj in this.questions){
          let id = this.questions[obj].question_asker;
          let o = this.questions[obj];
          this.http.get(`http://127.0.0.1:8000/user?id=${id}`).subscribe((datas) => {
            let s = datas  as {nom:string,prenom:string,img_etu:string,genre:string}[];
     
            let image :any;
            if (s[0].img_etu){
              image = s[0].img_etu;
            }
            else{
              if (s[0].genre == "male"){
                image = "https://www.w3schools.com/howto/img_avatar.png";
              }
              else{
                image = "https://www.w3schools.com/howto/img_avatar2.png";
              }
            }
            data.push({nom:s[0].nom , prenom:s[0].prenom , img:image , title:o.question_title , desc:o.question_desc , id:o.question_id});
           
          })
          i = i+1;
         
       
        }
        localStorage.setItem("lng" , i.toString());
        
        this.questions = data;
         // @TODO: this.bookList = ...
       });
      
      if (this.current_page === this.max_page_nb){
        this.next_btn_state = "disabled";
      }
       
           
  }
  redirectTo(id:number){
    console.log(id);
    this.router.navigate([`/thread`],{ queryParams: { id: id }});
  }
 public test = 0;
  

  public max_page_nb  = 0;
  Next(){
   this.test = this.start+this.MAX_PAGE;
  if (this.test > parseInt(localStorage.getItem("lng")!)){
    this.test =  parseInt(localStorage.getItem("lng")!);
  }
  this.max_page_nb = Math.floor(parseInt(localStorage.getItem("lng")!)/ this.MAX_PAGE);
  console.log(this.max_page_nb)
  this.prev_btn_state="";
  if (this.current_page ===this.max_page_nb){
    this.current_page++
    this.next_btn_state="disabled";

    //this.start=parseInt(localStorage.getItem("lng")!)-this.MAX_PAGE
  }
  else{
    this.current_page++;
    this.start+=this.MAX_PAGE +1;}
    }

  Prev(){
  this.next_btn_state=""
  	if (this.current_page<= 2){
    this.current_page--
    this.prev_btn_state="disabled";
    this.start=0;
  	}
  	else{
    this.start-=this.MAX_PAGE;
  	this.current_page--;
  	}
  }


}
