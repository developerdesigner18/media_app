import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { CometChat } from '@cometchat-pro/chat';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  events: Array<any> = [];

  constructor(
    private firestore: AngularFirestore,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.route.params.subscribe((param) => {
      this.searchResult(param.keyword);
    });
  }

  ngOnInit(): void {}

  public searchResult(keyword: string) {
    this.firestore
      .collection('events', (ref) => ref.orderBy('timestamp', 'desc').limit(10))
      .snapshotChanges()
      .subscribe((snapshot) => {
        this.events = [];
        snapshot.forEach((childSnapshot) => {
          const key: string = childSnapshot.payload.doc.id;
          const data: any = childSnapshot.payload.doc.data();

          const title = data.title.toLowerCase()
          const channel = data.channel.toLowerCase()
          
          if (title.includes(keyword) || channel.includes(keyword))
            this.events.push({ ...data, key });

          });
        });
  }

  viewEvent(event: any) {
    this.joinGroup(event.key);
  }

  private joinGroup(guid: string) {
    const GUID = guid;
    const password = '';
    const groupType = CometChat.GROUP_TYPE.PUBLIC;

    CometChat.joinGroup(GUID, groupType, password)
      .then((group) => {
        console.log('Group joined successfully:', group);
        this.router.navigate(['events', guid]);
      })
      .catch((error) => {
        if (error.code != 'ERR_ALREADY_JOINED')
          console.log('Group joining failed with exception:', error);
        this.router.navigate(['events', guid]);
      });
  }

  public timeAgo(date: any) {
    const NOW: any = new Date();
    date = new Date(date);
    const times: any = [
      ['second', 1],
      ['minute', 60],
      ['hour', 3600],
      ['day', 86400],
      ['week', 604800],
      ['month', 2592000],
      ['year', 31536000],
    ];
    let diff: any = Math.round((NOW - date) / 1000);

    for (let t = 0; t < times.length; t++) {
      if (diff < times[t][1]) {
        if (t == 0) {
          return 'Just now';
        } else {
          diff = Math.round(diff / times[t - 1][1]);
          return diff + ' ' + times[t - 1][0] + (diff == 1 ? ' ago' : 's ago');
        }
      }
    }
  }
}
