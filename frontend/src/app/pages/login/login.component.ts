import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private  authService: AuthService) { }

  ngOnInit() {
  }
  onLoginClick(email: string, password: string) {
    console.log(email, password)
    this.authService.login(email, password).subscribe(data => {
      console.log(data)
    })
  }

}
