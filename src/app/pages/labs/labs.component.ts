import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './labs.component.html',
  styleUrls: ['./labs.component.scss'],
})
export class LabsComponent {
  title = 'mi-primera-app';
  welcome = 'Bienvenido a mi primera aplicación Angular';

  //Array con signal para reactividad
  tasks = signal([
    'Instalar el Angular CLI',
    'Crear proyecto',
    'Crear componentes',
  ]);

  name = signal('Nicolas');
  age = 27;
  disabled = true;
  img = 'https://w3schools.com/howto/img_avatar.png';

  //Declaro un objeto con sus propiedades
  //Ahora usaré un signal para el objeto
  person = signal({
    name: 'ana',
    age: 20,
    avatar: 'https://w3schools.com/howto/img_avatar.png',
  });

  //Controller para el forms
  colorCtrl = new FormControl();
  //Le asigno un tamaño inicial de 50 y la Properte binding noNullable es no nulo.
  widthCtrl = new FormControl(50, {
    nonNullable: true,
  });
/*Controller con validaciones para validar el numero de caracteres del name
si es valido o no se mostrará un estado1 con class en el HTML
*/
nameCtrl = new FormControl('nicolas', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(3),
    ]
  });

  //
  constructor() {
    this.colorCtrl.valueChanges.subscribe((value) => {
      console.log(value);
    });
  }

  //Método de mostrar una alerta al dar click en el boton
  clickHandler(): void {
    alert('Hola');
  }

  //Método de evento, es para hacer un cambio en el input
  /*
  changeHandler(event: Event): void {
    console.log(event);
  }
*/

  //Reactividad. Cambia dinamicamente el valor
  changeHandler(event: Event): void {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.name.set(newValue);
  }

  //El método keydonwHandler usa ese evento para que cada vez que teclee
  //en el teclado el evento traiga el target (la información) al input
  //y lo cache el HTML (el input de la página donde se desea la reactividad)
  keydownHandler(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
    console.log(input.value);
  }

  //Update de la edad del objeto
  changeAge(event: Event) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.person.update((prevState) => {
      return {
        ...prevState,
        age: parseInt(newValue),
      };
    });
  }

  //Update del name del objeto
  changeName(event: Event) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.person.update((prevState) => {
      return {
        ...prevState,
        name: newValue,
      };
    });
  }
}
