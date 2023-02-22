import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlesListComponent } from './articles-list/articles-list.component';
import { ArticleComponent } from './article/article.component';
import { AddArticleComponent } from './add-article/add-article.component';
import { UpdateArticleComponent } from './update-article/update-article.component';
import { DeleteArticleComponent } from './delete-article/delete-article.component';
import { ArticlesRoutingModule } from './articles-routing.module';
import {MatCardModule} from '@angular/material/card'; 
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxPaginationModule } from 'ngx-pagination';
import {MatTableModule} from '@angular/material/table'; 
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSortModule} from '@angular/material/sort'; 
import { FormsModule } from '@angular/forms';


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
    ArticlesRoutingModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    NgxPaginationModule,
    FormsModule
  ]
})
export class ArticlesModule { }
