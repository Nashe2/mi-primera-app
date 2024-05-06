/* Elementos principales en la reactividad en angular: effect, computed, signal */
import { Component, computed, inject, effect, signal, Injector } from '@angular/core';
import {
  FormControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Task } from './../../models/task.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  //Array con signal para reactividad
  tasks = signal<Task[]>([]);

  /* Controller de form */
  newTaskCtrl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  });

injector = inject(Injector);

  //LOCAL STORAGE
  /* Se requiere de un constructor para los effect */
  constructor() {}

  ngOnInit() {
    const storage = localStorage.getItem('tasks');
    if (storage) {
      /* JSON.parse  pasa a un objeto el string que usamos anteriormente */
      const tasks = JSON.parse(storage);
      this.tasks.set(tasks); //tasks a inicializar
    }
    this.trackTasks();
  }

  trackTasks() {
    effect(() => {
      const tasks = this.tasks();
      /* JSON.stringify: convierte un JSON a un string */
      console.log(tasks);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }, {injector: this.injector} );
  }

  //ESTADOS COMPUTADOS
  /* Usando un signal, hacemos un evento dentro de otros eventos con computed*/
  filter = signal<'all' | 'pending' | 'completed'>('all');
  tasksByFilter = computed(() => {
    /* Elementos que van a reaccionar cuando ellos cambien*/
    const filter = this.filter();
    const tasks = this.tasks();
    if (filter === 'pending') {
      return tasks.filter((task) => !task.completed);
    }
    if (filter === 'completed') {
      return tasks.filter((task) => task.completed);
    }
    return tasks;
  });

  changeHandler() {
    if (this.newTaskCtrl.valid) {
      const value =
        this.newTaskCtrl.value.trim(); /*trim limpia los espacios que tenga un input ya sea al inicio o al final*/
      if (value !== '') {
        this.addTask(value);
        this.newTaskCtrl.setValue('');
      }
    }
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

  /* metodo para actualizar  */
  updateTask(index: number) {
    this.tasks.update((tasks) => {
      return tasks.map((task, position) => {
        /* Con map vamos a rrecorrer todos los elementos y transformarlos- elemento y posicion actual */
        if (position === index) {
          /* Si la posicion es igual a la mandada en el parametro*/
          return {
            ...task,
            completed:
              !task.completed /* si se cumple el estado de completado va a cambiar */,
          };
        }
        return task;
      });
    });
  }

  /* Metodo de actualizacion de la tarea al hacer doble click */
  updateTaskEditingMode(index: number) {
    this.tasks.update((prevState) => {
      return prevState.map((task, position) => {
        if (position === index) {
          return {
            ...task,
            editing: true,
          };
        }
        return {
          ...task,
          editing:
            false /* Para evitar que se modifique más de uno al mismo tiempo */,
        };
      });
    });
  }

  /*Metodo para actualizar la tarea despues de presionar enter*/
  updateTaskText(index: number, event: Event) {
    const input = event.target as HTMLInputElement;
    this.tasks.update((prevState) => {
      return prevState.map((task, position) => {
        if (position === index) {
          return {
            ...task,
            title: input.value,
            editing: false,
          };
        }
        return task;
      });
    });
  }

  changeFilter(filter: 'all' | 'pending' | 'completed') {
    this.filter.set(filter);
  }
}
