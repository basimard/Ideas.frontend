import { AfterViewInit, ChangeDetectorRef, Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import {
  Router,
  RouterEvent,
  NavigationEnd,
  PRIMARY_OUTLET
} from '@angular/router';
import { BehaviorSubject, Subject} from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { MenuItem } from '@shared/layout/menu-item';
import {CmsServiceProxy } from '@shared/service-proxies/service-proxies';
import { PermissionCheckerService } from 'abp-ng2-module';
import { DataShareService } from '@shared/data-service/data-share-service';

@Component({
  selector: 'sidebar-menu',
  templateUrl: './sidebar-menu.component.html'
})
export class SidebarMenuComponent extends AppComponentBase implements OnInit, OnDestroy, AfterViewInit {
  notifier = new Subject();
  menuItems: MenuItem[];
  pageSubMenuItems: MenuItem[];
  menuItemsMap: { [key: number]: MenuItem } = {};
  activatedMenuItems: MenuItem[] = [];
  routerEvents: BehaviorSubject<RouterEvent> = new BehaviorSubject(undefined);
  homeRoute = '/app/home';

  constructor(injector: Injector, private router: Router,
    private _cmsService: CmsServiceProxy,
    private ref: ChangeDetectorRef,
    private _permissionChecker: PermissionCheckerService,
    private _dataShareService: DataShareService) {
    super(injector);
    this.router.events.subscribe(this.routerEvents);
  }
  ngAfterViewInit(): void {
    this._dataShareService.currentMessage.pipe(takeUntil(this.notifier)).subscribe((event) => {
      console.log(event)
      if (event === 'DATA_UPDATED_FOR_PAGES') {
        this.menuItems = this.getMenuItems()
        this.setPageMenuItems();

      }
    })

  }


  ngOnInit(): void {
    this.menuItems = this.getMenuItems();
    this.setPageMenuItems();

  }
  ngOnDestroy(): void {
    this.notifier.next()
    this.notifier.complete()
  }
  getMenuItems(): MenuItem[] {
    return [
      new MenuItem(this.l('HomePage'), '/app/home', 'fas fa-home'),
      new MenuItem(
        this.l('Tenants'),
        '/app/tenants',
        'fas fa-building',
        'Pages.Tenants'
      ),
      new MenuItem(
        this.l('Users'),
        '/app/users',
        'fas fa-users',
        'Pages.Users'
      ),
      new MenuItem(
        this.l('Roles'),
        '/app/roles',
        'fas fa-theater-masks',
        'Pages.Roles'
      )

    ];
  }

  patchMenuItems(items: MenuItem[], parentId?: number): void {
    items.forEach((item: MenuItem, index: number) => {
      item.id = parentId ? Number(parentId + '' + (index + 1)) : index + 1;
      if (parentId) {
        item.parentId = parentId;
      }
      if (parentId || item.children) {
        this.menuItemsMap[item.id] = item;
      }
      if (item.children) {
        this.patchMenuItems(item.children, item.id);
      }
    });
  }

  activateMenuItems(url: string): void {
    this.deactivateMenuItems(this.menuItems);
    this.activatedMenuItems = [];
    const foundedItems = this.findMenuItemsByUrl(url, this.menuItems);
    foundedItems.forEach((item) => {
      this.activateMenuItem(item);
    });
  }

  deactivateMenuItems(items: MenuItem[]): void {
    items.forEach((item: MenuItem) => {
      item.isActive = false;
      item.isCollapsed = true;
      if (item.children) {
        this.deactivateMenuItems(item.children);
      }
    });
  }

  findMenuItemsByUrl(
    url: string,
    items: MenuItem[],
    foundedItems: MenuItem[] = []
  ): MenuItem[] {
    items.forEach((item: MenuItem) => {
      if (item.route === url) {
        foundedItems.push(item);
      } else if (item.children) {
        this.findMenuItemsByUrl(url, item.children, foundedItems);
      }
    });
    return foundedItems;
  }

  activateMenuItem(item: MenuItem): void {
    item.isActive = false;
    if (item.children) {
      item.isCollapsed = false;
    }
    this.activatedMenuItems.push(item);
    console.log("All item activated...", this.activateMenuItems)
    if (item.parentId) {
      this.activateMenuItem(this.menuItemsMap[item.parentId]);
    }
  }

  isMenuItemVisible(item: MenuItem): boolean {
    if (!item.permissionName) {
      return true;
    }
    return this.permission.isGranted(item.permissionName);
  }
  setPageMenuItems() {


    this._permissionChecker.isGranted('Pages.Cms') ? this.menuItems.push(new MenuItem(
      this.l('New Page'),
      '/app/pages',
      'fas fa-plus-square',
    )) : null
    this.pageSubMenuItems = []
    this._cmsService.getAllCmsContents().pipe(map((pages) => {
      pages.items.forEach((item) => {
        let menuTitle;
        (item.pageTitle.length>20)? menuTitle =item.pageTitle.slice(0,20)+'..':menuTitle = (item.pageTitle)
        this.pageSubMenuItems.push(new MenuItem(this.l(menuTitle), `/app/pages/${item.id}`, 'fas fa-file-alt'))
      })
      return this.pageSubMenuItems
    })).subscribe((items) => {
      this.menuItems.push(...items)
      this.patchMenuItems(this.menuItems);
      this.routerEvents
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe((event) => {
          const currentUrl = event.url !== '/' ? event.url : this.homeRoute;
          const primaryUrlSegmentGroup = this.router.parseUrl(currentUrl).root
            .children[PRIMARY_OUTLET];
          if (primaryUrlSegmentGroup) {
            this.activateMenuItems('/' + primaryUrlSegmentGroup.toString());

          }
        });
      this.ref.detectChanges()
    })
  }
}
