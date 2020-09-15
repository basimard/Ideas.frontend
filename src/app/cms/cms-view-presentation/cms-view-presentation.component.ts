import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { CmsContentDto } from '@shared/service-proxies/service-proxies';
import { DomSanitizer } from '@angular/platform-browser'
@Component({
  selector: 'cms-view-presentation',
  templateUrl: './cms-view-presentation.component.html',
  styleUrls: ['./cms-view-presentation.component.css'],
})
export class CmsViewPresentationComponent implements OnInit {
 
  @Input()cmsContent:CmsContentDto 

  constructor() { }

  ngOnInit(): void {
    
  }

}
