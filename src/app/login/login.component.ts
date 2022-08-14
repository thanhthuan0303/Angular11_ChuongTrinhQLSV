import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  public loginForm !: FormGroup;
  responsedata: any;

  constructor(private formBuilder: FormBuilder,private Login : LoginService,
    private router : Router) { }

  async login() {
    this.Login.getlogin ()
    .subscribe(res=>{
      const user = res.find((a:any)=>{
        return a.user === this.loginForm.value.user && a.password === this.loginForm.value.password
      });
      if(user){
        alert("Login Success!!");
        this.loginForm.reset();
        localStorage.setItem('token',this.responsedata);
        this.router.navigate(['admin']);
      }
      else{
        alert("User not found!!")
      }
    },err=>{
      alert("Something went wrong!!")
    })
  }
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      user: [''],
      password: ['']
    });
  }
}
