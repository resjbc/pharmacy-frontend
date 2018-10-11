import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { IActItem, ITypeItem } from '../components/create-order/add-item/add-item.interface';

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

  removeType(id_type) {
    return this.http
    .requestDelete(`act_type_list/type_in_act/${id_type}`)
    .toPromise() as Promise<any>;
  }

  addType(type){
    return this.http
    .requestPost(`act_type_list/type_in_act/type`,type)
    .toPromise() as Promise<ITypeItem>;
  }
}
