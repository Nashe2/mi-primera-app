import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  //Array con signal para reactividad
  tasks = signal([
    'Instalar el Angular CLI',
    'Crear proyecto',
    'Crear componentes',
    'Crear servicio',
  ]);

  //Método de actualizacion de los elementos del arreglo tasks
  changeHandler(event: Event) { //funcion declarativa con parametro event
    const input = event.target as HTMLInputElement;
    const newTask = input.value; //newTask es la variable del nuevo elemento, que el usuario introducirá por el teclado, value se refiere a ese valor introducido
    this.tasks.update((tasks) => [...tasks, newTask]);
    //  array- elementos del arreglo anterior  [copia del array-elementos, nuevo elemento agregado al final por el usuario]
  }

  deleteTask(index: number){
  //           Filter para no mutar el array    Arrow function
    this.tasks.update((tasks) => tasks.filter((task, position) => position !== index));
//  array- elementos del arreglo anterior -si filtra el array dando el elemento y su posición-preguntamos:si la posicion es diferente a la que están enviando por parametro
  }
}
