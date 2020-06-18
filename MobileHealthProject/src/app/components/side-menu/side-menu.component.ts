import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-side-menu',
    templateUrl: './side-menu.component.html',
    styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {

    navigate: any;

    constructor() {
        this.sideMenu();
    }

    ngOnInit() {
    }

    sideMenu() {
        this.navigate =
            [
                {
                    title: "Home",
                    url: "/home",
                    icon: "home"
                },
                {
                    title: "Medicines",
                    url: "/medicines",
                    icon: "medkit"
                },
                {
                    title: "Drug-Drug Interactions",
                    url: "/interactions",
                    icon: "flask"
                },
                {
                    title: "Food-Drug Interactions",
                    url: "/food",
                    icon: "pizza"
                },
                // {
                //     title: "Users",
                //     url: "/users",
                //     icon: "people"
                // },
                {
                    title: "About",
                    url: "/about",
                    icon: "information-circle"
                },
            ]
    }

}
