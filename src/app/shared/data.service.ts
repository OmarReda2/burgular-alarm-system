
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private afs: AngularFirestore) {}
  isLoaded:boolean = false



  getDoors() {
    this.isLoaded = true
    return this.afs.collection('/Doors').snapshotChanges();
  }

  getWindows() {
    return this.afs.collection('/Windows').snapshotChanges();
  }

  getBattery() {
    return this.afs.collection('/Battery').snapshotChanges();
  }

  getMotion() {
    return this.afs.collection('/Motion').snapshotChanges();
  }



  updateDoors(id:number, status:any) {
    let coll = this.afs.collection("/Doors");
    coll.doc(`${id}`).update({status: `${status}`});
   }


  updateWindow(id:number, status:any) {
    let coll = this.afs.collection("/Windows");
    coll.doc(`${id}`).update({status: `${status}`});
   }


  updateBattery( status:number) {
    let coll = this.afs.collection("/Battery");
    coll.doc(`B1`).update({status: `${status}`});
   }

  updateBatterybroken( broken:any) {
    let coll = this.afs.collection("/Battery");
    coll.doc(`B1`).update({broken: `${broken}`});
   }

  updateMotion( status:any) {
    let coll = this.afs.collection("/Motion");
    coll.doc(`M1`).update({status: `${status}`});
   }
}
