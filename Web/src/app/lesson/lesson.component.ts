import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css']
})
export class LessonComponent implements OnInit {
course:any;
id!:string;
teacher_id:any;
 constructor(private route: ActivatedRoute,private sanitizer:DomSanitizer) { 
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      this.teacher_id = params['teacher']
 
     
  });
}
async ViewCourse(){
  let body = `{"user":"${localStorage.getItem("id")}","course":"${this.id}"}`
  const rep = await fetch("http://127.0.0.1:8000/view" , {
    method:"POST",
    body:body
  })
  if (rep.ok){
    rep.json().then(data =>{
      console.log(JSON.stringify(data));
    })
  }
}
sanitize(url:string){
  console.log(url)
  return this.sanitizer.bypassSecurityTrustUrl(url);
}
  async ngOnInit() {
    let url = `http://127.0.0.1:8000/getcourse?id=${this.id}`;

    const rep = await fetch(url);
    if(rep.ok){
      rep.json().then((data)=>{
        this.course = data[0];
      })
    }

  }

}
