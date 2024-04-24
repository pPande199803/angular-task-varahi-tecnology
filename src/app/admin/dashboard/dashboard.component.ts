import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userName: string = '';

  userId: any;

  user: any;

  constructor() { }

  ngOnInit(): void {
    this.user = localStorage.getItem('adminData');
    const user = JSON.parse(this.user)
    this.userName = user[0].userName;
    console.log(this.userName)
    this.userId = user[0].id
  }

}
