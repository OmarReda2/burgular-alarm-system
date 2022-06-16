import { Router } from '@angular/router';
import { AuthService } from './../../shared/auth.service';
import { Component, OnInit } from '@angular/core';
declare var $: any

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public auth: AuthService, private router: Router) { }
  email: string = ''
  password: string = ''
  access: boolean = false
  freeEmail = 'ooo@ooo.com'
  freePass = 'ooo123'


  freeAccess() {
    this.access = true
    this.email = this.freeEmail
    this.password = this.freePass

    this.auth.login(this.email, this.password)
  }


  login() {
    if (this.email == '' || this.password == '') {
      this.auth.message = 'please fill all inputs'
      return
    }

    this.auth.login(this.email, this.password)
  }





  ngOnInit(): void {
    $('#background').particleground({
      dotColor: '#6291ae',
      lineColor: '#6291ae',
      proximity: 200,
      minSpeedX: 0,
      minSpeedY: 0,
      maxSpeedY: 0,
      maxSpeedX: 0,
      density: 16000
    });
    this.auth.message = ''
  }

// ngOnDestroy(): void {
//   $('#background').destroy()
// }
}
