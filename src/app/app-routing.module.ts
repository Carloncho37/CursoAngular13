import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { Error404pageComponent } from './shared/pages/error404page/error404page.component';
import { authGuardActivate, authGuardMatch } from './auth/guards/auth.guard';



const routes: Routes = [
  {
    path: 'auth',
    loadChildren: ()  => import('./auth/auth.module').then  (m => m.AuthModule),
  },
  {
    path: 'heroes',
    loadChildren: ()  => import('./heroes/heroes.module').then  (m => m.HeroesModule),
  },
  {
    path: '404',
    component: Error404pageComponent,
  },
    //? Defino que la ruta vacia exacta, rediriga a heroes
    //? Si no uso patMatch full, todas las rutas caerian en 'heroes'
  {
    path: '',
    redirectTo: 'heroes',
    pathMatch: 'full',
    canActivate: [authGuardActivate],
    // canMatch: [authGuardMatch],
  },
  {
    path: '**',
    redirectTo: '404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



