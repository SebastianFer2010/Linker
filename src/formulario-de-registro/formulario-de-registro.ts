import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioRegistro, ValidacionesRegistro } from '../MODELS/registro.interfaces';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router'; 
@Component({
  imports: [CommonModule,FormsModule,RouterLink],
  selector: 'app-formulario-de-registro',
  styleUrl: './formulario-de-registro.sass',
  templateUrl: './formulario-de-registro.html',
})
export class FormularioDeRegistro {
  nuevoUsuario :UsuarioRegistro = {
nombre:'',
correo:'',
contrasena:'',
confirmacioncontrasena:''
};

mensajes : ValidacionesRegistro ={
camposIncompletos:'POR FAVOR DE LLENAR TODOS LOS CAMPOS ',
contrasenaDiferente:'CONTRASENA INCORRECTA',
exito:'REGISTRO EXITOSO PARA '
};

onRegistro(){
if(this.nuevoUsuario.nombre.trim() === ''|| this.nuevoUsuario.correo.trim() === ''|| this.nuevoUsuario.contrasena.trim() === '' || this.nuevoUsuario.confirmacioncontrasena.trim() === ''){
alert(this.mensajes.camposIncompletos);
return;
}
if(this.nuevoUsuario.contrasena !== this.nuevoUsuario.confirmacioncontrasena){
alert(this.mensajes.contrasenaDiferente);
return;
}
console.log('Datos a guardar:', this.nuevoUsuario);
  alert(`${this.mensajes.exito}${this.nuevoUsuario.nombre}!`);
}

}
