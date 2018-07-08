import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pv-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  pageTitle = 'Menu';
  constructor() { }

  ngOnInit() {
  }

}
