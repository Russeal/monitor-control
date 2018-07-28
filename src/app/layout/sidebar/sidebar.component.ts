import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NotificationService } from '../../services/notificationService';
import { NotificationDto } from '../../dto/notificationDto';

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
    // Usertype bn menular sonini olish
    if (localStorage.getItem('userType') === 'super_user') {
      this.isSuperAdmin = true;
      this.n = 6;
    } else {
      this.n = 5;
    }

    this.name = localStorage.getItem('name') + ' ' + localStorage.getItem('surname');
    this.imgSrc = localStorage.getItem('profileImg');

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
    // alert(st + 'subMenu' + id);
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
}