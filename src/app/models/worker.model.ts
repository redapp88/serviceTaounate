import {Categorie} from './categorie.model';

export class Worker{
    constructor(public id:string,
                public name:string,
                public description:string,
                public adress:string,
                public phone:string,
                public email:string,
                public categorieId:string,
                public categorieName:string,
                public status:string){

    }
}