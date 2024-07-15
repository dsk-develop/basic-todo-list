import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      // username: ['', [
      //   Validators.required,
      //   Validators.minLength(3),
      //   Validators.pattern('^[a-zA-Z0-9]+$')
      // ]],
      username: ['', [
        Validators.required, 
        Validators.minLength(3),
        Validators.pattern(/^[a-zA-Z0-9]+$/)  
      ]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value ? null : { mismatch: true };
  }

  onRegister() {
    if (this.registerForm.valid) {
      this.http.post("https://freeapi.miniprojectideas.com/api/JWT/Register", this.registerForm.value).subscribe((res: any) => {
        if (res.result) {
          this.toastr.success('Registration successful!', 'Success');
          this.router.navigateByUrl('/'); 
        } else {
          this.toastr.error('Registration failed. Please try again.', 'Error');
        }
      }, (error) => {
        this.toastr.error('Registration failed. Please try again.', 'Error');
      });
    } else {
      this.toastr.error('Please fill out the form correctly.', 'Error');
    }
  }
}
