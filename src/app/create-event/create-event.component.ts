import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { CometChat } from '@cometchat-pro/chat';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css'],
})
export class CreateEventComponent {
  loading: boolean = false;
  authState: any = null;
  checkboxlist:any = [];
  checkboxformarray: Array<any> = [];
  categories = [
    { name: '10-15 years', id: 1 },
    { name: '15-18 years', id: 2 },
    { name: '18+ years', id: 3 },
  ];

  onChange(name: string, isChecked: boolean) {
    if (isChecked) {
      console.log('this.checkboxformarray', this.checkboxformarray);
      this.checkboxformarray.push(name);
      this.checkboxlist = this.checkboxformarray
    } else {
      let index = this.checkboxformarray.indexOf(name );
      this.checkboxformarray.splice(index, 1);
      this.checkboxlist = this.checkboxformarray

    }
  }

  
  constructor(
    private firestore: AngularFirestore,
    private auth: AngularFireAuth,
    public router:Router
  ) {
    this.auth.authState.subscribe((authState) => (this.authState = authState));
  }

  public submit(form: NgForm): void {
    if (form.valid) {
      this.loading = true;
      const data = form.value;
      data.timestamp = new Date().toJSON();
      data['Checkboxvalue'] = this.checkboxformarray
      // data.views = this.randomNumber(100, 300);
      data.uid = this.authState.uid;
      console.log(data,"data");
      console.log(data.id,"data.id");
      this.firestore
        .collection('events')
        .add(data)  
        .then((d) => {
          form.reset();
          const groupName = this.toVideoId(data.videoId);
          const guid = d.id;
          this.cometChatCreateGroup({ groupName, guid });
        });    
        this.router.navigateByUrl("/events")
    }
  }

  private cometChatCreateGroup(data: any) {
    const GUID = data.guid;
    const groupName = data.groupName;
    const groupType = CometChat.GROUP_TYPE.PUBLIC;
    const password = '';

    const group = new CometChat.Group(GUID, groupName, groupType, password);

    CometChat.createGroup(group)
      .then((group) => console.log('Group created successfully:', group))
      .catch((error) => {
        console.log('Group creation failed with exception:', error)
        this.loading = false;
      });
  }

  private toVideoId(url: string) {
    const regExp = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
    return url.match(regExp)[1];
  }

  private randomNumber(min, max): Number {
    const r = Math.random() * (max - min) + min;
    return Math.floor(r);
  }
}
