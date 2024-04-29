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
}