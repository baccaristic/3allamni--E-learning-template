import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'courses',
  templateUrl : './courses-component.html' , 
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {


  constructor(private router:Router) {
   }
   courses:{nom:string , img:string , id:number  , desc:string , views:number , teacher:number}[] = []

   goTo(id:any , id2:any){
    this.router.navigate([`/course`],{ queryParams: { id: id , teacher:id2 }});
   }
  async ngOnInit() {
    const rep = await fetch("http://127.0.0.1:8000/courses/best")
    if (rep.ok){
      rep.json().then(async data =>{
        for (let i =0; i<data.length;i++){
          const rep2 = await fetch(`http://127.0.0.1:8000/getcourse?id=${data[i].id_cours}`)
          if (rep2.ok){
            rep2.json().then(datas=>{
              let d : {nom:string , img:string , id:number  , desc:string , views:number , teacher:number} = {nom:""   , img:""  , id:0 , desc:"" , views:0 , teacher:0}
              d.nom = datas[0].course_name;
              d.img = datas[0].course_img;
              d.id = datas[0].course_id;
              d.desc = datas[0].course_desc;
              d.views = data[i].views
              d.teacher = datas[0].course_owner
              console.log(d)
              this.courses.push(d);
            })
          }
        }
      })
    }
  }
  
  

}
