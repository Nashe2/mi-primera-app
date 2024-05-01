import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  //Array con signal para reactividad
  tasks = signal(['Instalar el Angular CLI', 'Crear proyecto', 'Crear componentes', 'Crear servicio']);
}
