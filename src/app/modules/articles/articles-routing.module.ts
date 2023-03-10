import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddArticleComponent } from './add-article/add-article.component';
import { ArticleComponent } from './article/article.component';
import { UpdateCategoryComponent } from '../categorys/update-category/update-category.component';
import { ArticlesListComponent } from './articles-list/articles-list.component';
import { UpdateArticleComponent } from './update-article/update-article.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';


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
        path:'cart',
        component: ShoppingCartComponent
    }
    ,
    {
        path:'',
        component: ArticlesListComponent
    },
    {
        path:':id',
        component: ArticleComponent
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
export class ArticlesRoutingModule { }
