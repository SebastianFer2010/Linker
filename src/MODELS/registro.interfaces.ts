export interface UsuarioRegistro{

    nombre:string;
    correo:string;
    contrasena:string;
    confirmacioncontrasena:string;
}

export interface ValidacionesRegistro{
camposIncompletos:string;
contrasenaDiferente:string;
exito:string;
}