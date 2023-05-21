import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddServiceComponent } from './add-service/add-service.component';
import { ServiceListComponent } from './service-list/service-list.component';
import { UpdateServiceComponent } from './update-service/update-service.component';
import { ServiceComponent } from './service/service.component';


const routes: Routes = [

    {
        path:'add',
        component: AddServiceComponent
    },
    {
        path:'list',
        component: ServiceListComponent
    },
    {
        path:'',
        component: ServiceListComponent
    },
    {
        path:':id',
        component: ServiceComponent
    },
    {
        path:'update/:id',
        component: UpdateServiceComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicesRoutingModule { }
