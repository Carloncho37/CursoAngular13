import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: [
  ]
})
export class LoginPageComponent {

  //? Inyecto el servicio
  constructor( private authService:AuthService,
              private router: Router ) {};

  onLogin(){
    console.log('tap onLogin');

    this.authService.login('carlosgalvan@gmail.com','123456')
    .subscribe( user => {
        this.router.navigate(['/'])
    });
  }


}
