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
}
