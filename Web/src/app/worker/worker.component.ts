import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.css']
})
export class WorkerComponent implements OnInit {
  @Input() id_worker!: number;
  teacher:any;
  constructor(private router:Router) 
  {
  
   }
  async ngOnInit(){
    console.log(this.id_worker)
    const rep = await fetch(`http://127.0.0.1:8000/teacher?id=${this.id_worker}`);
    if(rep.ok){
      rep.json().then(data =>{
        this.teacher = data;
      })
    }
  }
  goTo(id:any){
    this.router.navigate([`/teachers/profile`],{ queryParams: { id: id }});
  }

}
