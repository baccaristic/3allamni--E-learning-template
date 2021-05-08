import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher-login',
  templateUrl: './teacher-login.component.html',
  styleUrls: ['./teacher-login.component.css']
})


export class TeacherLoginComponent implements OnInit {
  constructor(private router:Router) { }

  ngOnInit(): void {
  }
async Login(){
  var user = (<HTMLInputElement>document.getElementById("user")).value
  var pwd = (<HTMLInputElement>document.getElementById("pwd")).value
  let body = `{"user":"${user}", "pwd":"${pwd}"}`
  const rep = await fetch("http://127.0.0.1:8000/teacher/login" ,{
    method:"POST"  , 
    body:body
  })
  if (rep.ok){
    rep.json().then(data => {
      if (JSON.stringify(data) == "[]"){
        alert("Wrong")
      }
      else{
        
        localStorage.setItem("isTeacher" , "true")
        localStorage.setItem("teacher_id" , data[0].id_teach)
        localStorage.setItem("isLoggedInTeach" ,"true")
        localStorage.setItem("nom" ,data[0].nom_teach)
        localStorage.setItem("img" ,data[0].img_teach)
        this.router.navigate(['/addCourse']);
      }
    })
  }
}
 
}

