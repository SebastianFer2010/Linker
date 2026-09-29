import { Routes } from '@angular/router';
import { Login } from '../login/login';
import { FormularioDeRegistro } from '../formulario-de-registro/formulario-de-registro';
import { Inicio } from '../inicio/inicio';
import { autenticacionGuard, soloInvitadosGuard } from '../servicios/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'inicio', component: Inicio, canActivate: [autenticacionGuard] },
  { path: 'login', component: Login, canActivate: [soloInvitadosGuard] },
  { path: 'registro', component: FormularioDeRegistro },
  { path: '**', redirectTo: 'login' },
];
