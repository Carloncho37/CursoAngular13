import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../interfaces/hero.interface';

@Pipe({
  name: 'heroImage'
})

export class HeroImagePipe implements PipeTransform {
  transform(hero:Hero): string {
    //? Si no tengo img original ni alternativa, muestro la img not-found
    if (!hero.id && !hero.alt_img ) {
          return 'assets/no-image.png';
    }

    //? si tengo img altenativa, muestro esa
    if (hero.alt_img) {
      return hero.alt_img;
    }

    //? si esta la img, la muestro
    return `assets/heroes/${ hero.id }.jpg`


  }

}
