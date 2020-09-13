import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'cms-view-presentation',
  templateUrl: './cms-view-presentation.component.html',
  styleUrls: ['./cms-view-presentation.component.css']
})
export class CmsViewPresentationComponent implements OnInit {
  @Input()pageTitle
  @Input()pageContent
  constructor() { }

  ngOnInit(): void {
  }

}
