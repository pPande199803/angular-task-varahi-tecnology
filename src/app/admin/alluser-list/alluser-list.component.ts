import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-alluser-list',
  templateUrl: './alluser-list.component.html',
  styleUrls: ['./alluser-list.component.css']
})
export class AlluserListComponent implements OnInit {

  users: any;

  userForm !: FormGroup;

  updateButton: boolean = false;

  loginButton: boolean = false;

  userId: any;

  p: number = 1;

  constructor(private service: SharedService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.getAllUserData();
    this.userForm = this.fb.group({
      "firstName": ['', [Validators.required]],
      "lastName": ['', [Validators.required]],
      "userName": ['', [Validators.required]],
      "password": ['', [Validators.required]],
      "role": ['user']
    })
  }

  get f() {
    return this.userForm.controls;
  }

  getAllUserData() {
    this.service.getUsers().subscribe((res: any) => {
      let userData = res.filter((x: any) => {
        return x.role === 'user'
      })
      this.users = userData
    })
  }

  createNewUser() {
    this.service.userRegisterData(this.userForm.value).subscribe((res: any) => {
      alert('User Create Successfully..');
      this.userForm.reset();
      let model = document.getElementById('close');
      model?.click();
      this.getAllUserData()
    }, err => {
      console.log(`error---${err}`)
    })
  }

  getAllFields() {
    this.userForm.reset();
    this.updateButton = false;
    this.loginButton = true;
  }

  deleteUser(userId: any) {
    this.service.deleteUserData(userId).subscribe(res => {
      alert('User Deleted Successfully..');
      this.getAllUserData();
    }, err => {
      console.log(`Error---${err}`)
    })
  }

  editUser(user: any) {
    this.updateButton = true;
    this.loginButton = false;
    this.userId = user.id
    this.userForm.setValue({
      "firstName": user.firstName,
      "lastName": user.lastName,
      "userName": user.userName,
      "password": user.password,
      "role": user.role
    })
  }
  updateUserData() {
    this.service.updateUserDetailsById(this.userId, this.userForm.value).subscribe(res => {
      alert('User Updated Successfully..');
      this.getAllUserData();
      let model = document.getElementById('close');
      model?.click();
    }, err => {
      console.log(`error---${err}`)
    })
  }

}
