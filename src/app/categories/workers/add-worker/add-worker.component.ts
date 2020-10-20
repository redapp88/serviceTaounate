import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AlertController, LoadingController, ModalController, NavParams} from '@ionic/angular';
import {WorkersService} from '../../../services/workers.service';
import {Worker} from '../../../models/worker.model';
import {phoneNumberValidator} from '../../../validators/phone-validator';
import {SharedFunctions} from '../../../tools/sharedFunctions';

@Component({
  selector: 'app-add-worker',
  templateUrl: './add-worker.component.html',
  styleUrls: ['./add-worker.component.scss'],
})
export class AddWorkerComponent implements OnInit {
    @Input()categorieId
    @Input()categorieName
    form:FormGroup;
    isLoading=false

  constructor(private modalCtrl:ModalController,
              private workersService:WorkersService,
              private alertCtrl:AlertController,
              private loadingCtrl:LoadingController) { }

  ngOnInit() {
        if(!this.categorieId)
            this.modalCtrl.dismiss();
//console.log(this.categorieId,this.categorieTitle)
      this.form=new FormGroup({

          name:new FormControl(null,{
              updateOn:'change',
              validators:[Validators.required,Validators.maxLength(20),Validators.minLength(3)]
          }),
          description:new FormControl(null,
              {
                  updateOn:'change',
                  validators:[Validators.maxLength(30)]
              }
              ),

          adress:new FormControl(null,{
              updateOn:'change',
              validators:[Validators.maxLength(40)]
          }),

          phone:new FormControl(null,{
              updateOn:'change',
              validators:[Validators.required,phoneNumberValidator]
          }),
          email:new FormControl(null,{
              updateOn:'change',
              validators:[Validators.email]
          })
      })
  }

    onAddWorker(){

        if(!this.form.valid){
            return
        }
        this.loadingCtrl.create(
        ).then(loadingEL=>{
            loadingEL.present();
            let worker=new Worker(
                null,
                this.form.value.name,
                this.form.value.description,
                this.form.value.adress,
                this.form.value.phone,
                this.form.value.email,
                this.categorieId,
                this.categorieName,
                "waiting");
            this.workersService.addWorker(worker).subscribe(
                ()=>{},
                (error)=>{this.isLoading=false;SharedFunctions.showError(error,this.alertCtrl),loadingEL.dismiss();},
                ()=>{this.isLoading=false;
                    loadingEL.dismiss();
                    this.workersService.emitWorkers();
                    this.modalCtrl.dismiss({},'valide')}

            )
        })

    }

    onCancel(){
        this.modalCtrl.dismiss({},'cancel')
    }



}
