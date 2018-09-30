import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { IActItem, ITypeItem, IListItem } from '../components/create-order/add-item/add-item.interface';

@Injectable()
export class AddlistService {

  constructor(private http: HttpService) { }

  getActs() {
    return this.http
               .requestGet(`act_type_list/act`)
               .toPromise() as Promise<IActItem[]>;
  }

  getTypes(id_act) {
    return this.http
               .requestGet(`act_type_list/type_in_act/${id_act}`)
               .toPromise() as Promise<ITypeItem[]>;
  }

  getLists(id_type) {
    return this.http
               .requestGet(`act_type_list/list_in_type/${id_type}`)
               .toPromise() as Promise<IListItem[]>;
  }
}
