import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-teacher-profile',
  templateUrl: './teacher-profile.component.html',
  styleUrls: ['./teacher-profile.component.css']
})
export class TeacherProfileComponent implements OnInit {
id:any;
teacher:any;
courses:any;
  constructor(private route :ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
  });
  }

  async ngOnInit() {
const rep = await fetch(`http://127.0.0.1:8000/teacher/info?id=${this.id}`);
if (rep.ok){
  rep.json().then(data =>{
    this.teacher = data[0];
  })
}
const rep2 = await fetch(`http://127.0.0.1:8000/teacher/courses/get?id=${this.id}`)
if(rep2.ok){
  rep2.json().then(data =>{
    this.courses = data;
  })
}
  }

}
