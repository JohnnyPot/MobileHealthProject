import {Injectable} from "@angular/core";
import { Subject } from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({providedIn: 'root'}) //OR at app.module.ts, [providers]=PersonsService
export class PersonsService {
    /* We use personsChanged subject to keep track of the changes in
     * the string[] of persons. We emit events (next()) with this subject
     * We can now subscribe to this Event emitter from other places in this app.
     * */
    personsChanged = new Subject<string[]>();
    persons: string[] = [];

    constructor(private http: HttpClient) {

    }

    fetchPersons() {
        /* dont know if <any> is necessary */
        /* to transform data observables offer a number of options,
           check resources.
         */
        this.http.get<any>('https://swapi.dev/api/people')
            .pipe(map(resData => {
                //this is the normal JS method map(), that i ca use on any array
                return resData.results.map(character => character.name);
            }))
            .subscribe(transformedData => {
                this.personsChanged.next(transformedData);
            });
    }

    addPerson(name: string) {
        this.persons.push(name);
        console.log(name);
        this.personsChanged.next(this.persons);
    }

    removePerson(name: string) {
        this.persons = this.persons.filter(person => {
            return person !== name;
        });
        console.log(this.persons)
        this.personsChanged.next(this.persons);
    }
}