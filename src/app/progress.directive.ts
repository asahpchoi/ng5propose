import {
    Component,
    Directive,
    Renderer,
    ElementRef,
    NgModule,
    Input,
    Output,
    EventEmitter
} from '@angular/core';

@Directive({
  selector: '[.appProgress]'
})
export class ProgressDirective {
  constructor(private el: ElementRef) {
  }
}
