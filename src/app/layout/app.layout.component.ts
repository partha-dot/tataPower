import { AfterViewInit, Component, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { LayoutService } from "./service/app.layout.service";
import { AppSidebarComponent } from "./app.sidebar.component";
import { AppTopBarComponent } from './app.topbar.component';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-layout',
    templateUrl: './app.layout.component.html'
})
export class AppLayoutComponent implements OnDestroy , OnInit{

    show_weather:boolean;
    show_dg:boolean;
    show_ups:boolean;

    hideTopMenu:boolean=true;

    items: MenuItem[] | undefined;

    activeItem: MenuItem | undefined;

    overlayMenuOpenSubscription: Subscription;

    menuOutsideClickListener: any;

    profileMenuOutsideClickListener: any;

    @ViewChild(AppSidebarComponent) appSidebar!: AppSidebarComponent;

    @ViewChild(AppTopBarComponent) appTopbar!: AppTopBarComponent;

    constructor(public layoutService: LayoutService, public renderer: Renderer2, public router: Router) {
        this.overlayMenuOpenSubscription = this.layoutService.overlayOpen$.subscribe(() => {
            if (!this.menuOutsideClickListener) {
                this.menuOutsideClickListener = this.renderer.listen('document', 'click', event => {
                    const isOutsideClicked = !(this.appSidebar.el.nativeElement.isSameNode(event.target) || this.appSidebar.el.nativeElement.contains(event.target)
                        || this.appTopbar.menuButton.nativeElement.isSameNode(event.target) || this.appTopbar.menuButton.nativeElement.contains(event.target));

                    if (isOutsideClicked) {
                        this.hideMenu();
                    }
                });
            }

            if (!this.profileMenuOutsideClickListener) {
                this.profileMenuOutsideClickListener = this.renderer.listen('document', 'click', event => {
                    const isOutsideClicked = !(this.appTopbar.menu.nativeElement.isSameNode(event.target) || this.appTopbar.menu.nativeElement.contains(event.target)
                        || this.appTopbar.topbarMenuButton.nativeElement.isSameNode(event.target) || this.appTopbar.topbarMenuButton.nativeElement.contains(event.target));

                    if (isOutsideClicked) {
                        this.hideProfileMenu();
                    }
                });
            }

            if (this.layoutService.state.staticMenuMobileActive) {
                this.blockBodyScroll();
            }
        });

        this.router.events.pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(() => {
                this.hideMenu();
                this.hideProfileMenu();
            });
                            router.events.subscribe((val) => {
                            console.log(val instanceof NavigationEnd)
                            if (this.router.url.includes('/app/outlet/device_m') || this.router.url.includes('/app/outlet/device_s')||
                             this.router.url.includes('/app/outlet/org') || this.router.url.includes('/app/outlet/usr')||this.router.url.includes('/app/outlet/io')||
                             this.router.url.includes('/app/outlet/profile')) {
                                this.hideTopMenu=true;
                              }
                              else{
                                this.hideTopMenu=false;
                              }

                            if (this.router.url.includes('/app/outlet/weather')||
                            this.router.url.includes('/app/outlet/weather_devInfo')||
                            this.router.url.includes('/app/outlet/weather_chart')||
                            this.router.url.includes('/app/outlet/dlyRep') ||
                            this.router.url.includes('/app/outlet/yearRep') ||
                            this.router.url.includes('/app/outlet/monthRep') ||
                            this.router.url.includes('/app/outlet/report')) {
                                this.show_weather=true;
                                this.show_dg=false;
                                this.show_ups=false;
                                this.items = [
                                    { label: 'Live', icon: 'pi pi-spin pi-fw pi-sync',routerLink: ['/app/outlet/weather'] , visible:this.show_weather},
                                    // { label: 'Live', icon: 'pi pi-spin pi-fw pi-sync',routerLink: ['/app/outlet/DG'] , visible:this.show_dg },
                                    // { label: 'Live', icon: 'pi pi-spin pi-fw pi-sync',routerLink: ['/app/outlet/UPS'] , visible:this.show_ups },
                                    { label: 'device Info', icon: 'pi pi-fw pi-info-circle',routerLink: ['/app/outlet/weather_devInfo'] ,visible:this.show_weather },
                                    // { label: 'device Info', icon: 'pi pi-fw pi-info-circle',routerLink: ['/app/outlet/DG'] ,visible:this.show_dg },
                                    // { label: 'device Info', icon: 'pi pi-fw pi-info-circle',routerLink: ['/app/outlet/UPS'] ,visible:this.show_ups },
                                    { label: 'Graphical View', icon: 'pi pi-fw pi-chart-pie',routerLink: ['/app/outlet/weather_chart'], visible:this.show_weather },
                                    // { label: 'Graphical View', icon: 'pi pi-fw pi-chart-pie',routerLink: ['/app/outlet/DG'], visible:this.show_dg },
                                    // { label: 'Graphical View', icon: 'pi pi-fw pi-chart-pie',routerLink: ['/app/outlet/UPS'], visible:this.show_ups },
                                    // { label: 'Create Alert', icon: 'pi pi-fw pi-bell',routerLink: ['/app/outlet/alert'] , visible:true },
                                    { label: 'Historic Data', icon: 'pi pi-fw pi-book',routerLink: ['/app/outlet/report'],visible:true  },
                                    // { label: 'Scheduling', icon: 'pi pi-fw pi-calendar',routerLink: ['/app/outlet/schedul'] ,visible:true },
                                    // { label: 'Report Analysis', icon: 'pi pi-fw pi-chart-line',routerLink: ['/app/outlet/weather_billing'] ,visible:true }
                                ];
                             }
                            // else if (this.router.url.includes('/app/outlet/DG') || this.router.url.includes('/app/outlet/alert') || this.router.url.includes('/app/outlet/schedul') || this.router.url.includes('/app/outlet/report')) {
                            //     this.show_dg=true;
                            //     this.show_ups=false;
                            //     this.show_weather=false;
                            //     this.items = [
                            //         { label: 'Live', icon: 'pi pi-spin pi-fw pi-sync',routerLink: ['/app/outlet/weather'] , visible:this.show_weather},
                            //         { label: 'Live', icon: 'pi pi-spin pi-fw pi-sync',routerLink: ['/app/outlet/DG'] , visible:this.show_dg },
                            //         { label: 'Live', icon: 'pi pi-spin pi-fw pi-sync',routerLink: ['/app/outlet/UPS'] , visible:this.show_ups },
                            //         { label: 'device Info', icon: 'pi pi-fw pi-info-circle',routerLink: ['/app/outlet/weather_devInfo'] ,visible:this.show_weather },
                            //         { label: 'device Info', icon: 'pi pi-fw pi-info-circle',routerLink: ['/app/outlet/DG'] ,visible:this.show_dg },
                            //         { label: 'device Info', icon: 'pi pi-fw pi-info-circle',routerLink: ['/app/outlet/UPS'] ,visible:this.show_ups },
                            //         { label: 'Graphical View', icon: 'pi pi-fw pi-chart-line',routerLink: ['/app/outlet/weather_chart'], visible:this.show_weather },
                            //         { label: 'Graphical View', icon: 'pi pi-fw pi-chart-line',routerLink: ['/app/outlet/DG'], visible:this.show_dg },
                            //         { label: 'Graphical View', icon: 'pi pi-fw pi-chart-line',routerLink: ['/app/outlet/UPS'], visible:this.show_ups },
                            //         { label: 'Create Alert', icon: 'pi pi-fw pi-bell',routerLink: ['/app/outlet/alert'] , visible:false },
                            //         { label: 'Historic Data', icon: 'pi pi-fw pi-book',routerLink: ['/app/outlet/report'],visible:false  },
                            //         { label: 'Scheduling', icon: 'pi pi-fw pi-calendar',routerLink: ['/app/outlet/schedul'] ,visible:false }
                            //     ];
                            //   }
                            // else if (this.router.url.includes('/app/outlet/UPS') || this.router.url.includes('/app/outlet/alert') || this.router.url.includes('/app/outlet/schedul') || this.router.url.includes('/app/outlet/report')) {
                            //     this.show_ups=true;
                            //     this.show_weather=false;
                            //     this.show_dg=false;
                            //     this.items = [
                            //         { label: 'Live', icon: 'pi pi-spin pi-fw pi-sync',routerLink: ['/app/outlet/weather'] , visible:this.show_weather},
                            //         { label: 'Live', icon: 'pi pi-spin pi-fw pi-sync',routerLink: ['/app/outlet/DG'] , visible:this.show_dg },
                            //         { label: 'Live', icon: 'pi pi-spin pi-fw pi-sync',routerLink: ['/app/outlet/UPS'] , visible:this.show_ups },
                            //         { label: 'device Info', icon: 'pi pi-fw pi-info-circle',routerLink: ['/app/outlet/weather_devInfo'] ,visible:this.show_weather },
                            //         { label: 'device Info', icon: 'pi pi-fw pi-info-circle',routerLink: ['/app/outlet/DG'] ,visible:this.show_dg },
                            //         { label: 'device Info', icon: 'pi pi-fw pi-info-circle',routerLink: ['/app/outlet/UPS'] ,visible:this.show_ups },
                            //         { label: 'Graphical View', icon: 'pi pi-fw pi-chart-line',routerLink: ['/app/outlet/weather_chart'], visible:this.show_weather },
                            //         { label: 'Graphical View', icon: 'pi pi-fw pi-chart-line',routerLink: ['/app/outlet/DG'], visible:this.show_dg },
                            //         { label: 'Graphical View', icon: 'pi pi-fw pi-chart-line',routerLink: ['/app/outlet/UPS'], visible:this.show_ups },
                            //         { label: 'Create Alert', icon: 'pi pi-fw pi-bell',routerLink: ['/app/outlet/alert'] , visible:false },
                            //         { label: 'Historic Data', icon: 'pi pi-fw pi-book',routerLink: ['/app/outlet/report'],visible:false  },
                            //         { label: 'Scheduling', icon: 'pi pi-fw pi-calendar',routerLink: ['/app/outlet/schedul'] ,visible:false }
                            //     ];
                            //   }
                            //   else{
                            //     this.show_ups=false;
                            //     this.show_dg=false;
                            //     this.show_weather=false;
                            //     this.items = [
                            //         { label: 'Live', icon: 'pi pi-spin pi-fw pi-sync',routerLink: ['/app/outlet/weather'] , visible:this.show_weather},
                            //         { label: 'Live', icon: 'pi pi-spin pi-fw pi-sync',routerLink: ['/app/outlet/DG'] , visible:this.show_dg },
                            //         { label: 'Live', icon: 'pi pi-spin pi-fw pi-sync',routerLink: ['/app/outlet/UPS'] , visible:this.show_ups },
                            //         { label: 'device Info', icon: 'pi pi-fw pi-info-circle',routerLink: ['/app/outlet/weather_devInfo'] ,visible:this.show_weather },
                            //         { label: 'device Info', icon: 'pi pi-fw pi-info-circle',routerLink: ['/app/outlet/DG'] ,visible:this.show_dg },
                            //         { label: 'device Info', icon: 'pi pi-fw pi-info-circle',routerLink: ['/app/outlet/UPS'] ,visible:this.show_ups },
                            //         { label: 'Graphical View', icon: 'pi pi-fw pi-chart-line',routerLink: ['/app/outlet/weather_chart'], visible:this.show_weather },
                            //         { label: 'Graphical View', icon: 'pi pi-fw pi-chart-line',routerLink: ['/app/outlet/DG'], visible:this.show_dg },
                            //         { label: 'Graphical View', icon: 'pi pi-fw pi-chart-line',routerLink: ['/app/outlet/UPS'], visible:this.show_ups },
                            //         { label: 'Create Alert', icon: 'pi pi-fw pi-bell',routerLink: ['/app/outlet/alert'] , visible:true },
                            //         { label: 'Historic Data', icon: 'pi pi-fw pi-book',routerLink: ['/app/outlet/report'],visible:true  },
                            //         { label: 'Scheduling', icon: 'pi pi-fw pi-calendar',routerLink: ['/app/outlet/schedul'] ,visible:true }
                            //     ];
                            //   }
                        });

    }
    ngOnInit(): void {


    }

