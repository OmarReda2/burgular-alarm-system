import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from 'src/app/shared/auth.service';
import { DataService } from 'src/app/shared/data.service';



@Component({
  selector: 'app-sensor-inputs',
  templateUrl: './sensor-inputs.component.html',
  styleUrls: ['./sensor-inputs.component.css']
})
export class SensorInputsComponent implements OnInit {




  constructor(private afs: AngularFirestore, private auth: AuthService, private data: DataService) { }



  x = new Subscription()
  x2 = new Subscription()

  x3 = new Subscription()
  x4= new Subscription()


  doorId: any = "";
  windowId: any = "";

  doorsList: any[] = [];
  windowsList: any[] = [];
  Battery:any = 100
  motion:any = 'not detected'

  doorStatus: any = "";
  windowStatus: any = "";
  batteryStatus = this.Battery[0]?.status
  batterybroken =  this.Battery[0]?.broken
  motionStatus = this.motion[0]?.status







  updateDoor() {
    this.data.updateDoors(this.doorId, this.doorStatus);
  }

  updateWindow() {
    this.data.updateWindow(this.windowId, this.windowStatus);
  }


  updateBattery() {
    this.data.updateBattery(this.batteryStatus);
  }

  updateBatterybroken() {
    this.data.updateBatterybroken(this.batterybroken);
  }

  updateMotion() {
    this.data.updateMotion(this.motionStatus);

  }




  getDoors() {
    this.x = this.data.getDoors().subscribe(res => {
      this.doorsList = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })

    }, err => {
      alert('Error while fetching doors and windows data');
    })
  }



  getWindows() {
    this.x2 = this.data.getWindows().subscribe(res => {
      this.windowsList = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })

    }, err => {
      alert('Error while fetching doors and windows data');
    })
  }



  getBattery() {
    this.x2 = this.data.getBattery().subscribe(res => {
      this.Battery = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })

    }, err => {
      alert(err.message)
    })
  }




  getMotion() {
    this.x3 = this.data.getMotion().subscribe(res => {
      this.motion = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        console.log(data);

        return data;
      })

    }, err => {
      alert(err.message)
    })
  }



  logOut() {
    this.auth.logOut();
  }

  ngOnInit(): void {
    this.getDoors();
    this.getWindows();
    this.getBattery();
    this.getMotion()
  }

  ngOnDestroy(): void {
  this.x.unsubscribe()
  this.x2.unsubscribe()
  }
}
