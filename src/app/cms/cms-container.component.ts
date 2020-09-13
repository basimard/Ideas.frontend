import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cms-container',
  templateUrl:'./cms-container.component.html',
  styleUrls: ['./cms-container.component.css']
})
export class CmsContainerComponent implements OnInit {
 
  pageTitle = null
  pageContent = null
  editMode=true
  newMode=true
  constructor() { }

  ngOnInit(): void {
  }
  

}
