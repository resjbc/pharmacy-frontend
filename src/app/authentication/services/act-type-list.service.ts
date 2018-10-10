import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { IActItem } from '../components/create-order/add-item/add-item.interface';

@Injectable()
export class ActTypeListService {

  constructor(private http: HttpService) { }

  removeAct(id_act) {
    return this.http
    .requestDelete(`act_type_list/act/${id_act}`)
    .toPromise() as Promise<any>;
  }

  addAct(act){
    return this.http
    .requestPost(`act_type_list/act`,act)
    .toPromise() as Promise<IActItem>;
  }
}
