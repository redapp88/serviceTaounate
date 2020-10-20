import { Injectable } from '@angular/core';
import {Categorie} from '../models/categorie.model';
import {HttpClient} from '@angular/common/http';
import {Worker} from '../models/worker.model';
import {Observable, Subject} from 'rxjs';
import {environment} from '../../environments/environment';


interface workerData{
    name:string,
    description:string,
    adress:string,
    phone:string,
    email:string,
    categorieId:string,
    categorieName:string,
    status:string
}
@Injectable({
  providedIn: 'root'
})
export class WorkersService {

    workersSubject=new Subject<Worker[]>();
    _workers:Worker[]=[]
    emitWorkers(){
        this.workersSubject.next(this._workers)
    }


  constructor(private http:HttpClient) { }

    public addWorker(worker:Worker){
        return new Observable(observer=>{

            this.http.post<{name:string}>(`${environment.backEndAdress}/workers.json`,{...worker,id:null})
                .subscribe(resultData=>{
                    worker.id=resultData.name;
                    this._workers.push(worker)
                    observer.complete();
                }
                ,error=>{observer.error()}
                )
        })

    }
    public fetchWorkers(categorieId:string,status:string){
        return new Observable(observer=>{
            let url=`${environment.backEndAdress}/workers.json`;
                if(categorieId!=='%')
                    url=url+`?orderBy="categorieId"&equalTo="${categorieId}"`
                this.http.get<{[key:string]:workerData}>
                (url).subscribe(
                    (resData)=>
                    {
                        const workers=[];
                        for(const key in resData)
                        {
                            if (resData.hasOwnProperty(key))

                            {
                                if(resData[key].status===status)
                                {
                                workers.push(
                                    new Worker(key,
                                        resData[key].name,
                                        resData[key].description,
                                        resData[key].adress,
                                        resData[key].phone,
                                        resData[key].email,
                                        resData[key].categorieId,
                                        resData[key].categorieName,
                                        resData[key].status

                                    )
                                )
                                }
                            }
                        };
                        this._workers=workers;
                        observer.complete()

                    },
                    (error)=>{observer.error(error)})
            }
        )
    }

    deleteWorker(id:string){
        return new Observable((observer)=>{
            this.http.delete(`${environment.backEndAdress}/workers/${id}.json`).subscribe(
                (resData)=>{

                    this._workers=this._workers.filter(booking => booking.id !== id)
                    observer.complete()
                },
                (error)=>{observer.error(error)}
            )




        })

    }

    updateWorker(worker: Worker) {
        return new Observable(observer=>{
            this.http.put(`${environment.backEndAdress}/workers/${worker.id}.json`,worker)
                .subscribe(resultData=>{
                        //console.log(worker);
                    let oldWorker:Worker=this._workers.filter(w => w.id===worker.id)[0]
                  if(oldWorker){
                      oldWorker.name=worker.name;
                      oldWorker.adress=worker.adress;
                      oldWorker.email=worker.email;
                      oldWorker.phone=worker.phone;
                      oldWorker.description=worker.description;
                  }
                        observer.complete();
                    }
                    ,error=>{observer.error()}
                )
        })
    }



    validateWorker(worker: Worker) {
        worker.status="active";
        return new Observable(observer=>{
            this.http.put(`${environment.backEndAdress}/workers/${worker.id}.json`,worker)
                .subscribe(resultData=>{
                    this._workers.find(oldWorker=>oldWorker.id===worker.id).status=worker.status;
                        //console.log(worker);

                        observer.complete();
                    }
                    ,error=>{observer.error()}
                )
        })
    }
}
