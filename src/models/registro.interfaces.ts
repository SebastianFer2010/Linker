export interface UsuarioRegistro {
  nombre: string;
  correo: string;
  contrasena: string;
  confirmacionContrasena: string;
}

export interface ValidacionesRegistro {
  camposIncompletos: string;
  contrasenaDiferente: string;
  exito: string;
}
