import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private fireAuth: AngularFireAuth, private router: Router) { }
  isLogin = new BehaviorSubject(false)
  isRegister = new BehaviorSubject(false)
  message: string = ''
  regMessage: string = ''











  login(email: string, password: string) {

    this.isLogin.next(true)
    this.fireAuth.signInWithEmailAndPassword(email, password).then(
      () => {
        this.isLogin.next(false)
        this.router.navigate(['/system']);
        localStorage.setItem("isLogin", 'true');
      },
      (err) => {
        this.isLogin.next(false)
        this.message = err.message
      }
    );
  }






  // register methode
  register(email: string, password: string) {
    this.isRegister.next(true)
    this.fireAuth.createUserWithEmailAndPassword(email, password).then(
      () => {
        this.isRegister.next(false)
        this.router.navigate(['/login']);
      },
      (err) => {
        this.isRegister.next(false)
        this.regMessage = err.message
      }
    );
  }



  clearValidation(msg:string){
    return msg.replace('Firebase:','')
  }





  // sign out
  logOut() {
    this.fireAuth.signOut().then(
      () => {
        // this.isLogin2 = false
        localStorage.removeItem('isLogin');
        this.router.navigate(['/login']);
      },
      (err) => {
        alert(err.message);
      }
    );
  }
}
