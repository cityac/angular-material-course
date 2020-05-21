import { Component, ViewChild, ElementRef } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('sidenav') sidebar: MatSidenav;
  title = 'fitness-tracker-project';

  toggleSidebar() {
    console.log('TOGGLE!!!!!');
    this.sidebar.toggle();
  }
}
