import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.css']
})
export class JoinComponent implements OnInit {

  constructor() { }
title: any ; Fname:any;
Lname:any;
Email:any;
Num:any;
Link:any;
  ngOnInit(): void {
  this.title = 'Form';
  this.Fname = new FormControl('');
  this.Lname = new FormControl('');
  this.Email = new FormControl('');
  this.Num = new FormControl('');
  this.Link = new FormControl('');
  }

}
