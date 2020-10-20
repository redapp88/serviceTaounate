import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CategoriesPage } from './categories.page';
import {AddCategorieComponent} from './add-categorie/add-categorie.component';
import {ReactiveFormsModule} from '@angular/forms';
import {WaitingWorkersComponent} from './waiting-workers/waiting-workers.component';
import {WorkerItemComponent} from './workers/worker-item/worker-item.component';
import {ComponentsModule} from '../components.module';

const routes: Routes = [
    {  path: '',

children: [
    {path:'',
        component: CategoriesPage
    },

    {  path: ':categorieId/:categorieName',
        loadChildren: './workers/workers.module#WorkersPageModule'}
]
  }
];

@NgModule({
  imports: [

    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
      ComponentsModule,
  ],
    exports:[AddCategorieComponent,ReactiveFormsModule,WaitingWorkersComponent],
    entryComponents:[AddCategorieComponent,WaitingWorkersComponent],
  declarations: [CategoriesPage,AddCategorieComponent,WaitingWorkersComponent]
})
export class CategoriesPageModule {}
