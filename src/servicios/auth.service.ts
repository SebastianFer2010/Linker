import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable, tap } from 'rxjs';

export interface UsuarioAutenticado {
  sub: string;
  name: string;
  email: string;
  picture?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly plataforma = inject(PLATFORM_ID);
  private readonly claveSesion = 'linker.usuario';

  iniciarSesionGoogle(credential: string): Observable<UsuarioAutenticado> {
    return this.http
      .post<UsuarioAutenticado>('/api/auth/google', { credential })
      .pipe(tap((usuario) => this.guardarSesion(usuario)));
  }

  isLoggedIn(): boolean {
    return this.obtenerUsuario() !== null;
  }

  obtenerUsuario(): UsuarioAutenticado | null {
    if (!isPlatformBrowser(this.plataforma)) {
      return null;
    }

    const sesion = sessionStorage.getItem(this.claveSesion);
    if (!sesion) {
      return null;
    }

    try {
      const usuario = JSON.parse(sesion) as Partial<UsuarioAutenticado>;
      if (typeof usuario.sub === 'string' && typeof usuario.email === 'string') {
        return usuario as UsuarioAutenticado;
      }
    } catch {
      this.cerrarSesion();
    }

    return null;
  }

  cerrarSesion(): void {
    if (isPlatformBrowser(this.plataforma)) {
      sessionStorage.removeItem(this.claveSesion);
    }
  }

  private guardarSesion(usuario: UsuarioAutenticado): void {
    if (isPlatformBrowser(this.plataforma)) {
      sessionStorage.setItem(this.claveSesion, JSON.stringify(usuario));
    }
  }
}