    hideMenu() {
        this.layoutService.state.overlayMenuActive = false;
        this.layoutService.state.staticMenuMobileActive = false;
        this.layoutService.state.menuHoverActive = false;
        if (this.menuOutsideClickListener) {
            this.menuOutsideClickListener();
            this.menuOutsideClickListener = null;
        }
        this.unblockBodyScroll();
    }

    hideProfileMenu() {
        this.layoutService.state.profileSidebarVisible = false;
        if (this.profileMenuOutsideClickListener) {
            this.profileMenuOutsideClickListener();
            this.profileMenuOutsideClickListener = null;
        }
    }

    blockBodyScroll(): void {
        if (document.body.classList) {
            document.body.classList.add('blocked-scroll');
        }
        else {
            document.body.className += ' blocked-scroll';
        }
    }

    unblockBodyScroll(): void {
        if (document.body.classList) {
            document.body.classList.remove('blocked-scroll');
        }
        else {
            document.body.className = document.body.className.replace(new RegExp('(^|\\b)' +
                'blocked-scroll'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    }

    get containerClass() {
        return {
            'layout-theme-light': this.layoutService.config.colorScheme === 'dark',
            'layout-theme-dark': this.layoutService.config.colorScheme === 'dark',
            'layout-overlay': this.layoutService.config.menuMode === 'overlay',
            'layout-static': this.layoutService.config.menuMode === 'static',
            'layout-static-inactive': this.layoutService.state.staticMenuDesktopInactive && this.layoutService.config.menuMode === 'static',
            'layout-overlay-active': this.layoutService.state.overlayMenuActive,
            'layout-mobile-active': this.layoutService.state.staticMenuMobileActive,
            'p-input-filled': this.layoutService.config.inputStyle === 'filled',
            'p-ripple-disabled': !this.layoutService.config.ripple
        }
    }

    ngOnDestroy() {
        if (this.overlayMenuOpenSubscription) {
            this.overlayMenuOpenSubscription.unsubscribe();
        }

        if (this.menuOutsideClickListener) {
            this.menuOutsideClickListener();
        }
    }
}
