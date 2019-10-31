import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../models/heroe.model';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = "https://crud-angular-2ae80.firebaseio.com";

  constructor( private http: HttpClient) { }


  crearHeroe( heroe: HeroeModel){

    return this.http.post(`${ this.url }/heroes.json`, heroe)
           .pipe(
              map( (resp:any) => {
                  heroe.id = resp.name;
                  return heroe;
              })
           );

  }

  ActualizarHeroe( heroe: HeroeModel){

    const heroeTemp = {
      //Toma todas las propiedades del heroe y las pone en heroeTemp
      ...heroe
    };

    delete heroeTemp.id;

    return this.http.put(`${ this.url }/heroes/${ heroe.id }.json`, heroeTemp);


  }

  getHeroes(){
    return this.http.get(`${ this.url }/heroes.json`)
           .pipe(
             map( this.crearArreglo )
           );
  }

  private crearArreglo( heroesObj:object){

    const heroes: HeroeModel[]=[];

    console.log(heroesObj)

    if( heroesObj === null){
      return [];
    }

    Object.keys( heroesObj).forEach( key =>{
      
      const heroe: HeroeModel = heroesObj[key];
      heroe.id = key;

      heroes.push(heroe);

    })

    return heroes
  }


}
