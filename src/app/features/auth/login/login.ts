import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../../core/services/auth';
import { LoginData } from '../../../core/models/model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
private fb=inject(FormBuilder);
private auth=inject(Auth);
private router = inject(Router); 
loginForm=this.fb.group({
  email:['',[Validators.required,Validators.email]],
  password:['',[Validators.required,Validators.minLength(6)]]
})
// 
onSubmit(){
  if(this.loginForm.valid){
    this.auth.login(this.loginForm.value as LoginData).subscribe({
       next: res => {
        console.log('User logged in', res);
        this.router.navigate(['/dashboard']); 
      },
      error: err => console.error(err)
    });
  }
}
}
