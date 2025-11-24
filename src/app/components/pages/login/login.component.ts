import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.userService.login(email, password).subscribe({
      next: (res: any) => {
        console.log("LOGIN SUCCESS:", res);

        // ➜ Important : la propriété s'appelle access_token
        const token = res["access_token"];
        if (!token) {
          alert("Token non reçu !");
          return;
        }

        localStorage.setItem("access_token", token);

        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error("LOGIN ERROR:", err);
        alert("Email ou mot de passe incorrect !");
      }
    });
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }
}
