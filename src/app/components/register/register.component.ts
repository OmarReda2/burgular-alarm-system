import { AuthService } from './../../shared/auth.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

declare var $: any

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public auth: AuthService) { }
  email: string = ''
  password: string = ''



  register() {
    if (this.email == '' || this.password == '') {
      this.auth.regMessage = 'please fill all inputs'
      return
    }

    this.auth.register(this.email, this.password)
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


    this.auth.regMessage = ''
  }

  // ngOnDestroy(): void {
  //   $('#background').destroy()
  // }
}
