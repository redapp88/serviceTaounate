import {Component, Input, OnInit} from '@angular/core';
import {Worker} from '../../../models/worker.model';
import {WorkerDetailsComponent} from '../worker-details/worker-details.component';
import {AlertController, IonItemSliding, LoadingController, ModalController} from '@ionic/angular';
import {WorkersService} from '../../../services/workers.service';
import {SharedFunctions} from '../../../tools/sharedFunctions';

@Component({
  selector: 'app-worker-item',
  templateUrl: './worker-item.component.html',
  styleUrls: ['./worker-item.component.scss'],
})
export class WorkerItemComponent implements OnInit {
@Input()worker;
    @Input()mode;
    isLoading=false;
  constructor(private modalCtrl:ModalController,
              private workersService:WorkersService,
              private loadingCtrl:LoadingController,
              private alertCtrl:AlertController) { }

  ngOnInit() {}

    onWorkerDetails(worker: Worker) {

        this.modalCtrl.create({component:WorkerDetailsComponent,
            componentProps:{
                workerName:worker.name,
                workerDesc:worker.description,
                workerphone:worker.phone,
                workerAdress:worker.adress,
                workerEmail:worker.email,
                workerCat:worker.categorieName,
            }}).then(
            (modalEL)=>
            {
                modalEL.onDidDismiss().then((modalData)=>{

                })
                modalEL.present();
            }

        )

    }

    onValidateWorker(worker:Worker){
 this.loadingCtrl.create({message:'validation...'}).then(
     (loadingEl)=>{
         loadingEl.present();
         this.workersService.validateWorker(worker).subscribe(
             ()=>{},
             (error)=>{SharedFunctions.showError(error,this.alertCtrl);loadingEl.dismiss()},
         ()=>{this.workersService.emitWorkers();loadingEl.dismiss();}

         )
     }
 )
    }



    onDeleteWorker(worker: Worker) {

        this.alertCtrl.create({message:"etes vous sure de vouloir supprimer "+worker.name,
            buttons:[{text:'annuler',role:'cancel'},{text:'oui',handler:()=>{this.deleteWorker(worker.id)}}]})
            .then(alertEL=>{
                alertEL.present();
            })
    }

    private deleteWorker(id: string) {
        this.loadingCtrl.create({message:'suppression...'}).then(
            (loadingEl)=>{
                loadingEl.present();
                this.workersService.deleteWorker(id).subscribe(
                    ()=>{},
                    (error)=>{SharedFunctions.showError(error,this.alertCtrl);loadingEl.dismiss()},
                    ()=>{this.workersService.emitWorkers();loadingEl.dismiss();}

                )
            }
        )


    }
}
