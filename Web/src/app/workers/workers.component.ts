import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import data from './worker.json'


@Component({
  selector: 'workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.css']
})
export class WorkersComponent implements OnInit {
  numbers :any;
  public postlist  : {name:string , fb_link:string , twt_link:string,linkin:string,img:string}[] = data;
  constructor(private router:Router) {
    
   }
   goTo(id:any){
    this.router.navigate([`/teachers/profile`],{ queryParams: { id: id }});
  }
   teachers:{nom:string , img:string , id:number}[] = []
    async  ngOnInit() {
  const rep = await fetch("http://127.0.0.1:8000/teacher/best");
  if (rep.ok){
    rep.json().then(async data =>{
      let result = data;
      for (let i  =0 ; i <result.length;i++){
        const rep2 = await fetch(`http://127.0.0.1:8000/teacher/info?id=${result[i].course_owner}`);
        if (rep2.ok){
          rep2.json().then(datas =>{
            let d : {nom:string , img:string , id:number} = {nom:"" , img:"" , id:0}
            d.nom = datas[0].nom_teach;
            d.img  = datas[0].img_teach;
            d.id = datas[0].id_teach;
            this.teachers.push(d);
          })
        }
      }
    })
  }
    }
    
  }


