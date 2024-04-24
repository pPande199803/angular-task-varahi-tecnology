import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {

  userId: any;

  userData: any;

  isEditValue: boolean = false;

  updateButton: boolean = false;

  userFormData!: FormGroup;

  constructor(private activatedRoute: ActivatedRoute, 
    private service: SharedService, private fb: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.params['id'];
    // console.log(this.userId);
    this.getUserById();
    this.isEditValue = true;
    this.updateButton = false;
    this.userFormData = this.fb.group({
      "firstName": '',
      "lastName": '',
      "userName": '',
      "password": '',
      "role": ''
    })
  }

  getUserById() {
    this.service.getUserById(this.userId).subscribe((res: any) => {
      // console.log(res)
      this.userData = res;
      this.userFormData.setValue({
        "firstName": res.firstName,
        "lastName": res.lastName,
        "userName": res.userName,
        "password": res.password,
        "role": res.role
      })
    })
  }



  updateUserData() {
    this.service.updateUserDetailsById(this.userId, this.userFormData.value).subscribe((res) => {
      alert('Update User SuccessFully...')
      this.isEditValue = true;
      this.updateButton = false;
      let toggle = document.getElementById('toggle');
      toggle?.click();
      // console.log(res)
    }, error => {
      console.log(`error -----${error}`)
    })
  }


  isValueEdit(value: any) {
    this.isEditValue = true
    console.log(value.value);

    this.updateButton = false
    if (value.value === 'checked') {
      value.value = 'unChecked'
      this.isEditValue = false;
    } else {
      value.value = 'checked';
      this.isEditValue = true;
    }
    if (value.value === 'unChecked') {
      this.updateButton = true
    }
  }

}
