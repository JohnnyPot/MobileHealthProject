import {Component} from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    navigate: any;

    constructor() {
        this.navigate =
            [
                {
                    title: "Medicines",
                    url: "/medicines",
                    icon: "medkit"
                },
                {
                    title: "Interactions",
                    url: "/interactions",
                    icon: "flask"
                },
                {
                    title: "Food",
                    url: "/food",
                    icon: "pizza"
                },
                {
                    title: "About",
                    url: "/about",
                    icon: "information-circle"
                },
            ]

    }


}
