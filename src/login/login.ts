import { AfterViewInit, Component, NgZone, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { login, ValidacionesLogin } from '../MODELS/Login.interfaces';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../servicios/auth.service';
import { environment } from '../environments/environment';

interface RespuestaGoogle {
  credential: string;
}

interface ServiciosIdentidadGoogle {
  accounts: {
    id: {
      initialize(opciones: {
        client_id: string;
        callback: (respuesta: RespuestaGoogle) => void;
      }): void;
      renderButton(
        contenedor: HTMLElement,
        opciones: { theme: 'outline'; size: 'large'; type: 'standard' },
      ): void;
    };
  };
}

declare global {
  interface Window {
    google?: ServiciosIdentidadGoogle;
  }
}

@Component({
  imports: [FormsModule, RouterLink],
  selector: 'app-login',
  styleUrl: './login.sass',
  templateUrl: './login.html',
})
export class Login implements AfterViewInit {
  private readonly router = inject(Router);
  private readonly zona = inject(NgZone);
  private readonly authService = inject(AuthService);

  cargando = false;
  mensajeGoogle = '';

  credencialesUsuario: login = {
    usuario: '',
    contrasena: '',
  };

  mensajes: ValidacionesLogin = {
    camposVacios: 'Por favor llene los campos ',
    exito: 'Iniciando sesion con ',
  };

  private readonly callbackGoogle = (respuesta: RespuestaGoogle): void => {
    this.zona.run(() => {
      this.cargando = true;
      this.mensajeGoogle = '';

      this.authService.iniciarSesionGoogle(respuesta.credential).subscribe({
        next: () => {
          this.cargando = false;
          void this.router.navigate(['/inicio']);
        },
        error: () => {
          this.cargando = false;
          this.mensajeGoogle =
            'No se pudo validar la sesión. Comprueba que el servicio de autenticación esté disponible.';
        },
      });
    });
  };

  ngAfterViewInit(): void {
    this.inicializarBotonGoogle();
  }

  private inicializarBotonGoogle(intento = 1): void {
    if (typeof window === 'undefined') {
      return;
    }

    const google = window.google;
    const contenedorBoton = document.getElementById('boton-google');

    if (google && contenedorBoton) {
      google.accounts.id.initialize({
        client_id: environment.googleClientId,
        callback: this.callbackGoogle,
      });
      google.accounts.id.renderButton(contenedorBoton, {
        theme: 'outline',
        size: 'large',
        type: 'standard',
      });
      return;
    }

    if (intento < 20) {
      window.setTimeout(() => this.inicializarBotonGoogle(intento + 1), 100);
    }
  }

  onLogin(){
    if(this.credencialesUsuario.usuario.trim() === '' || this.credencialesUsuario.contrasena.trim() === ''){
      alert(this.mensajes.camposVacios);
      return;
    }

    this.cargando = true;

    setTimeout(() =>{
      this.cargando = false;
      alert(this.mensajes.exito + this.credencialesUsuario.usuario +'!');
    },5000);
  }
}