import {Directive, EventEmitter, HostBinding, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[appDragAndDrop]'
})
export class DragAndDropDirective {
  @HostBinding('class.fileover') fileOver!: boolean;

  // Dragover listener
  @Output() fileDropped:EventEmitter<any> = new EventEmitter();
  @HostListener('dragover', ['$event']) onDragOver(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
  }

  // Dragleave listener
  @HostListener('dragleave', ['$event'])  public onDragLeave(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
  }

  // Drop listener
  @HostListener('drop', ['$event']) public onDrop(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = false;
    const files = evt.dataTransfer.files;
    if(files.length > 0) {
      this.fileDropped.emit(files);
    }
  }



  constructor() { }

}
