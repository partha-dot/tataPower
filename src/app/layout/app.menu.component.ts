import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {
    u_type:any
    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.u_type=localStorage.getItem("u_type");
        if(this.u_type=="U"){
            this.model=[
                {
                    label: 'Device',
                    items: [
                        { label: 'Overview',
                        icon: 'pi pi-th-large',
                        items: [
                                {
                                    label: 'Weather',
                                    icon: 'pi pi-bolt',
                                    routerLink: ['/app/outlet/weather']
                                },
                                // {
                                //     label: 'UPS',
                                //     icon: 'pi pi-server',
                                //     routerLink: ['/app/outlet/UPS']
                                // },
                                // {
                                //     label: 'DG',
                                //     icon: 'pi pi-exclamation-triangle',
                                //     routerLink: ['/app/outlet/DG']
                                // }
                            ]
                        },

                    ]
                },{
                    label: 'Reports',
                    items: [
                            {
                                label: 'Daily',
                                icon: 'pi pi-clock',
                                routerLink: ['/app/outlet/DlyRep']
                            },
                            {
                                label: 'Monthly',
                                icon: 'pi pi-calendar',
                                routerLink: ['/app/outlet/monthRep']
                            },
                            {
                                label: 'Yearly',
                                icon: 'pi pi-calendar-minus',
                                routerLink: ['/app/outlet/yearRep']
                            },]
                }
            ]
        }
        else{
            this.model = [
                {
                    label: 'Master',
                    items: [
                       {
                            label: 'Master',
                            icon: 'pi pi-user',
                            items: [
                                {
                                    label: 'Add Organization',
                                    icon: 'pi pi-building',
                                    routerLink: ['/app/outlet/org']
                                },
                                {
                                    label: 'Add User',
                                    icon: 'pi pi-users',
                                    routerLink: ['/app/outlet/usr']
                                },

                                // {
                                //     label: 'Model',
                                //     icon: 'pi pi-box',
                                //     routerLink: ['/app/outlet/model']
                                // },
                                // { label: 'Barcode Generate',
                                // icon: 'pi pi-qrcode',
                                // routerLink: ['/app/outlet/barcode'] },
                            ]
                        }
                    ]
                },

                {
                    label: 'Device',
                    items: [
                        // { label: 'Overview',
                        // icon: 'pi pi-th-large',
                        // items: [
                                {
                                    label: 'Weather',
                                    icon: 'pi pi-cloud',
                                    routerLink: ['/app/outlet/weather']
                                },
                                // {
                                //     label: 'UPS',
                                //     icon: 'pi pi-server',
                                //     routerLink: ['/app/outlet/UPS']
                                // },
                                // {
                                //     label: 'DG',
                                //     icon: 'pi pi-exclamation-triangle',
                                //     routerLink: ['/app/outlet/DG']
                                // }
                            // ]
                        // },

                    ]
                },
                {
                    label: 'Management',
                    items: [
                        { label: 'Device Management', icon: 'pi pi-sitemap', routerLink: ['/app/outlet/device_m'], permission:'N' },
                        { label: 'User Management', icon: 'pi pi-users', routerLink: ['/app/outlet/device_s'] , permission:'N'},
                        // {
                        // label:'Settings',
                        // icon: 'pi pi-spin pi-cog',
                        // items: [
                        //     {
                        //         label: 'Organization Settings',
                        //         icon: 'pi pi-building',
                        //         routerLink: ['/app/outlet/org_setting']
                        //     },
                        //     {
                        //         label: 'Screen Settings',
                        //         icon: 'pi pi-desktop',
                        //         routerLink: ['/app/outlet/screen_Setting']
                        //     },]
                        // }
                    ]
                },{
                    label: 'Reports',
                    items:[
                        {
                            label: 'Daily',
                            icon: 'pi pi-clock',
                            routerLink: ['/app/outlet/DlyRep']
                        },
                        {
                            label: 'Monthly',
                            icon: 'pi pi-calendar',
                            routerLink: ['/app/outlet/monthRep']
                        },
                        {
                            label: 'Yearly',
                            icon: 'pi pi-calendar-minus',
                            routerLink: ['/app/outlet/yearRep']
                        },]
                }
            ]
            }



    }
}
