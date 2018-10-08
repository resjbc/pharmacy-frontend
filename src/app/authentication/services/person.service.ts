import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { IPerson } from '../components/create-person/person.interface';


@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private http: HttpService) { }

  getPerson(pid) {
    return this.http
               .requestGet(`person/${pid}`)
               .toPromise() as Promise<IPerson>;
  }

  getPersons() {
    return this.http
               .requestGet(`person/`)
               .toPromise() as Promise<IPerson[]>;
  }

  addPerson(person) {
    return this.http
               .requestPost(`person/add`,person)
               .toPromise() as Promise<IPerson>;
  }
}
