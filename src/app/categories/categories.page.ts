import { Component, OnInit } from '@angular/core';
import {CategoriesService} from '../services/categories.service';
import {Categorie} from '../models/categorie.model';
import {AlertController, ModalController, Platform} from '@ionic/angular';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {AddCategorieComponent} from './add-categorie/add-categorie.component';
import {SharedFunctions} from '../tools/sharedFunctions';
import {WaitingWorkersComponent} from './waiting-workers/waiting-workers.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})


export class CategoriesPage implements OnInit {
loadedCategories:Categorie[]=[];
isLoading:boolean=false;
isAdmin=false;

  constructor(private categoriesService:CategoriesService,
              private alertCtrl:AlertController,
              private router:Router,
              private modalCtrl:ModalController,
              private platform: Platform) {
      this.platform.backButton.subscribe(async () => {
          if (this.router.isActive('/categories', true) && this.router.url === '/categories') {
              navigator['app'].exitApp();
          }
      });

  }

  ngOnInit() {
      /*let cat1:Categorie=new Categorie(null,"plombier","tout les plombier du coin","water")
      let cat2:Categorie=new Categorie(null,"electriciens","tout les electreciens du coin","outlet")
      let cat3:Categorie=new Categorie(null,"transporteurs","tout les transporteurs du coin","car")
      let cat4:Categorie=new Categorie(null,"menuisiers","tout les menuisiers du coin","hammer")
      this.categoriesService.addCategorie(cat1).subscribe(resData=>{console.log(resData)
          this.categoriesService.addCategorie(cat2).subscribe(resData=>{
              console.log(resData);this.categoriesService.addCategorie(cat3).subscribe(resDat=>{
                  console.log(resData);*/
      this.isAdmin=environment.admin;
                  this.categoriesService.categoriesSubject.subscribe(
                      (categories)=>{
                          this.loadedCategories=categories
                      }
                  )
      /*
              })
          })
      });
*/

  }
  ionViewWillEnter(){
     this.reloadCategories();

  }

  private reloadCategories(){
      this.isLoading=true;
      this.categoriesService.fetchCategories().subscribe(
          ()=>{},
          (error)=>{console.log(error),SharedFunctions.showError(error,this.alertCtrl),this.isLoading=false},
          ()=>{
              this.categoriesService.emitCategories();
              this.isLoading=false;
          }
      )
  }


    onGotoCategorie(cat:Categorie) {
      let categorie={
          categorieId:cat.id,
          categorieTitle:cat.name,
      }

        this.router.navigate(['/','categories',cat.id,cat.name])

    }

    onAddCategorie() {
     this.modalCtrl.create({component:AddCategorieComponent}).then(
         (modalEL)=>
         {
             modalEL.onDidDismiss().then((modalData)=>{

             })
          modalEL.present();
         }

     )
    }

    onWaitingWorkers() {
        this.modalCtrl.create({component:WaitingWorkersComponent}).then(
            (modalEL)=>
            {
                modalEL.onDidDismiss().then((modalData)=>{

                })
                modalEL.present();
            }

        )
    }
}
