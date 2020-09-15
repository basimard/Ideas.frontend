import { Injector, Pipe, PipeTransform } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({name: 'safeHtml'})

export class HtmlSanitizerPipe extends AppComponentBase implements PipeTransform {
  constructor(injector: Injector,private sanitizer:DomSanitizer){
    super(injector);
  }

  transform(style) {
    return this.sanitizer.bypassSecurityTrustHtml(style);
    
  }
}