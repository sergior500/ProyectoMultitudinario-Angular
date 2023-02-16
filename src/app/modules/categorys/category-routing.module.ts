import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './add-category/add-category.component';
import { CategoryComponent } from './category/category.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { DeleteCategoryComponent } from './delete-category/delete-category.component';
import { UpdateArticleComponent } from '../articles/update-article/update-article.component';


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
        path:'delete/:id',
        component: DeleteCategoryComponent
    },
    {
        path:'update/:id',
        component: UpdateArticleComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
