import { Component, Input, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';

import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Category } from '../../../interfaces/category.interface';
import { CategoryService } from '../category-Services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {


  articles: Category[] = [];
  error:boolean = true;

  cossas:boolean = true;


  displayedColumns = ['id', 'name','button'];
  dataSource!: MatTableDataSource<Category>;

  @Input()
  filterValue : string = "";
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private CategoryService: CategoryService) {

   }



  ngOnInit(): void {
    this.articleList();
    
    if(!this.cossas){
      this.displayedColumns = ['id', 'name']
    }

    
  }


  applyFilter() {
    this.filterValue = this.filterValue.trimStart();
    this.filterValue = this.filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = this.filterValue;
  }

  
  articleList(){

    this.CategoryService.categoryList()
      .subscribe({
        next:(resp)=>{
          this.dataSource = new MatTableDataSource(resp.content);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          console.log(this.dataSource)
        }
    })
  }

    delete(id:number){
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          this.CategoryService.deleteCategory(id)
            .subscribe({
              next:(res) => {
              }
            })
            swalWithBootstrapButtons.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            ).then(() => {
              window.location.reload()
            })
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your file is safe :)',
            'error'
          )
        }
      })
    }

}
