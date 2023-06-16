import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UsersComponent } from './users/users.component';
import { UsersAddComponent } from './users-add/users-add.component';
import { UsersRoutingModule } from './users-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserListComponent } from './user-list/user-list.component';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { NgxPaginationModule } from 'ngx-pagination';
import { UserUpdateComponent } from './user-update/user-update.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { VerifyComponent } from './verify/verify.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    UsersComponent,
    UsersAddComponent,
    UserListComponent,
    UserUpdateComponent,
    VerifyComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    MatProgressBarModule

  ]
})
export class UsersModule { }
