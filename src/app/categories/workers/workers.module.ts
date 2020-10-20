import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { WorkersPage } from './workers.page';
import {AddWorkerComponent} from './add-worker/add-worker.component';
import {WorkerDetailsComponent} from './worker-details/worker-details.component';
import {WorkerItemComponent} from './worker-item/worker-item.component';
import {EditWorkerComponent} from './edit-worker/edit-worker.component';
import {ComponentsModule} from '../../components.module';

const routes: Routes = [
  {
    path: '',
    component: WorkersPage
  }
];

@NgModule({
  imports: [

      ReactiveFormsModule,
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes),
      ComponentsModule,
  ],
  declarations: [WorkersPage,AddWorkerComponent,EditWorkerComponent],
    exports:[AddWorkerComponent,EditWorkerComponent],
    entryComponents:[AddWorkerComponent,EditWorkerComponent]
})
export class WorkersPageModule {}
