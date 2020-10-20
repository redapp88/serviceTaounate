import {AlertController} from '@ionic/angular';

export  class SharedFunctions{
    constructor(){}
    static showError(error,alertCtrl:AlertController)
    {
        let errorMessage='Erreur de chargement'
        if(error.name){
            if(error.name==='HttpErrorResponse')
                errorMessage='impossible de charger données verifier votre connexion internet'

        }
        alertCtrl.create({
            header:'erreur',
            message:errorMessage,
            buttons:[{text:'ok'}]
        }).then(
            (alertEL)=>{
                alertEL.present();
            }
        )
    }
}