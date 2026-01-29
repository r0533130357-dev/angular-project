import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../../core/services/auth';
import { RegisterData } from '../../../core/models/model';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  private fb = inject(FormBuilder);
  private auth = inject(Auth);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  
  serverError: string = '';
  
  registerForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })
  
  onSubmit() {
    this.serverError = '';
    
    if (this.registerForm.valid) {
      this.auth.register(this.registerForm.value as RegisterData).subscribe({
        next: res => {
          console.log('User registered', res);
          this.router.navigate(['/login']);
        },
        error: err => {
          console.error(err);
          this.serverError = 'כתובת מייל קיימת';
          this.cdr.detectChanges();
        }
      });
    }
  }
}