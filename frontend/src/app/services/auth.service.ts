import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {RequestService} from "./request.service";
import {Router} from "@angular/router";
import {shareReplay, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private requestService: RequestService, private router: Router ) { }
  login(email: string, password: string ) {
    this.requestService.login(email, password).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {

      })
    )
  }
  private setSession(userId: string, accessToken: string, refreshToken: string ) {
    localStorage.setItem('user-id', userId);
    localStorage.setItem('acccess-token', accessToken)
  }
}
