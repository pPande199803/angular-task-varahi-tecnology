import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent implements OnInit {

  loginDisable: boolean = false;
  registerDisable: boolean = false;

  registerForm !: FormGroup;

  loginForm !: FormGroup;

  constructor(private service: SharedService, private fb: FormBuilder, private router: Router) { }


  ngOnInit(): void {
    localStorage.clear();
    this.showLoginForm();
    this.registerForm = this.fb.group({
      "firstName": ['',[Validators.required]],
      "lastName": ['',[Validators.required]],
      "userName": ['',[Validators.required]],
      "password": ['',[Validators.required]],
      "role": ['',[Validators.required]]
    })

    this.loginForm = this.fb.group({
      "userName": ['',[Validators.required]],
      "password": ['',[Validators.required]]
    })
  }

  get l(){
    return this.loginForm.controls;
  }
  get r(){
    return this.registerForm.controls;
  }

  loginUser() {
    // debugger
    this.service.getUsers().subscribe((res: any) => {
      // console.log(res)

      const user = res.filter((x: any) => {
        return this.loginForm.value.userName === x.userName && this.loginForm.value.password === x.password
      })

      const currentUser = user[0];

      if (!currentUser) {
        alert('User Not Found...');
        this.loginForm.reset();
      } else if(currentUser.role === 'admin') {
        alert("User Login Successfully....");
        this.loginForm.reset();
        this.router.navigate(['/admin'])
        localStorage.setItem('adminData',JSON.stringify(user));
        // console.log(user)
      } else {
        alert("User Login Successfully....");
        this.loginForm.reset();
        this.router.navigate(['/users'])
        localStorage.setItem('userData', JSON.stringify(user));
      }
    })
  }

  userRegister() {
    this.service.userRegisterData(this.registerForm.value).subscribe((res) => {
      alert("Register User Successfully....");
      this.showLoginForm();
      this.registerForm.reset()
    }, error => {
      console.log(`Error --- ${error}`)
    })
  }

  showLoginForm() {
    this.loginDisable = true;
    this.registerDisable = false;
  }
  showRegisterForm() {
    this.loginDisable = false;
    this.registerDisable = true;
  }

}
