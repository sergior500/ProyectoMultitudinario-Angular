import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlesListComponent } from './articles-list/articles-list.component';
import { ArticleComponent } from './article/article.component';
import { AddArticleComponent } from './add-article/add-article.component';
import { UpdateArticleComponent } from './update-article/update-article.component';
import { ArticlesRoutingModule } from './articles-routing.module';
import {MatCardModule} from '@angular/material/card'; 
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxPaginationModule } from 'ngx-pagination';
import {MatTableModule} from '@angular/material/table'; 
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSortModule} from '@angular/material/sort'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ArticlesListComponent,
    ArticleComponent,
    AddArticleComponent,
    UpdateArticleComponent
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
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ArticlesModule { }
