import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import {  Router } from "@angular/router";
import { jwtDecode } from "jwt-decode";
import { ToastrService } from "ngx-toastr";
import { BehaviorSubject } from "rxjs";
import { ApiService } from "./services/api.service";
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showHomeContent = true; 

  toggleView(showHome: boolean) {
    this.showHomeContent = showHome;
  }
  private tokenSubject = new BehaviorSubject<string>('');
  showMenu: boolean = true;
  username: any = '';
  password: string = '';
  loginObj = {
    username: this.username,
    password: this.password
  };
  showUser: boolean = false;
  title = 'todo-app';
  showTodo: boolean = false;
  isLoginPage: boolean = true;
  isSignUp: boolean = false;
  showForms: boolean = true;
  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService,private apiService: ApiService, 
  ) {
    this.tokenSubject.next('');
    
  }

  ngOnInit(): void {
    // this.apiService.jwtUserToken.subscribe((token: string) => {
    //   if(token) {
    //     const decoded = jwtDecode(token);
    //     // this.username = decoded.username;
    //   }
    //   if(this.username){
    //     this.showMenu = false;
    //   } else {
    //     this.showMenu = true;
    //   }
    // })
  }
  // login
  onLogin(form :any) {
    debugger;
    this.http.post("https://freeapi.miniprojectideas.com/api/JWT/Login",this.loginObj).subscribe((res:any) => {
      if(res.result){
        alert("Login Succesfully")
        this.router.navigateByUrl("todo")
      } else {
        alert("Check your username and password");
      }
    })
    this.router.navigate(['/main']);
    this.toastr.success('Login successful!', 'Success');
  }
  // logout
  // logout():void {
  //   // this.username = '';
  //   // this.username = this.apiService.logout();
  //   console.log('Logout');
  //   this.tokenSubject.next('');
  // }
  logout(): void {
    console.log('Logout');
    // this.apiService.logout(); 
    this.showUser = false; 
    this.router.navigate(['/login']); 
  }
  openTodoForm() {
    this.showTodo = true;
    // this.router.navigate(['/']);
  }
  closeTodoForm() {
    this.showTodo = false;
  }
}
