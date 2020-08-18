import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  onSignClick(email: string, password: string) {
    console.log(email, password)
    this.authService.signup(email, password).subscribe(data => {
      console.log(data)
    })
    this.router.navigate(['/login'])
  }

}
