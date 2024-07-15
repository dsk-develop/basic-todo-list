import { Component,inject} from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  loginObj : any = { }
  // loginForm: any;  
  http = inject(HttpClient);
  apiService: any;
  constructor(
    private router: Router,
    private toastr: ToastrService
  ) {}
  ngOnInit():void{
    this.apiService.jwtToken.subscribe((token: any) =>{
      if(token){
        this.router.navigateByUrl('/').then();
      }
    });
  }
  onLogin() {
    this.loginObj = { email: this.email, password: this.password };
    this.http.post("https://freeapi.miniprojectideas.com/api/JWT/Login", this.loginObj).subscribe((res: any) => {
      if (res.result) {
        alert("Login Successful");
        this.router.navigateByUrl("/todo");
        this.toastr.success('Login successful!', 'Success');
      } else {
        alert("Check your username and password");
        this.toastr.error('Login failed. Please try again.', 'Error');
      }
    }, (error) => {
      this.toastr.error('Login failed. Please try again.', 'Error');
    });
  }
  // userLogin(loginForm: NgForm):void {
  //   if(this.loginForm.invalid) {
  //     return;
  //   }
  //   const{username,password} = loginForm.value;
  //   this.apiService.login(username, password);
  //   //whether the login is succesfull or not reset form
  //   return loginForm.reset(); 
  // }
  showNotification() {
    this.toastr.success('Operation successful!', 'Success', { timeOut: 1000 });
  }
  // onLogin() {
  //   // debugger;
  //   this.http.post("https://freeapi.miniprojectideas.com/api/JWT/Login",this.loginObj).subscribe((res:any) => {
  //     if(res.result){
  //       alert("Login Succesfully")
  //       this.router.navigateByUrl("todo")
  //     } else {
  //       alert("Check your username and password");
  //     }
  //   })
  //   this.router.navigate(['/main']);
  //   this.toastr.success('Login successful!', 'Success');
  // }
  navigateToRegister() {
      this.router.navigate(['/register']);
  }
}
