import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { CmsContentDto } from '@shared/service-proxies/service-proxies';
@Component({
  selector: 'cms-edit-presentation',
  templateUrl: './cms-edit-presentation.component.html',
  styleUrls: ['./cms-edit-presentation.component.css']
})
export class CmsEditPresentationComponent implements OnInit {
  @Input() cmsContent: CmsContentDto
  @Output() postChange = new EventEmitter();
  buttonTitle: string
  constructor() { }

  ngOnInit(): void {

    this.cmsContent.id === 0 ? this.buttonTitle = "Post" : this.buttonTitle = "Update"
  }




  onFormSubmit() {

    this.postChange.emit(this.cmsContent)
  }
}
