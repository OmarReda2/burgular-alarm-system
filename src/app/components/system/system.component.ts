import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Component, OnInit, ViewContainerRef, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { DataService } from 'src/app/shared/data.service';



declare let $: any

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.css']
})
export class SystemComponent implements OnInit {

  doorsList: any[] = [];
  windowsList: any[] = [];
  Battery: any[] = [];
  motion: any[] = [];

  doorsAlarm: any[] = [];
  windowsAlarm: any[] = [];
  toggle: boolean = true

  x = new Subscription()
  x2 = new Subscription()
  x3 = new Subscription()
  x4 = new Subscription()




  constructor(
    private data: DataService,
    private auth: AuthService,
    private router: Router,
    private vcr: ViewContainerRef,
    private cfr: ComponentFactoryResolver,
  ) {
    this.getDoors();
    this.getWindows();
    this.getBattery();
    this.getMotion()
  }





  isLoaded = false
  getDoors() {
    this.isLoaded = true
    this.x = this.data.getDoors().subscribe(res => {
      this.isLoaded = false



      this.doorsList = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;


        this.doorsAlarm.push(data)
        return data;
      })
    }, err => {
      this.isLoaded = false
      alert(err.message)
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






  getWindows() {
    this.x4 = this.data.getWindows().subscribe(res => {
      this.windowsList = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;

        this.windowsAlarm.push(data)
        return data;
      })
    }, err => {
      alert(err.message)
    })
  }





  decIntrv: any
  incInterval: any
  disable: boolean = true
  batterySim(number: any) {
    this.disable = false
    let counter = this.Battery[0]?.status;
    let battery = this.Battery[0]

    this.decIntrv = setInterval(() => {
      if (counter >= 85 && battery.broken == 'off') {
        counter--
        this.data.updateBattery(counter)
      } else if (counter < 85 && battery.broken == 'off') {

        clearInterval(this.decIntrv)
        this.incInterval = setInterval(() => {
          if (counter == 100) {
            this.disable = true
            clearInterval(this.decIntrv)
            clearInterval(this.incInterval)
          } else {
            counter++
            this.data.updateBattery(counter)
          }

        }, number);

      } else {
        counter--
        this.data.updateBattery(counter)
        if (counter == 0) {
          this.disable = true
          clearInterval(this.decIntrv)
        }
      }
    }, number);
  }

  stopInterval() {
    this.disable = true
    clearInterval(this.decIntrv)
    clearInterval(this.incInterval)
  }

  speedInterval() {
    clearInterval(this.decIntrv)
    clearInterval(this.incInterval)
    this.batterySim(250)
  }



  batteryProgress() {
    $('.battery-prog').html(
      `<div class="progress-bar text-dark rounded-3 ${this.batteryDanger('card', this.Battery[0]?.status)} role="progressbar "
      style="width: ${this.Battery[0]?.status}%" aria-valuenow="${this.Battery[0]?.status}"
      aria-valuemin="0" aria-valuemax="100">${this.Battery[0]?.status}%</div>`
    )
  }

  toggleOnOff() {
    if (this.toggle == true) {
      return 'off'
    } else {
      return 'on'
    }

  }


  // el 'else' msh shaghala
  batteryDanger(type: string, status?: any) {
    if (status <= 80) {
      if (type == 'card') {
        if (this.toggle == true) {

          $('.battery-prog').fadeToggle(500)

        } else {
          $('.battery-prog').css({ display: 'block', opacity: '1' })
        }
        $('.battery-card').removeClass('bg-primary')
        $('.battery-card').addClass('bg-danger')
        return 'bg-danger'
      } else {
        return 'text-danger'
      }
    } else {
      if (type == 'card') {
        $('.battery-prog').stop()
        $('.battery-prog').css({ opacity: 1, display: 'block' })
        $('.battery-card').removeClass('bg-danger')
        $('.battery-card').addClass('bg-primary')
        return 'bg-primary'
      } else {
        return 'text-light'
      }
    }
  }



  // ha3mel wahda tanya
  batteryDangerNav() {
    let battery = this.Battery[0]
    if (battery?.status <= 80) {
      return 'text-danger'
    } else if (battery?.status > 80 && battery?.status <= 90) {
      return 'text-primary'
    } else {
      return ''
    }
  }




  batterybroken(type: string) {
    let battery = this.Battery[0]
    // if (battery?.broken == 'off' && battery?.status <= 90 && battery?.status > 80) {
    // if (battery?.broken == 'on' && battery?.status <= 90) {
    if (battery?.status <= 90) {
      if (type == 'card') {
        if (this.toggle == true) {

          $('.fa-plug-circle-bolt-card-icon').fadeToggle(500)

        } else {
          $('.fa-plug-circle-bolt-card-icon').css({ display: 'block', opacity: '1' })
        }

        return 'text-primary'
      } else {
        return 'text-primary'
      }
    }


    else {
      if (type == 'card') {
        $('.fa-plug-circle-bolt-card-icon').stop()
        $('.fa-plug-circle-bolt-card-icon').css('opacity', 1)
        return ''
      } else {
        return ''
      }
    }
  }




  powerSupplyTest(type: string) {
    let battery = this.Battery[0]
    if (battery?.status <= 90) {
      if (type == 'card') {
        if (this.toggle == true) {

          $('.fa-gears-card-icon').fadeToggle(500)

        } else {
          $('.fa-gears-card-icon').css({ display: 'block', opacity: '1' })
        }


        return 'text-primary'
      } else {
        return 'text-primary'
      }


    } else {
      if (type == 'card') {
        $('.fa-gears-card-icon').stop()
        $('.fa-gears-card-icon').css('opacity', 1)
        return ''
      } else {
        return ''
      }
    }
  }




  callTeknkn(type: string) {
    let battery = this.Battery[0]

    if (battery?.status <= 80) {
      if (type == 'card') {
        if (this.toggle == true) {

          $('.fa-screwdriver-wrench-card-icon').fadeToggle(500)

        } else {
          $('.fa-screwdriver-wrench-card-icon').css({ display: 'block', opacity: '1' })
        }

        return 'text-primary'
      } else {
        return 'text-primary'
      }


    } else {
      if (type == 'card') {
        $('.fa-screwdriver-wrench-card-icon').stop()
        $('.fa-screwdriver-wrench-card-icon').css('opacity', 1)
        return ''
      } else {
        return ''
      }
    }
  }



  callPolice(src: string, clrSafe: string, list: any[]) {
    if (list.some(e => e.status === 'open')) {
      if (this.toggle == true) {

        $(`.${src}-police`).fadeToggle(500)

      } else {
        $(`.${src}-police`).css({ display: 'block', opacity: '1' })
      }

      return `alert-danger`
    } else {
      $(`.${src}-police`).stop()
      $(`.${src}-police`).css('opacity', 1)
      return `alert-${clrSafe}`
    }
  }

  callPoliceBattery() {
    if (this.Battery[0]?.status <= 80) {
      if (this.toggle == true) {

        $('.police-battery').fadeToggle(500)

      } else {
        $('.police-battery').css({ display: 'block', opacity: '1' })
      }

      return 'text-primary'
    } else {
      $('.police-battery').stop()
      return ''
    }

  }

  callPoliceNav() {
    if (
      this.windowsList.some(e => e.status === 'open') ||
      this.doorsList.some(e => e.status === 'open') ||
      this.Battery[0]?.status <= 80
    ) {
      return 'text-primary'
    } else {
      return ''
    }
  }








  doorAlarm(type: string) {
    let clr = ''
    for (let i = 0; i < this.doorsList.length; i++) {
      if (this.doorsList[i]?.status == 'open') {
        if (type == 'card') {
          clr = 'bg-danger'
        } else {
          clr = 'text-danger'
        }
        break
      }
      else {
        if (type == 'card') {
          clr = 'bg-success'
        } else {
          clr = 'text-light'
        }
      }
    }
    return clr
  }




  windowAlarm(type: string) {
    let clr = ''
    for (let i = 0; i < this.windowsList.length; i++) {
      if (this.windowsList[i]?.status == 'open') {
        if (type == 'card') {
          clr = 'bg-danger'
        } else {
          clr = 'text-danger'
        }
        break
      }
      else {
        if (type == 'card') {
          clr = 'bg-warning'
        } else {
          clr = 'text-light'
        }
      }
    }
    return clr
  }





  motionAlarm(type: string) {
    if (this.motion[0]?.status == 'detected') {
      if (type == 'card') {
        $('.fa-person-walking-card-icon').addClass('text-danger')
        if (this.toggle == true) {

          $('.fa-person-walking-card-icon').fadeToggle(500)

        } else {
          $('.fa-person-walking-card-icon').css({ display: 'block', opacity: '1' })
        }

        return 'bg-danger'
      } else {
        return 'text-danger'
      }
    }
    else {
      if (type == 'card') {
        $('.fa-person-walking-card-icon').removeClass('text-danger')
        $('.fa-person-walking').stop()
        return 'bg-dark'
      } else {
        return 'text-light'
      }
    }
  }






  showSensorInputs() {
    $('.fa-chevron-up').toggleClass(['fa-rotate-180'])
    $('.sensor-inputs').slideToggle()
  }


  command = ''
  checkCommand() {
    if (this.command == 'stop') {

      this.doorsList.map(e => {
        this.data.updateDoors(e.id, 'close');
      })

      this.windowsList.map(e => {
        this.data.updateWindow(e.id, 'close');
      })

      this.Battery.map(e => {
        this.data.updateBattery(100);
      })

      this.motion.map(e => {
        this.data.updateMotion('not detected');
      })


    }
  }



  logOut() {
    this.auth.logOut();
  }



  stopToSynch: boolean = false
  synchToggle() {
    this.stopToSynch = true
    this.stopToSynch = false
  }







  ngOnInit(): void {
    setInterval(() => {
      for (let i = 0; i < this.doorsAlarm.length; i++) {

        if (this.doorsAlarm[i]?.status == 'open') {
          if (this.toggle == true) {

            $('#' + this.doorsAlarm[i].id).fadeToggle(500)

          } else {
            $('#' + this.doorsAlarm[i].id).css({ display: 'block', opacity: '1' })
          }



        } else {
          $('#' + this.doorsAlarm[i].id).stop()
        }
      }
    }, 500)





    setInterval(() => {
      for (let i = 0; i < this.windowsAlarm.length; i++) {


        if (this.windowsAlarm[i]?.status == 'open') {
          if (this.toggle == true) {

            $('#' + this.windowsAlarm[i].id).fadeToggle(500)

          } else {
            $('#' + this.windowsAlarm[i].id).css({ display: 'block', opacity: '1' })
          }

        } else {
          $('#' + this.windowsAlarm[i].id).stop()

        }
      }
    }, 500)



  }

  ngOnDestroy(): void {
    this.router.navigate(['/system'])
    console.log(1);

    this.x.unsubscribe();
    this.x2.unsubscribe();
    this.x3.unsubscribe();
    this.x4.unsubscribe();
  }
}
