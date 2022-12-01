import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-pc-header',
  templateUrl: './pc-header.component.html',
  styleUrls: ['./pc-header.component.scss'],
})
export class PcHeaderComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
    var pc = window.document.getElementById('pc-fixed')!;
    var pcSticky = 0;

    if (pc !== null) {
      pcSticky = pc.offsetTop;
    }

    window.addEventListener('scroll', scroll, true);

    function scroll() {
      if (pc !== undefined) {
        if (window.pageYOffset > pcSticky) {
          pc.classList.add('sticky');
        } else {
          pc.classList.remove('sticky');
        }
      }
  }
  }

}
