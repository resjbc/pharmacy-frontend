import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  private address: string = 'http://localhost:3000/';

  //ส่งข้อมูลแบบ Get method
  requestGet(url: string, accessToken?: string) {
    return this.http
      .get(`${this.address}${url}`,{
        headers: this.appendHeaders(accessToken)
      })
      .pipe(catchError(err => this.handleError(err)));
  }

  //ส่งข้อมูลแบบ Post method
  requestPost(url: string, body: any, accessToken?: string) {
    return this.http
      .post(`${this.address}${url}`, body, {
        headers: this.appendHeaders(accessToken)
      })
      .pipe(catchError(err => this.handleError(err)));
  }


  requestDelete(url: string, accessToken?: string) {
    return this.http
    .delete(`${this.address}${url}`, {
      headers: this.appendHeaders(accessToken)
    })
      .pipe(catchError(err => this.handleError(err)));
  }

  // ปรับแต่ง Error ใหม่
  private handleError(errResponse: HttpErrorResponse): Observable<any> {
    errResponse['Message'] = errResponse.message;
    if (errResponse.error && errResponse.error.message)
      errResponse['Message'] = errResponse.error.message;
    throw errResponse
  }

  //เพิ่ม Header
  private appendHeaders(accessToken) {
    const headers = {};
    if (accessToken) headers['Authorization'] = `Bearer ${accessToken}`;
    return new HttpHeaders(headers);
  }


}
