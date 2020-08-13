import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  readonly URl = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  get(url: string) {
    return this.http.get(`${this.URl}/${url}`)
  }
  post(url: string, payload: Object) {
    return this.http.post(`${this.URl}/${url}`, payload)
  }
  patch(url: string, payload: Object) {
    return this.http.patch(`${this.URl}/${url}`, payload)
  }
  delete(url: string) {
    return this.http.delete(`${this.URl}/${url}`)
  }
  login(email: string, password: string) {
    return this.http.post(`${this.URl}/users/login`, {
      email, password
    }, {
      observe: 'response'
    })
  }

}
