import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../servicios/auth.service';

@Component({
  imports: [RouterLink],
  selector: 'app-inicio',
  styleUrl: './inicio.sass',
  templateUrl: './inicio.html',
})
export class Inicio {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  cerrarSesion(): void {
    this.authService.cerrarSesion();
    void this.router.navigate(['/login']);
  }
}
