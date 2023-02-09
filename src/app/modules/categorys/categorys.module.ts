import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category/category.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { UpdateCategoryComponent } from './update-category/update-category.component';
import { DeleteCategoryComponent } from './delete-category/delete-category.component';
import { CategoryRoutingModule } from './category-routing.module';



@NgModule({
  declarations: [
    CategoryComponent,
    CategoryListComponent,
    AddCategoryComponent,
    UpdateCategoryComponent,
    DeleteCategoryComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule
  ]
})
export class CategorysModule { }
