import { Component, OnInit } from '@angular/core';
import {AlertController, ModalController} from '@ionic/angular';
import {Worker} from '../../models/worker.model';
import {WorkersService} from '../../services/workers.service';
import {environment} from '../../../environments/environment';
import {SharedFunctions} from '../../tools/sharedFunctions';

@Component({
  selector: 'app-waiting-workers',
  templateUrl: './waiting-workers.component.html',
  styleUrls: ['./waiting-workers.component.scss'],
})
export class WaitingWorkersComponent implements OnInit {
    loadedWorkers:Worker[]=[];
    isLoading:boolean=false;
  constructor(private modalCtrl:ModalController,
              private workersService:WorkersService,
              private alertCtrl:AlertController) { }

    ngOnInit() {
        this.workersService.workersSubject.subscribe(
            (workers)=>{

                this.loadedWorkers=workers;
            }
        )

    }

    onCancel(){
        this.modalCtrl.dismiss({},'cancel')
    }


    ionViewWillEnter(){
        this.isLoading=true;
                    this.workersService.fetchWorkers('%','waiting').subscribe(
                        ()=>{},
                        (error)=>{this.isLoading=false;SharedFunctions.showError(error,this.alertCtrl)},
                        ()=>{this.workersService.emitWorkers();
                            this.isLoading=false}
                    )

                }


}
