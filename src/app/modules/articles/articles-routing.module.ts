import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddArticleComponent } from './add-article/add-article.component';
import { ArticleComponent } from './article/article.component';
import { DeleteArticleComponent } from './delete-article/delete-article.component';
import { UpdateCategoryComponent } from '../categorys/update-category/update-category.component';
import { ArticlesListComponent } from './articles-list/articles-list.component';


const routes: Routes = [

    {
        path:'add',
        component: AddArticleComponent
    },
    {
        path:'list',
        component: ArticlesListComponent
    },
    {
        path:'',
        component: ArticlesListComponent
    },
    {
        path:':id',
        component: ArticleComponent
    },
    {
        path:'delete/:id',
        component: DeleteArticleComponent
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
export class ArticlesRoutingModule { }
