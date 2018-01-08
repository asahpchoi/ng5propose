import { Component, OnInit } from '@angular/core';
import anime from 'animejs';

@Component({
  selector: 'app-multiple',
  templateUrl: './multiple.component.html',
  styleUrls: ['./multiple.component.css']
})
export class MultipleComponent  {

  constructor() {

  }


  animation() {
      anime({
          targets: '#animation_1 .animate',
          translateX: [
              { value: 250, duration: 1000 },
              { value: 0, duration: 1000 }
          ],
          duration: 2000,
          loop: false,
          autoplay: false
     });
  }

}
