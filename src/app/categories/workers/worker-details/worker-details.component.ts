import {Component, Input, OnInit} from '@angular/core';
import {Worker} from '../../../models/worker.model';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-worker-details',
  templateUrl: './worker-details.component.html',
  styleUrls: ['./worker-details.component.scss'],
})
export class WorkerDetailsComponent implements OnInit {
    @Input() workerName;
    @Input()  workerDesc;
    @Input()  workerphone;
    @Input()  workerAdress;
    @Input() workerEmail;
    @Input()  workerCat;
  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {
  }

    onCancel(){
        this.modalCtrl.dismiss({},'cancel')
    }

}
