import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './add-category/add-category.component';
import { CategoryComponent } from './category/category.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { UpdateArticleComponent } from '../articles/update-article/update-article.component';
import { UpdateCategoryComponent } from './update-category/update-category.component';


const routes: Routes = [

    {
        path:'add',
        component: AddCategoryComponent
    },
    {
        path:'list',
        component: CategoryListComponent
    },
    {
        path:'',
        component: CategoryListComponent
    },    
    {
        path:':id',
        component: CategoryComponent
    },
    {
        path:'update/:id',
        component: UpdateCategoryComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
