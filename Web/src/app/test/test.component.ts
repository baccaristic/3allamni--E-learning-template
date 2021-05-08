import { Component, Input, OnInit } from '@angular/core';
class ImageSnippet {
  constructor(public src: string, public file: File) {}
}
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})

export class TestComponent implements OnInit {
  selectedFile!: ImageSnippet;
  constructor() {
    
   }
   url!: string;
   onSelectFile(event: any) { // called each time file input changes
       if (event.target.files && event.target.files[0]) {
         var reader = new FileReader();

         reader.readAsDataURL(event.target.files[0]); // read file as data url
        
         reader.onload = async (event) => { // called once readAsDataURL is completed
           this.url = event.target!.result as string;
           localStorage.setItem("img" , this.url);
           const rep = await fetch("http://127.0.0.1:8000/upload" , {
             method:"POST",
             body : `{ "id":"${localStorage.getItem("id")}","img":"${this.url}"}`
           })
         }
       }
   }
  ngOnInit(): void {
  }
Send(){
  //
}



}
