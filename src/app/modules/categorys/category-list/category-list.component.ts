import { Component, Input, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';

import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Category } from '../../../interfaces/category.interface';
import { CategoryService } from '../category-Services/category.service';
import { token } from '../../../interfaces/token.inteface';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {


  articles: Category[] = [];
  error:boolean = true;



  displayedColumns = ['id', 'name','button','button2'];
  dataSource!: MatTableDataSource<Category>;

  @Input()
  filterValue : string = "";
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  token !:token;
  admin : string = "";

  constructor(private CategoryService: CategoryService) {

   }



  ngOnInit(): void {
    this.articleList();
    this.token = jwtDecode(localStorage.getItem('token')!)
    if(this.token){
        this.admin = this.token.role;
    }
    if(this.admin != 'ADMIN'){
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
              this.articleList()
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
