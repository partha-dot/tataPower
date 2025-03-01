import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../../service/auth.guard';
import { Breadcrumb } from 'primeng/breadcrumb';


@NgModule({
    imports: [RouterModule.forChild([
        { path: 'DG', data: { breadcrumb: 'Button' }, loadChildren: () => import('./dg/buttondemo.module').then(m => m.ButtonDemoModule) },
        { path: 'weather', data: { breadcrumb: 'weather' }, loadChildren: () => import('./energy/chartsdemo.module').then(m => m.ChartsDemoModule) },
        {path:'weather_chart',data:{Breadcrumb: 'weather'},loadChildren:() => import ('./energy_chart/graphical-view/graphical-view.module').then(graph => graph.GraphicalViewModule)},
        // { path: 'weather_chart', data: { breadcrumb: 'weather' }, loadChildren: () => import('./energy_chart/chartsdemo1.module').then(m => m.ChartsDemo1Module) },
        { path: 'weather_devInfo', data: { breadcrumb: 'weather' }, loadChildren: () => import('./energy_devInfo/chartsdemo2.module').then(m => m.ChartsDemo2Module) },
        { path: 'weather_billing', data: { breadcrumb: 'File' }, loadChildren: () => import('./energy_billing_rep/filedemo.module').then(m => m.FileDemoModule)},
        { path: 'DlyRep', data: { breadcrumb: 'File' }, loadChildren: () => import('./weatherDayRep/filedemo2.module').then(m => m.FileDemo2Module)},
        { path: 'device_m', data: { breadcrumb: 'Float Label' }, loadChildren: () => import('./m_device_management/floatlabeldemo.module').then(m => m.FloatlabelDemoModule) },
        { path: 'schedul', data: { breadcrumb: 'Form Layout' }, loadChildren: () => import('./stockEntry/formlayoutdemo.module').then(m => m.FormLayoutDemoModule) },
        { path: 'device_s', data: { breadcrumb: 'Input' }, loadChildren: () => import('./m_user_management/inputdemo.module').then(m => m.InputDemoModule) },
        { path: 'profile', data: { breadcrumb: 'Invalid State' }, loadChildren: () => import('./profile/invalidstatedemo.module').then(m => m.InvalidStateDemoModule) },
        { path: 'io', data: { breadcrumb: 'Invalid State2' }, loadChildren: () => import('./io_Intrigation/invalidstatedemo2.module').then(m => m.InvalidStateDemo2Module) },
        { path: 'UPS', data: { breadcrumb: 'List' }, loadChildren: () => import('./ups/listdemo.module').then(m => m.ListDemoModule) },
        { path: 'AddDealer', data: { breadcrumb: 'Media' }, loadChildren: () => import('./AddDealer/mediademo.module').then(m => m.MediaDemoModule) },
        // { path: 'message', data: { breadcrumb: 'Message' }, loadChildren: () => import('./messages/messagesdemo.module').then(m => m.MessagesDemoModule) },
        { path: 'AddCustomer', data: { breadcrumb: 'Misc' }, loadChildren: () => import('./AddCustomer/miscdemo.module').then(m => m.MiscDemoModule) },
        { path: 'monthRep', data: { breadcrumb: 'Overlay' }, loadChildren: () => import('./weatherMonthRep/overlaysdemo.module').then(m => m.OverlaysDemoModule) },
        { path: 'yearRep', data: { breadcrumb: 'Panel' }, loadChildren: () => import('./weatherYearRep/panelsdemo.module').then(m => m.PanelsDemoModule) },
        { path: 'alert', data: { breadcrumb: 'Table' }, loadChildren: () => import('./alert/messagesdemo.module').then(m => m.MessagesDemoModule) },
        { path: 'report', data: { breadcrumb: 'Product' }, loadChildren: () => import('./historicData/product.module').then(m => m.ProductModule) },
        { path: 'usr', data: { breadcrumb: 'Model' }, loadChildren: () => import('./UserMaster/model.module').then(m => m.ModelModule) },
        { path: 'org', data: { breadcrumb: 'Tree' }, loadChildren: () => import('./OrganizationMaster/treedemo.module').then(m => m.TreeDemoModule) },
        { path: 'menu', data: { breadcrumb: 'Menu' }, loadChildren: () => import('./menus/menus.module').then(m => m.MenusModule) },
        { path: '**', redirectTo: '/notfound' },
        { path: '', redirectTo: '/company', pathMatch: 'full' },
    ])],
    exports: [RouterModule]
})
export class UIkitRoutingModule { }
