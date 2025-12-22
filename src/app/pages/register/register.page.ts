import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';
import { Analista } from '../../interfaces/analista';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  isLoading = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.formBuilder.group({
      fullname: ['', [Validators.required]],
      rut: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  ngOnInit() {
  }

  gotologin() {
    this.router.navigate(['/login']);
  }

  onRegister() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      const { fullname, rut, email, password } = this.registerForm.value;

      const analistaData: Analista = {
        rut,
        nombreApellido: fullname,
        correo: email,
        contraseña: password
      };

      this.authService.register(analistaData).subscribe({
        next: (success) => {
          this.isLoading = false;
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Error en registro:', error);
          this.isLoading = false;
        }
      });
    } else {
      console.warn("Formulario inválido");
      this.registerForm.markAllAsTouched();
    }
  }

}
