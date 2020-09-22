import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {IEventModel} from '@shared/event-model'
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
  eventModel:IEventModel = { eventBody:null, eventType:null};
  constructor() { }

  ngOnInit(): void {

    this.cmsContent.id === 0 ? this.buttonTitle = "Post" : this.buttonTitle = "Update"
  }


  onFormSubmit() {
    this.eventModel.eventBody = this.cmsContent;
    this.eventModel.eventType = 'SUBMIT'
    this.postChange.emit(this.eventModel)
  }
}
