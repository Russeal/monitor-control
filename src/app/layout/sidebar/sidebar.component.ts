import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NotificationService } from '../../services/notificationService';
import { NotificationDto } from '../../dto/notificationDto';
import { LocalStorageSecurity } from '../../dto/localStorageSecurity';

const MINUTES_UNITL_AUTO_LOGOUT = 5; // in mins
const CHECK_INTERVAL = 15000; // in ms
const STORE_KEY = 'lastAction';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  providers: [ NotificationService ]
})
export class SidebarComponent implements OnInit {

  public name: String = '';
  public isSuperAdmin: boolean = false;
  public n: Number;
  public imgSrc: string;
  public ntfcCount: number;
  public ntfcList: Array<NotificationDto>;
  public notification: NotificationDto;

  constructor(private router: Router, private ntfcService: NotificationService) {
    this.ntfcList = [];
  }

  ngOnInit() {
    localStorage.setItem('lastAction', Date.now().toString());
    this.check();
    this.initListener();
    this.initInterval();

    // Usertype bn menular sonini olish
    if (LocalStorageSecurity.getItem('userType') === 'super_user') {
      this.isSuperAdmin = true;
      this.n = 6;
    } else {
      this.n = 5;
    }

    this.name = LocalStorageSecurity.getItem('name') + ' ' + LocalStorageSecurity.getItem('surname');
    this.imgSrc = LocalStorageSecurity.getItem('profileImg');

    this.getNotificationList();
    // Navbarni dizaynini o'zgartirib turish.
    window.onscroll = function() {
      if ( document.documentElement.scrollTop > 50) {
        document.querySelector('nav.navbar').classList.add('top-nav-collapse');
        document.querySelector('nav.sidebar').classList.add('sidebarToTop');
      } else {
        document.querySelector('nav.navbar').classList.remove('top-nav-collapse');
        document.querySelector('nav.sidebar').classList.remove('sidebarToTop');
      }
    }
  }

  // Sub-menuni ochish
  changeSubMenu(st, id) {
    if (document.getElementById(st + 'subMenu' + id).style.height !== '0px') {
      document.getElementById(st + 'boshMenu' + id).children[0].classList.remove('active');
      document.getElementById(st + 'subMenu' + id).style.height = '0px';
    } else {
      for (var i = 0; i < this.n; i++) {
        if (i !== id && document.getElementById(st + 'boshMenu' + i).children[0].classList.contains('active')) {
          document.getElementById(st + 'boshMenu' + i).children[0].classList.remove('active');
          document.getElementById(st + 'subMenu' + i).style.height = '0px';
          break;
        }
      }
      document.getElementById(st + 'boshMenu' + id).children[0].classList.toggle('active');
      document.getElementById(st + 'subMenu' + id).style.height = 32 * document.getElementById(st + 'subMenu' + id).children[0].children.length + 'px';
    }
  }

  // sidebarni kichkina ekranda ochish
  sidebarToggle() {
    if (document.getElementById('sidebar').style.transform === 'translateX(0px)') {
      document.getElementById('sidebar').style.removeProperty('transform');
    } else {
      document.getElementById('sidebar').style.transform = 'translateX(0px)';
    }
  }

  sidebarClose(url: String) {
    document.getElementById('sidebar').style.removeProperty('transform');
    if (url==='/bulimlar') {
      this.router.navigate(["/bo'limlar"]);
    } else{
      this.router.navigate([url]);
    }
  }
  // Log Outni ishlatish
  openLogOut() {
    document.getElementById('logOut').classList.add('modal-open');
    (<HTMLElement>document.querySelector('.infPages')).style.filter = 'blur(1px)';
    (<HTMLElement>document.querySelector('.sidebar')).style.filter = 'blur(1px)';
    document.getElementById('logOut').style.filter  = 'none !important';
  }

  cancelLogOut(id) {
    document.getElementById(id).classList.remove('modal-open');
    document.querySelector('.infPages').removeAttribute('style');
    document.querySelector('.sidebar').removeAttribute('style');
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['log-in']);
    document.querySelector('.infPages').removeAttribute('style');
    document.querySelector('.sidebar').removeAttribute('style');
  }

  openNtfcModal(id) {
    this.ntfcService.getNotification(id).subscribe(
      (data) => {
        this.notification = data;
        setTimeout(() => {
          document.getElementById('ntfcRead').classList.add('modal-open');
          (<HTMLElement>document.querySelector('.infPages')).style.filter = 'blur(1px)';
          (<HTMLElement>document.querySelector('.sidebar')).style.filter = 'blur(1px)';
          document.getElementById('ntfcRead').style.filter  = 'none !important';
        }, 100);
      },
      error => console.log(error)
    );
  }

  private getNotificationList() {
    this.ntfcService.getNotReadNotifications().subscribe(
      (data) => {
        this.ntfcList = data;
        this.ntfcCount = data.length;
      },
      error => console.log(error)
    );
  }
  
  finishReadingNtfc() {
    this.ntfcService.readNotification(this.notification.id).subscribe(
      (data) => {
        if (data.state === 1) {
          this.notification = null;
          this.cancelLogOut('ntfcRead');
          this.getNotificationList();
        }
      },
      error => console.log(error)
    );
  }

  private getLastAction() {
    return parseInt(localStorage.getItem(STORE_KEY));
  }

  private setLastAction(lastAction: number) {
    localStorage.setItem(STORE_KEY, lastAction.toString());
  }

  private initListener() {
    document.body.addEventListener('click', () => this.reset());
    document.body.addEventListener('mouseover', () => this.reset());
    document.body.addEventListener('mouseout', () => this.reset());
    document.body.addEventListener('keydown', () => this.reset());
    document.body.addEventListener('keyup', () => this.reset());
    document.body.addEventListener('keypress', () => this.reset());
  }

  private reset() {
    this.setLastAction(Date.now());
  }

  private refreshIntervalId;

  private initInterval() {
    this.refreshIntervalId = setInterval(() => {
      this.check();
    }, CHECK_INTERVAL);
  }

  private check() {
    const now = Date.now();
    const timeleft = this.getLastAction() + MINUTES_UNITL_AUTO_LOGOUT * 60 * 1000;
    const diff = timeleft - now;
    const isTimeout = diff < 0;

    if (isTimeout) {
      this.logOut();
    }
  }
}