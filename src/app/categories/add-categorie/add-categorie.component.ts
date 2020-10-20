import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AlertController, LoadingController, ModalController} from '@ionic/angular';
import {CategoriesService} from '../../services/categories.service';
import {Categorie} from '../../models/categorie.model';
import {SharedFunctions} from '../../tools/sharedFunctions';


@Component({
  selector: 'app-add-categorie',
  templateUrl: './add-categorie.component.html',
  styleUrls: ['./add-categorie.component.scss'],
})
export class AddCategorieComponent implements OnInit {
    form:FormGroup;
    isLoading=false
  constructor(private modalCtrl:ModalController,
              private categorieService:CategoriesService,
              private alertCtrl:AlertController,
              private loadingCtrl:LoadingController) { }

  ngOnInit() {

      this.form=new FormGroup({

          name:new FormControl(null,{
              updateOn:'blur',
              validators:[Validators.required]
          }),
          description:new FormControl(null,{
              updateOn:'blur',
              validators:[Validators.required,Validators.maxLength(100)]
          }),
          icon:new FormControl(null,{
              updateOn:'blur',
              validators:[Validators.required,Validators.min(1)]
          })
      })
  }

    onAddCategorie(){
      if(!this.form.valid){
return
      }
        this.loadingCtrl.create(
        ).then(loadingEL=>{
            loadingEL.present();
            let categorie=new Categorie(null,this.form.value.name,this.form.value.description,this.form.value.icon);
            this.categorieService.addCategorie(categorie).subscribe(
                ()=>{},
                (error)=>{this.isLoading=false;SharedFunctions.showError(error,this.alertCtrl),loadingEL.dismiss();},
                ()=>{this.isLoading=false;
                    loadingEL.dismiss();
                    this.categorieService.emitCategories();
                    this.modalCtrl.dismiss({role:'valide'})}

            )
        })



    }

    onCancel(){
        this.modalCtrl.dismiss({},'cancel')
    }


}
