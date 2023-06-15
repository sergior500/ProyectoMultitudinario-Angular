import { Component, Input, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';

import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Category } from '../../../interfaces/category.interface';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/interfaces/user.interface';
import { Content } from 'src/app/interfaces/users.inteface';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  articles: Content[] = [];
  error:boolean = true;



  displayedColumns = ['username', 'name','email','role','button','button2'];
  dataSource!: MatTableDataSource<Content>;

  @Input()
  filterValue : string = "";
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private userService: UsersService) {

   }



  ngOnInit(): void {
    this.articleList();

    
  }


  applyFilter() {
    this.filterValue = this.filterValue.trimStart();
    this.filterValue = this.filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = this.filterValue;
  }

  
  articleList(){

    this.userService.userList()
      .subscribe({
        next:(resp)=>{
          this.dataSource = new MatTableDataSource(resp.content);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          
        }
    })
  }

    delete(id:string){
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
          this.userService.deleteUser(id)
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
