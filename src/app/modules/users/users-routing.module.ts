import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/auth-guard.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { UsersAddComponent } from './users-add/users-add.component';
import { UsersComponent } from './users/users.component';
import { VerifyComponent } from './verify/verify.component';

const routes: Routes = [

    {
        path:'login',
        component: LoginComponent
    },
    {
        path:'register',
        component: RegisterComponent
    },
    {
        path:'userList',
        component: UserListComponent
    },
    {
        path:'add',
        component:UsersAddComponent
    },
    {
        path:'update/:id',
        component: UserUpdateComponent
    }
    ,
    {
        path:'verify',
        component: VerifyComponent
    }
    ,
    {
        path:'',
        component: UsersComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
