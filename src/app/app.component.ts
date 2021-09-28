import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'youtube-clone';

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    public toastr: ToastrService,
  ) {
    this.matIconRegistry.addSvgIcon(
      "access_point",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/access_point.svg")
    );
  }
}
