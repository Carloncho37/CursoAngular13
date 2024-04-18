import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'heroesApp';

  //! Si implemento asi, se carga la pantalla antes que el OnInit
  //! y necesito que NO se cargue si no esta autenticado

  // constructor ( private authService: AuthService){}

  // ngOnInit (): void {
  //   this.authService.checkAuthentication()
  //   .subscribe( () => {
  //     console.log("checkAuthentication finished");

  //   } )  }

}
