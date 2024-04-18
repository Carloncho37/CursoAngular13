import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { filter, switchMap, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';



@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [
  ]
})
export default class NewPageComponent implements OnInit {


  //? Defino propiedades de la clase
  public heroForm = new FormGroup(
    {
      id: new FormControl<string>(''),
      superhero: new FormControl<string>('', { nonNullable: true }),
      publisher: new FormControl<Publisher>(Publisher.DCComics),
      alter_ego: new FormControl(''),
      characters: new FormControl(''),
      first_appearance: new FormControl(''),
      alt_img: new FormControl(''),
    }
  )


  //? Defino constructor de la clase
  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) { }


  //? Defino metodos de la clase
  get currentHero(): Hero {
    const hero = this.heroForm.value as Hero;
    return (hero)
  }

  ngOnInit(): void {
    //? Si no estoy editando, no cargo la data
    if (!this.router.url.includes('edit')) return;

    //? Si pasa la validacion de arriba, es xq estoy en edit. cargo la info
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.heroesService.getHeroById(id)),
      ).subscribe(hero => {

        if (!hero) {
          return this.router.navigateByUrl('/')
        }

        //? La funcion reset, completa los campos sin pasaraslo 1 a 1
        //this.heroForm.setValue( {{ campo }});
        this.heroForm.reset(hero);
        return;
      })
  }

  //? Controlo la validacion de los campos del formulario reactivo
  onSubmit(): void {
    if (this.heroForm.invalid) return;

    if (this.currentHero.id) {
      this.heroesService.updateHero(this.currentHero)
        .subscribe(hero => {
          this.showSnackBar(`${hero.superhero} updated!`)
        });

      return;
    }

    this.heroesService.addHero(this.currentHero)
      .subscribe(hero => {
        this.router.navigate([ '/heroes/edit',hero.id ]);
        this.showSnackBar(`${hero.superhero} created!`);
      })

  }


  //?
  onConfirmDelete(): void {
    if (!this.currentHero.id) throw Error('Hero id is required');

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      //data: {name: this.name, animal: this.animal},
      data: this.heroForm.value
    });


    //! Se refactoriza para evitar tener subscribes anidados
    // dialogRef.afterClosed().subscribe(result => {
    //   if (!result) return;
    //   this.heroesService.deleteHeroById(this.currentHero.id)
    //     .subscribe ( wasDeleted => {
    //       if (wasDeleted)
    //         this.router.navigate(['/heroes'])
    //     })
    // });

    //? Version refactorizada, uso Filter para los casos positivos
    dialogRef.afterClosed()
      .pipe(
        filter( (result: boolean) => result),
        switchMap( ()=> this.heroesService.deleteHeroById(this.currentHero.id) ),
        filter( (wasDeleted: boolean) => wasDeleted),
      )
      .subscribe( () => {
        this.router.navigate(['/heroes'])
      })

  }

  //? Creo metodo de snackbar
  showSnackBar(message: string) {
    this.snackbar.open( message, 'done',
    {duration: 2500})
  }

}
