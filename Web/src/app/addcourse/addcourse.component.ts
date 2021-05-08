import { Component, OnInit } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
@Component({
  selector: 'app-addcourse',
  templateUrl: './addcourse.component.html',
  styleUrls: ['./addcourse.component.css']
})
export class AddcourseComponent implements OnInit {
  id!:any;
  courses:any;
  pdf:any;
  constructor(private sanitizer:DomSanitizer) { }
  async confirmation(id:any){
    let body = `{"id":"${id}"}`
    const rep =await fetch("http://127.0.0.1:8000/teacher/courses/del" , {
      method:"POST" , 
      body :body
    })
    window.location.reload()
  }
  catlist:any;
  async add(){
    this.id = localStorage.getItem("teacher_id")
    var nom = (<HTMLInputElement>document.getElementById("nom")).value;
    var desc = (<HTMLInputElement>document.getElementById("desc")).value;
    var cat = (<HTMLSelectElement>document.getElementById("cat")).value;
    let body = `{"nom":"${nom}" , "desc":"${desc}" , "cat":"${cat}", "img":"${this.url}" , "pdf":"${this.pdf}" , "id":"${this.id}"}`
    const rep = await fetch("http://127.0.0.1:8000/teacher/courses/add" , {
      method:"POST", 
      body:body
    })
    if (rep.ok){
      rep.json().then(data =>{
        console.log(data)
      })
    }
    window.location.reload()

  }
   upload(){
     document.getElementById('image')?.click();
     
   }
   upload2(){
    document.getElementById('pdf')?.click();
   }
  url!: string;
  onSelectFile(event: any) { // called each time file input changes
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();

        reader.readAsDataURL(event.target.files[0]); // read file as data url
       
        reader.onload = async (event) => { // called once readAsDataURL is completed
          this.url = event.target!.result as string;
         
          }
        }
      }
      onSelectFile2(event: any) { // called each time file input changes
        if (event.target.files && event.target.files[0]) {
          var reader = new FileReader();
  
          reader.readAsDataURL(event.target.files[0]); // read file as data url
         
          reader.onload = async (event) => { // called once readAsDataURL is completed
            this.pdf = event.target!.result as string;
           
            }
          }
        }
  async ngOnInit(){
    this.id = localStorage.getItem("teacher_id")
    const rep = await fetch(`http://127.0.0.1:8000/teacher/courses/get?id=${localStorage.getItem("teacher_id")}`);
    if (rep.ok){
      rep.json().then(data =>{
        this.courses = data;
      })
    }
    const response = await fetch("http://127.0.0.1:8000/category");
    if (response.ok){
      response.json().then(async (data) => {
        this.catlist = data;
      }
      )}
}
}
