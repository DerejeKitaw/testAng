import { Component , OnInit} from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'pv-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyCK8_FKLgB7GxcjSdIEwq1_9BV-UqTZsng',
      authDomain: 'pvdesign-86541.firebaseapp.com'
    });
  }
}
