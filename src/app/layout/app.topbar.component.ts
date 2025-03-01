import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MegaMenuItem, MenuItem, MessageService } from 'primeng/api';

import { LayoutService } from "./service/app.layout.service";
import { Router } from '@angular/router';
import { AuthenticationService } from '../demo/service/authentication.service';
import { TieredMenu } from 'primeng/tieredmenu';


@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    providers: [ConfirmationService, MessageService]
})
export class AppTopBarComponent implements OnInit{
    @ViewChild('menu2') menu2: TieredMenu;
    // items!: MenuItem[];
    menuItems: MenuItem[] = [];
    topbarMenu:MenuItem[]| undefined
    user:any;
    visible: boolean = false;
    date: Date[] | undefined;
    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;
    ORG:any=localStorage.getItem('ORG_NAME');
    constructor(private confirmationService: ConfirmationService, private messageService: MessageService,public layoutService: LayoutService,private router: Router, private authService:AuthenticationService) { }

    ngOnInit(): void {
        this.topbarMenu = [
            {
                label: 'Options',
                items: [
                    {
                        label: 'Update',
                        icon: 'pi pi-refresh',
                        command: () => {
                            this.update();
                        }
                    },
                    {
                        label: 'Delete',
                        icon: 'pi pi-times',
                        command: () => {
                            this.delete();
                        }
                    }]}
        ];

        this.menuItems = [
            {
                label: 'Profile', icon: 'pi pi-fw pi-user',routerLink: ['/app/outlet/profile']
            },
            {
                label: 'I/O Intrigation', icon: 'pi pi-fw pi-sitemap',routerLink:['/app/outlet/io']
            },

            {
                separator: true
            },
            {
                label: 'Log Out', icon: 'pi pi-fw pi-sign-out', command: () => this.confirm1()
            },
        ];
        this.user=localStorage.getItem('user')
    }
    logOut(){

        // localStorage.clear();
        // this.router.navigate(['/']);
    }

    toggleMenu(event: Event) {
        debugger
        this.menu2.toggle(event);
      }
    showDialog() {
        this.visible = true;
    }
    update() {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Updated' });
    }

    delete() {
        this.messageService.add({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted' });
    }

    confirm1() {
        debugger
        // if(event.target.innerText=='Log Out'){
        //     this.confirmationService.confirm({
        //         target: event.target as EventTarget,
        //         message: 'Are you sure that you want to Logout?',
        //         header: 'Confirmation',
        //         icon: 'pi pi-exclamation-triangle text-green-600',

        //         acceptIcon:"none",
        //         rejectIcon:"none",
        //         rejectButtonStyleClass:"p-button-text",
        //         accept: () => {
        //             this.authService.logout();
        //         },
        //         reject: () => {
        //             this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected Logout', life: 3000 });
        //         }
        //     });
        // }
        // else{
            this.confirmationService.confirm({
                target: event.target as EventTarget,
                message: 'Are you sure that you want to Logout?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle text-green-600',

                acceptIcon:"none",
                rejectIcon:"none",
                rejectButtonStyleClass:"p-button-text",
                accept: () => {
                    this.authService.logout();
                },
                reject: () => {
                    this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected Logout', life: 3000 });
                }
            });
        // }

    }



}
