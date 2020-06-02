import {Component, OnInit} from '@angular/core';
import {ApiStorageService} from "../../services/api-storage.service";
import {AlertController, ModalController} from "@ionic/angular";
import {UsersPopupPage} from "../users-popup/users-popup.page";

@Component({
    selector: 'app-add-user-popup',
    templateUrl: './add-user-popup.page.html',
    styleUrls: ['./add-user-popup.page.scss'],
})
export class AddUserPopupPage implements OnInit {

    user_name: string

    constructor(private apiStorageService: ApiStorageService,
                private alertCtrl: AlertController,
                public viewCtrl: ModalController) {
    }


    onSubmit(): void {

        if (this.apiStorageService.checkUser(this.user_name)) {
            this.apiStorageService.addUser(this.user_name);
            this.dismiss();
        } else {
            this.alertCtrl.create({
                header: 'Warning',
                message: 'This username has already been in used',
                buttons: [{
                    text: 'Ok',
                    role: 'Okay'
                }]
            }).then(alertEl => {
                alertEl.present();
            });
        }
    }

    onClear(): void{
        this.user_name = '';
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    ngOnInit() {
    }

}
