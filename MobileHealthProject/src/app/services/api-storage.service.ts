import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import { InteractionModel } from "../models/interaction.model"

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ApiStorageService {

  interactionUrl:string = 'https://jsonplaceholder.typicode.com/todos';
  interactionLimit = '?_limit=5';

  constructor(private http: HttpClient) { }

  // Get Todos
  getInteractions(): Observable<InteractionModel[]>{
    return this.http.get<InteractionModel[]>(`${this.interactionUrl}${this.interactionLimit}`);
  }

  // Toggle Completed
  toggleCompleted(interaction: InteractionModel): Observable<any> {
    const url = `${this.interactionUrl}/${interaction.id}`;
    return this.http.put(url, interaction, httpOptions);
  }

  // Delete
  deleteInteraction(interaction:InteractionModel): Observable<any> {
    const url = `${this.interactionUrl}/${interaction.id}`;
    return this.http.delete(url, httpOptions);
  }

  // Delete
  addInteraction(interaction:InteractionModel): Observable<InteractionModel> {
    return this.http.post<InteractionModel>(this.interactionUrl, interaction, httpOptions);
  }
}
