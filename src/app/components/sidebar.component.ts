import { Component, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { EventsComponent } from '../events/events.component';

@Component({
  selector: 'app-sidebar',
  template: `
    <app-rows title="Create event" icon="open_in_new"  [routerLink]="['/create']"></app-rows>
    <app-rows title="Register" icon="account_box"  [routerLink]="['/register']"></app-rows>
    <app-rows title="Login" icon="login"  [routerLink]="['/login']"></app-rows>
    <app-rows title="Profile" icon="verified_user"  [routerLink]="['/profile']"></app-rows>




    <!---<app-rows title="Trending" icon="whatshot"></app-rows>
    <app-rows title="Subscription" icon="subscriptions"></app-rows>
    <hr class="sidebar__hr" />
    <app-rows title="Library" icon="video_library"></app-rows>
    <app-rows title="History" icon="history"></app-rows>
    <app-rows selected="true" svg="access_point" title="Live"></app-rows>
    <app-rows title="Your Videos" icon="tv"></app-rows>
    <app-rows title="Watch Later" icon="watch_ater"></app-rows>
    <app-rows title="Liked Videos" icon="thumb_up_alt_outlined"></app-rows>
    <app-rows title="Show More" icon="expand_more_outlined"></app-rows>
    <hr class="sidebar__hr" />--->
    <button class="logout" (click)="logOut()">Logout</button>
  `,
  styles: [
    `
      .sidebar__hr {
        height: 1px;
        border: 0;
        background-color: lightgray;
        margin-top: 10px;
        margin-bottom: 10px;
      }

      .logout{
        font-family: "Roboto", sans-serif;
        text-transform: uppercase;
        outline: 0;
        background: #0020ff;
        width: 100%;
        border: 0;
        padding: 15px;
        color: #ffffff;
        font-size: 14px;
        transition: all 0.3 ease;
        cursor: pointer;
        position: relative;
        top: 380px;
    }

      
    `,
  ],
})
export class SidebarComponent {
  // @ViewChild('about = true', { static: true }) captchaElem: EventsComponent;
  about: boolean = false;

  hide() {
    throw new Error('Method not implemented.');
  }
  toggle() {
    throw new Error('Method not implemented.');
  }
  constructor(private auth: AngularFireAuth, private route: Router) {}

  public logOut(): void {
    this.auth
      .signOut()
      .then(() => this.route.navigate(['login']))
      .catch((error) => console.log(error.message))
  }
}
