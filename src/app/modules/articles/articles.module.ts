import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlesListComponent } from './articles-list/articles-list.component';
import { ArticleComponent } from './article/article.component';
import { AddArticleComponent } from './add-article/add-article.component';
import { UpdateArticleComponent } from './update-article/update-article.component';
import { DeleteArticleComponent } from './delete-article/delete-article.component';
import { ArticlesRoutingModule } from './articles-routing.module';



@NgModule({
  declarations: [
    ArticlesListComponent,
    ArticleComponent,
    AddArticleComponent,
    UpdateArticleComponent,
    DeleteArticleComponent
  ],
  imports: [
    CommonModule,
    ArticlesRoutingModule
    
  ]
})
export class ArticlesModule { }
