import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { CometChat } from '@cometchat-pro/chat';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginmodel: any = {};
  loading: boolean = false;
  constructor(private auth: AngularFireAuth, private route: Router, public toastr: ToastrService) { }

  public submit(form): void {
    console.log("call functions");
    // this.toastr.info("toaster works")
    this.loading = true;
    const email = form.email;
    const password = form.password;
    
    // if(email == true && password == true){
    this.auth.signInWithEmailAndPassword(email, password)
      .then(
        (res) => this.loginCometChat(res.user))
      .catch((error) => {
        console.log(error);
        this.toastr.error(error);
        this.loading = false;
      });
  
  }

  private loginCometChat(user: any) {
    const authKey = environment.AUTH_KEY;

    CometChat.login(user.uid, authKey)
      .then(() => this.route.navigate(['']))
      .catch((error) => {
        console.log(error);
        this.loading = false;
      });
  }
}
