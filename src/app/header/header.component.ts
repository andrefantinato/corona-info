import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  

  constructor() { }

  ngOnInit() {
  }

  collapsed = false;
  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
    console.log(this.collapsed);
  }

}
