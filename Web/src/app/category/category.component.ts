import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor() { }
  public loadScript() {
    let body = <HTMLDivElement> document.body;
    let script = document.createElement('script');
    script.innerHTML = '';
    script.src = 'https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js';
    script.async = true;
    script.defer = true;
    body.appendChild(script);
    let script2 = document.createElement('script');
    script2.innerHTML = '';
    script2.src = 'https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha1/js/bootstrap.min.js';
    script2.async = true;
    script2.defer = true;
    body.appendChild(script2);
    //
}
  ngOnInit(): void {
    this.loadScript();
  }

}
