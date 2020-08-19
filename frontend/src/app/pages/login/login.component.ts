import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private  authService: AuthService, private router: Router) { }

  ngOnInit() {
  }
  onLoginClick(email: string, password: string) {
    console.log(email, password)
    this.authService.login(email, password).subscribe(res => {
      if (res.status === 200) {
        this.router.navigate(['/lists'])
      }
    })
  }

}
