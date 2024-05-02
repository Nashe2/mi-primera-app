import { Component, signal } from '@angular/core';

import { Task } from './../../models/task.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  //Array con signal para reactividad
  tasks = signal<Task[]>([ //Tipar la senial para saber si cumple con los datos de la interfaz
    {
      id: Date.now(),
      title: 'Crear proyecto',
      completed: false,
    },
    {
      id: Date.now(),
      title: 'Crear componentes',
      completed: false,
    },
  ]);

  //Método de actualizacion de los elementos del arreglo tasks
  changeHandler(event: Event) {
    //funcion declarativa con parametro event
    const input = event.target as HTMLInputElement;
    const newTask = input.value; //newTask es la variable del nuevo elemento, que el usuario introducirá por el teclado, value se refiere a ese valor introducido
    this.addTask(newTask);
  }

  addTask(title: string) {
    const newTask = {
      id: Date.now(),
      title,
      completed: false,
    };
    this.tasks.update((tasks) => [...tasks, newTask]);
    //  signal- elementos del arreglo anterior  [copia del array-elementos, nuevo elemento agregado al final por el usuario]
  }

  /* Método para eliminar elemento del array */
  deleteTask(index: number) {
    //           Filter para no mutar el array    Arrow function
    this.tasks.update((tasks) =>
      tasks.filter((task, position) => position !== index)
    );
    //  array- elementos del arreglo anterior -si filtra el array dando el elemento y su posición-preguntamos:si la posicion es diferente a la que están enviando por parametro
  }


}
