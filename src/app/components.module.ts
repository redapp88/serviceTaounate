import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WorkerItemComponent} from './categories/workers/worker-item/worker-item.component';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {IonicModule} from '@ionic/angular';
import {BrowserModule} from '@angular/platform-browser';
import {WorkerDetailsComponent} from './categories/workers/worker-details/worker-details.component';



@NgModule({
  declarations: [WorkerItemComponent,WorkerDetailsComponent],
    exports:[WorkerItemComponent,WorkerDetailsComponent],
    entryComponents:[WorkerDetailsComponent],
  imports: [
    CommonModule,
      IonicModule
  ]
})
export class ComponentsModule { }
