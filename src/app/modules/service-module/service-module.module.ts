import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddServiceComponent } from './add-service/add-service.component';
import { ServiceListComponent } from './service-list/service-list.component';
import { UpdateServiceComponent } from './update-service/update-service.component';
import { ServiceComponent } from './service/service.component';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServicesRoutingModule } from './service-module-routing.module';



@NgModule({
  declarations: [
    AddServiceComponent,
    ServiceListComponent,
    UpdateServiceComponent,
    ServiceComponent
  ],
  imports: [
    CommonModule,
    ServicesRoutingModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ServiceModuleModule { }
