import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor() { }
}

export interface IAccount {
  firstname: string;
  lastname: string;
  email: string;
  password: string;

  id?: any;
  position?: string;
  image?: string;
  role?
  created?: Date,
  updated?: Date
}

export enum IRoleAccount {
  Member = 1,
  Cash,
  Pharmacy,
  Admin 
}
