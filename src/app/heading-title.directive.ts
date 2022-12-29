import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHeadingTitle]'
})
export class HeadingTitleDirective {

  constructor(private el: ElementRef) { 
    el.nativeElement.style.color = 'white';
    el.nativeElement.style.paddingLeft = '21px';
    el.nativeElement.style.fontSize = '1.25rem';
    el.nativeElement.style.fontWeight = 'bold';
  }

}
