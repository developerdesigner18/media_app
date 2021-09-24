import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-video',
  template: `
    <div class="videoCard">
      <img class="videoCard__thumbnail" [src]="image" [alt]="channel" />
      <div *ngIf="live == 'true'" class="videoCard__indicator">
        <mat-icon svgIcon="access_point"></mat-icon>
        <p>LIVE</p>
      </div>
      <div class="video__text">
        <h4>{{ title }}</h4>
        <p>{{ timestamp }}</p>
      </div>
    </div>
  `,
  styles: [
    `
      .mat-card-avatar {
        height: 40px;
        width: 40px;
        border-radius: 50%;
        flex-shrink: 0;
        object-fit: cover;
      }

      .videoCard {
        margin-bottom: 40px;
        width: 270px;
        position: relative;
        cursor: pointer;
      }

      .videoCard:focus,
      .videoCard:active,
      .videoCard:hover {
        border: none;
        outline: none;
        box-shadow: none;
      }

      .videoCard__thumbnail {
        height: 140px;
        width: 250px;
        display: block;
      }

      .video__text {
        margin-top: 10px;
        padding-right: 30px;
      }

      .video__text > h4 {
        font-size: 14px;
        margin-bottom: 5px;
      }

      .video__text > p {
        font-size: 14px;
        color: gray;
      }

      .videoCard__indicator {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        right: 25px;
        top: 110px;
        padding: 5px;
        color: white;
        background-color: rgb(216, 2, 2);
        border-radius: 4px;
        height: 15px;
      }

      .videoCard__indicator > img {
        width: 40px;
      }

      .videoCard__indicator > p {
        font-weight: 500;
        margin: 0;
      }
    `,
  ],
})
export class VideoComponent {
  @Input() image: string = '';
  @Input() title: string = '';
  @Input() channel: string = '';
  @Input() views: string = '';
  @Input() timestamp: string = '';
  @Input() live: string = 'false';

  ngOnInit(): void {}
}
