import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { IPerson } from '../components/create-person/person.interface';


@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private http: HttpService) { }

  getPerson(pid,accessToken: string) {
    return this.http
               .requestGet(`person/${pid}`,accessToken)
               .toPromise() as Promise<IPerson>;
  }

  getPersons(accessToken: string) {
    return this.http
               .requestGet(`person/employee/`,accessToken)
               .toPromise() as Promise<IPerson[]>;
  }

  getPersons_forAdmin(accessToken: string) {
    return this.http
               .requestGet(`person/`,accessToken)
               .toPromise() as Promise<IPerson[]>;
  }

  addPerson(person,accessToken: string) {
    return this.http
               .requestPost(`person/add`,person,accessToken)
               .toPromise() as Promise<IPerson>;
  }

  removePerson(person,accessToken: string) {
    return this.http
               .requestDelete(`person/${person}`,accessToken)
               .toPromise() as Promise<any>;
  }
}
