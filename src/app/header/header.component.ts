import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public isSmallHeader = false;

  constructor() { }
  ngOnInit(): void {
    window.addEventListener('scroll', () => {
      this.isSmallHeader = window.scrollY > 10;
    });
  }

}
