import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SidebarComponent } from './sidebar.component';

@Component({
  
  selector: 'app-header',
  template: `
    <div class="header">
      <div class="header__left">
        <mat-icon class="header__icon">menu</mat-icon>
        <img
        (click)="open()"
          [routerLink]="['']"
          class="header__logo"
          src="/assets/daydreamsoft_logo.png"
          alt="youtube logo"
        />
      </div>

   

      <div class="header__right">
        <mat-icon
          class="header__icon"
          [routerLink]="['/create']"
          title="create new event"
          >open_in_new</mat-icon
        >
        <img
          [routerLink]="['/profile']"
          [src]="user?.photoURL"
          class="mat-card-avatar"
          title="Your Profile"
        />
      </div>
    </div>
  `,
  styles: [
    `
      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
        position: sticky;
        top: 0;
        background-color: white;
        z-index: 100;
      }

      .header__icon {
        line-height: unset;
        cursor: pointer;
      }

      .header__logo {
        height: 59px;
        margin-left: 20px;
        cursor: pointer;
      }

      .header__logo:focus {
        outline: none;
      }

      .header__left,
      .header__middle,
      .header__right {
        display: flex;
        align-items: center;
      }

      .header__middle {
        width: 40%;
        border: 1px solid black;
      }

      .header__middle > input {
        flex: 1;
        border: none;
        padding: 0 10px;
      }

      .header__middle > input:focus,
      .header__middle > input:active {
        outline: none;
        border: none;
      }

      .header__searchBtn {
        width: 70px !important;
        background-color: #fafafa;
        border: none;
        border-left: 1px solid lightgray;
        color: gray;
        text-align: center;
        cursor: pointer;
      }

      .header__right > .header__icon {
        margin-right: 10px;
      }

      .mat-card-avatar {
        height: 40px;
        width: 40px;
        border-radius: 50%;
        flex-shrink: 0;
        object-fit: cover;
        cursor: pointer;
      }
    `,
  ],
})
export class HeaderComponent implements OnInit {
  @ViewChild('sidebar') sidebar: SidebarComponent;

  user: any = null;

  constructor(private auth: AngularFireAuth, private router: Router) {
    this.auth.authState.subscribe((authState) => (this.user = authState));
  }

  public open() {
    console.log("Sidebar Opened");
 }
 public close() {
  console.log("Sidebar Closed");
}
toggleClick() {
  console.log(("madhav"));
  
  this.sidebar.toggle();
}
closeClick() {
  this.sidebar.hide();
}

  ngOnInit(): void {}

  public submit(form: NgForm): void {
    if (form.valid) {
      this.router.navigate(['search', form.value.search])
    }
  }
}
