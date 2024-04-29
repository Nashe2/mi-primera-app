import { Component } from '@angular/core';

@Component({
  selector: 'app-labs',
  templateUrl: './labs.component.html',
  styleUrls: ['./labs.component.scss']
})
export class LabsComponent {
  title = 'mi-primera-app';
  welcome = 'Bienvenido a mi primera aplicación Angular';
  tasks = [
    'Instalar el Angular CLI',
    'Crear proyecto',
    'Crear componentes'
  ];
  name = 'Mila';
  age = 27;
  disabled = true;
  img = 'https://w3schools.com/howto/img_avatar.png';

  //Declaro un objeto con sus propiedades
  person = {
    name : 'Nashe',
    age: 18,
    avatar: 'https://w3schools.com/howto/img_avatar.png'
  }

  //Método de mostrar una alerta al dar click en el boton
  clickHandler(){
    alert('Hola')
  }

  //Método de evento, es para hacer un cambio en el input
  changeHandler(event: Event){
    console.log(event);
  }
}
