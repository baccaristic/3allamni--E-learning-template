import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  catlist: any;
  router:any;
  numbers! :any[]
   courses: {[id: number]: { course_id: Number, course_name: string, course_img: string, course_link: string, course_owner: Number, }[]}  = {};
  constructor(router:Router) {
   this.router = router;
   }
   redirectTo(id:Number , teacher:Number){
    console.log(id);
    this.router.navigate([`/course`],{ queryParams: { id: id , teacher:teacher }});
  }
  async ngOnInit() {
    const response = await fetch("http://127.0.0.1:8000/category");
    if (response.ok){
      response.json().then(async (data) => {
        this.catlist = data;
      for(let i=0;i<this.catlist.length;i++){
        const rep = await fetch(`http://127.0.0.1:8000/course?id=${this.catlist[i].cat_id}`);
        if(rep.ok){
          rep.json().then(async (datas) => {
         
            this.courses[this.catlist[i].cat_id] = datas;
          })
        }
      }
  
        
      });
    }
    
  }
  

}
