import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  readonly URl = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  get(url: string) {
      this.http.get(`${this.URl}/${url}`)
  }
  post(url: string, payload: Object) {
    this.http.post(`${this.URl}/${url}`, payload)
  }
  patch(url: string, payload: Object) {
    this.http.patch(`${this.URl}/${url}`, payload)
  }
  delete(url: string) {
    this.http.delete(`${this.URl}/${url}`)
  }

}
