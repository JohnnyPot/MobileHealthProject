import {Component, Input, OnDestroy, OnInit} from "@angular/core";
import {PersonsService} from "./persons.service";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-persons',
    templateUrl: './persons.component.html'
})
export class PersonsComponent implements OnInit, OnDestroy{
    /* No need for bindable property after service & Dependency Injection */
    //@Input() personList: string[];
    personList: string[];

    /* This is a property although it seems like variable*/
    isFetching = false;

    /* we use this to unsubscsribe on destroy */
    private personListSubs: Subscription;


    /* We get this from constructor as parameter, dont have
    * to declare here if i declare as private in cosntructor */
    //private personService: PersonsService;

    /* We can expect angular to pass the right arguments only if they
     * are declared as Injectable. It searches for an Injectable object of the
     * CLASS we declare.
     */
    /* If i declare prsService as private i dont have to do it above
    * and i can use in whole class as private */
    constructor(private prsService: PersonsService) {
        //this.personList = prsService.persons;
        //this.personService = prsService;
    }

    /* Best practise to do initialization tasks here, instead of constructor */
    ngOnInit(): void {
        /* This should be after subscription starts?? but it works?? */
        this.isFetching = true;
        this.prsService.fetchPersons();
        // this.personList = this.prsService.persons;

        /* When using your own subjects, you need to unbsubscribe when the
         * component gets destroyed, to prevent memory leaks when unused
         * subscriptions pile up
         */
        this.personListSubs = this.prsService.personsChanged.subscribe(persons => {
            this.personList = persons;
            this.isFetching = false;
        });
    }

    onRemovePerson(personName: string) {
        this.prsService.removePerson(personName);
    }

    ngOnDestroy(): void {
        this.personListSubs.unsubscribe();
    }
}