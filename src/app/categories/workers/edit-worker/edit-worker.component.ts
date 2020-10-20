import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {phoneNumberValidator} from '../../../validators/phone-validator';
import {WorkersService} from '../../../services/workers.service';
import {AlertController, LoadingController, ModalController} from '@ionic/angular';
import {Worker} from '../../../models/worker.model';
import {SharedFunctions} from '../../../tools/sharedFunctions';

@Component({
  selector: 'app-edit-worker',
  templateUrl: './edit-worker.component.html',
  styleUrls: ['./edit-worker.component.scss'],
})
export class EditWorkerComponent implements OnInit {
    @Input() categorieId
    @Input() categorieName
    @Input() workerId
    @Input() workerName;
    @Input() workerDesc;
    @Input() workerphone;
    @Input() workerAdress;
    @Input() workerEmail;
    @Input() workerStatus;
    form:FormGroup;
    isLoading=false

    constructor(private modalCtrl:ModalController,
                private workersService:WorkersService,
                private alertCtrl:AlertController,
                private loadingCtrl:LoadingController) { }

    ngOnInit() {

        if(!this.categorieId || !this.workerId)
            this.modalCtrl.dismiss();
//console.log(this.categorieId,this.categorieTitle)
        this.form=new FormGroup({

            name:new FormControl(this.workerName,{
                updateOn:'blur',
                validators:[Validators.required,Validators.maxLength(20),Validators.minLength(3)]
            }),
            description:new FormControl(this.workerDesc,
                {
                    updateOn:'blur',
                    validators:[Validators.maxLength(30)]
                }
            ),

            adress:new FormControl(this.workerAdress,{
                updateOn:'blur',
                validators:[Validators.maxLength(40)]
            }),

            phone:new FormControl(this.workerphone,{
                updateOn:'blur',
                validators:[Validators.required,phoneNumberValidator]
            }),
            email:new FormControl(this.workerEmail,{
                updateOn:'blur',
                validators:[Validators.email]
            })
        })
    }

    onEditWorker(){

        if(!this.form.valid){
            return
        }
        this.loadingCtrl.create(
        ).then(loadingEL=>{
            loadingEL.present();
            let worker=new Worker(
                this.workerId,
                this.form.value.name,
                this.form.value.description,
                this.form.value.adress,
                this.form.value.phone,
                this.form.value.email,
                this.categorieId,
                this.categorieName,
                this.workerStatus);
            this.workersService.updateWorker(worker).subscribe(
                ()=>{},
                (error)=>{this.isLoading=false;SharedFunctions.showError(error,this.alertCtrl),loadingEL.dismiss();},
                ()=>{this.isLoading=false;
                    loadingEL.dismiss();
                    this.workersService.emitWorkers();
                    this.modalCtrl.dismiss({role:'valide'})}

            )
        })

    }

    onCancel(){
        this.modalCtrl.dismiss({},'cancel')
    }


}

