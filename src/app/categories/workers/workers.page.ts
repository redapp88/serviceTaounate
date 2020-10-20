import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AlertController, IonItemSliding, ModalController, NavController, ToastController} from '@ionic/angular';
import {WorkersService} from '../../services/workers.service';
import {environment} from '../../../environments/environment';
import {Worker} from '../../models/worker.model';

import {AddWorkerComponent} from './add-worker/add-worker.component';
import {WorkerDetailsComponent} from './worker-details/worker-details.component';
import {EditWorkerComponent} from './edit-worker/edit-worker.component';
import {SharedFunctions} from '../../tools/sharedFunctions';

@Component({
  selector: 'app-workers',
  templateUrl: './workers.page.html',
  styleUrls: ['./workers.page.scss'],
})
export class WorkersPage implements OnInit {
    loadedWorkers:Worker[]=[];
    isLoading:boolean=false;
    isAdmin:boolean=false;
    categorieName:string="";
    categorieData:{categorieId:string,
        categorieName:string};

  constructor(private route:ActivatedRoute,
              private navCtrl:NavController,
              private workersService:WorkersService,
              private modalCtrl:ModalController,
              private alertCtrl:AlertController,
              private toastCtrl:ToastController) { }

  ngOnInit() {
      this.isAdmin=environment.admin;
      this.workersService.workersSubject.subscribe(
          (workers)=>{
              this.loadedWorkers=workers;
          }
      )

  }

    ionViewWillEnter(){
this.isLoading=true;
        this.route.paramMap.subscribe(
            paramMap=>{

                if(!paramMap.has('categorieId') && !paramMap.has('categorieName') )
                {
                    this.isLoading=false;
                    this.navCtrl.navigateBack('/categories')
                    return
                }
                else{
                this.categorieName=paramMap.get('categorieName');
                const categorieId=paramMap.get('categorieId');
                this.categorieData={categorieId:categorieId,categorieName:this.categorieName};
                this.workersService.fetchWorkers(categorieId,'active').subscribe(
                    ()=>{},
                    (error)=>{this.isLoading=false;SharedFunctions.showError(error,this.alertCtrl)},
                    ()=>{this.workersService.emitWorkers();
                    this.isLoading=false}
                )

                }

            }
        )

    }

    onWorkerDetails(worker: Worker) {

        this.modalCtrl.create({component:WorkerDetailsComponent,
            componentProps:{
                workerName:worker.name,
                workerDesc:worker.description,
                workerphone:worker.phone,
                workerAdress:worker.adress,
                workerEmail:worker.email,
                workerCat:this.categorieName,
            }}).then(
            (modalEL)=>
            {
                modalEL.onDidDismiss().then((modalData)=>{

                })
                modalEL.present();
            }

        )

    }



    onAddWorker() {
        this.modalCtrl.create({component:AddWorkerComponent,
            componentProps:{
            categorieName:this.categorieData.categorieName,
                categorieId:this.categorieData.categorieId
            }}).then(
            (modalEL)=>
            {
                modalEL.onDidDismiss().then((modalData)=>{

if(modalData.role==='valide'){
  this.toastCtrl.create({message:"merci!vos données sont enregistré,ils seront verfié par l'administrateur et mise en ligne dans les 24h "
      ,duration:5000}) .then(
      (modalEL)=>{
          modalEL.present()
      }
  )
}
                })
                modalEL.present();
            }

        )
    }

    onDelete(worker: Worker,slidingItem:IonItemSliding) {

 this.alertCtrl.create({message:"etes vous sure de vouloir supprimer "+worker.name,
     buttons:[{text:'annuler',role:'cancel'},{text:'oui',handler:()=>{slidingItem.close();this.deleteWorker(worker.id)}}]})
     .then(alertEL=>{
         alertEL.present();
     })
    }

    private deleteWorker(id: string) {

      this.isLoading=true;
     this.workersService.deleteWorker(id).subscribe(
         ()=>{},
         (error)=>{SharedFunctions.showError(error,this.alertCtrl);this.isLoading=false},
         ()=>{this.workersService.emitWorkers(),this.isLoading=false}
     )
    }

    onEdit(worker: Worker,slidingItem:IonItemSliding) {
        slidingItem.close();
        this.modalCtrl.create({component:EditWorkerComponent,
            componentProps:{
                categorieName:this.categorieData.categorieName,
                categorieId:this.categorieData.categorieId,
                workerId:worker.id,
                workerName:worker.name,
                workerDesc:worker.description,
                workerphone:worker.phone,
                workerAdress:worker.adress,
                workerEmail:worker.email,
                workerCat:this.categorieName,
                workerStatus:worker.status

            }}).then(
            (modalEL)=>
            {
                modalEL.onDidDismiss().then((modalData)=>{

                })
                modalEL.present();
            }

        )
    }
}
