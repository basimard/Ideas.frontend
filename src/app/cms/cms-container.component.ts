import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CmsContentDto, CmsServiceProxy } from '@shared/service-proxies/service-proxies';
import { take } from 'lodash';
import { iif, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-cms-container',
  templateUrl: './cms-container.component.html',
  styleUrls: ['./cms-container.component.css'],
})

export class CmsContainerComponent implements OnInit {

  id: any
  editMode = false
  cmsContentDto = new CmsContentDto({ id: 0, pageTitle: null, pageContent: null })
  constructor(public _cmsService: CmsServiceProxy, private route: ActivatedRoute, private router: Router) {
    this.cmsContentDto.init({ id: 0, pageTitle: null, pageContent: null })
  }
  ngOnInit(): void {


    this.route.paramMap.pipe(switchMap((params) => {
      this.id = params.get('id')
      return iif(() => params.get('id') != undefined,
        this._cmsService.getCmsContent(parseInt(params.get('id')))
        , of(this.cmsContentDto));
    })).subscribe((params) => {
      this.cmsContentDto.init(params)
      if (this.cmsContentDto.id === 0) {
        this.editMode = true
      }
      else {
        this.editMode = false
      }
    })



  }
  savePost(postData) {

    this._cmsService.insertOrUpdate(postData).subscribe((data) => {

      if (this.id === null) {
        this.router.navigate(['/app/pages', data.id])
      }
      else {

        this.editMode = false;
      }

    })
  }

}

