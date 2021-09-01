import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appResalta]'
})
export class ResaltaDirective {

  constructor(private _el:ElementRef ) {}

   @HostListener('mouseenter') onMouseEnter(){
    this.resaltar('yellow');
   }
   @HostListener('mouseleave') onMouseLeave(){
    this.resaltar(null);
   }

   private resaltar(color:string){
    this._el.nativeElement.style.backgroundColor=color; 
    if(color==null){
      this._el.nativeElement.style.fontWeight = "normal";
   }
    else{
      this._el.nativeElement.style.fontWeight = "bold";
  }
   }
}
