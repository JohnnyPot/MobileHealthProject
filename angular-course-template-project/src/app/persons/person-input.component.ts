import {Component, EventEmitter, Output} from "@angular/core";
import {PersonsService} from "./persons.service";

/* selector is the way we reference this component in the rest of
 * the project (here: <app-person-input></app-person-input>
 */
@Component({
    selector: 'app-person-input',
    templateUrl: './person-input.component.html',
    styleUrls: ['./person-input.component.css']
})
export class PersonInputComponent {
    /* EventEmitter to output between components, will emit along with event
    * data from class <string> */
    /* Use @Output() so we can listen from outside component with an event-handler
    * declared like: (personCreate)="onPersonCreated()"*/
    /* No longer needed after service */
    //@Output() personCreate = new EventEmitter<string>();

    /* String property that we 2-way-bind to the value of <input> tag in html */
    enteredPersonName = '';

    /* Here we get exactly the same Object as we get in persons.component
     * because we defined it to be "provideIn: 'root'"
     * To change this behavior you can look at official docs, under DI
     * Here it is desirable.
     */
    constructor(private personsService: PersonsService) {
    }
    /* Event handler for click event of button */
    onCreatePerson(personName: string) {
        console.log('Created a person ' + this.enteredPersonName)
        /* Emit an event with the data specified */
        this.personsService.addPerson(this.enteredPersonName);
        /* Reset the input field */
        this.enteredPersonName = '';

    }
}