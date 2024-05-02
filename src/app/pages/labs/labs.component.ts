import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-labs',
  templateUrl: './labs.component.html',
  styleUrls: ['./labs.component.scss'],
})
export class LabsComponent {
  title = 'mi-primera-app';
  welcome = 'Bienvenido a mi primera aplicación Angular';

 //Array con signal para reactividad
  tasks = signal(['Instalar el Angular CLI', 'Crear proyecto', 'Crear componentes']);

  name = signal('Nicolas');
  age = 27;
  disabled = true;
  img = 'https://w3schools.com/howto/img_avatar.png';

  //Declaro un objeto con sus propiedades
  //Ahora usaré un signal para el objeto
  person =signal({
    name: 'ana',
    age: 5,
    avatar: 'https://w3schools.com/howto/img_avatar.png',
  });

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
  changeAge(event: Event){
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.person.update(prevState => {
      return {
        ...prevState,
        age: parseInt(newValue),
      }
    });
  }

  //Update del name del objeto
  changeName(event: Event){
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.person.update(prevState => {
      return {
        ...prevState,
        name:newValue,
      }
    });
  }

}
