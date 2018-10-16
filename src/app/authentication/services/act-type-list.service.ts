import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { IActItem, ITypeItem, IListItem } from '../components/create-order/add-item/add-item.interface';

@Injectable()
export class ActTypeListService {

  constructor(private http: HttpService) { }

  removeAct(id_act,accessToken: string) {
    return this.http
    .requestDelete(`act_type_list/act/${id_act}`,accessToken)
    .toPromise() as Promise<any>;
  }

  addAct(act,accessToken: string){
    return this.http
    .requestPost(`act_type_list/act`,act,accessToken)
    .toPromise() as Promise<IActItem>;
  }

  removeType(id_type,accessToken: string) {
    return this.http
    .requestDelete(`act_type_list/type_in_act/${id_type}`,accessToken)
    .toPromise() as Promise<any>;
  }

  addType(type,accessToken: string){
    return this.http
    .requestPost(`act_type_list/type_in_act/type`,type,accessToken)
    .toPromise() as Promise<ITypeItem>;
  }

  removeList(id_list,accessToken: string) {
    return this.http
    .requestDelete(`act_type_list/list_in_type/${id_list}`,accessToken)
    .toPromise() as Promise<any>;
  }

  addList(list,accessToken: string){
    return this.http
    .requestPost(`act_type_list/list_in_type/list`,list,accessToken)
    .toPromise() as Promise<IListItem>;
  }
}
