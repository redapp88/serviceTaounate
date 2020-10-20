import { Injectable } from '@angular/core';
import {Categorie} from '../models/categorie.model';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

interface categorieData{
    name:string
    description:string
    icon:string
}

@Injectable({
    providedIn: 'root'
})
export class CategoriesService {
categoriesSubject=new Subject<Categorie[]>();
_categories:Categorie[]=[]
  emitCategories(){
  this.categoriesSubject.next(this._categories)
  }
  constructor(private http:HttpClient) { }

  public fetchCategories(){
      return new Observable(observer=>{
              this.http.get<{[key:string]:categorieData}>
              (`${environment.backEndAdress}/categories.json`).subscribe(
                  (resData)=>
                  {
                      const categories=[];
                      for(const key in resData)
                      {
                          if (resData.hasOwnProperty(key))

                          {
                              categories.push(
                                  new Categorie(key,
                                      resData[key].name,
                                      resData[key].description,
                                      resData[key].icon,

                                  )
                              )
                          }
                      };
                      this._categories=categories;
                      observer.complete()

                  },
                  (error)=>{observer.error(error)})
          }
      )


  }

  public addCategorie(categorie:Categorie){
    return new Observable(observer=>{
        this.http.post<{name:string}>(`${environment.backEndAdress}/categories.json`,{...categorie,id:null})
            .subscribe(resData=>{
                categorie.id=resData.name;
                this._categories.push(categorie)
               observer.complete();
            },
                error=>{observer.error(error)}
            )


    })

  }
}
