import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userName : string ='';

  userId:any;

  user:any;

  constructor() { }

  ngOnInit(): void {
    this.user = localStorage.getItem('userData');
    const user = JSON.parse(this.user)
    this.userName = user[0].userName;
    this.userId = user[0].id
  }

}
