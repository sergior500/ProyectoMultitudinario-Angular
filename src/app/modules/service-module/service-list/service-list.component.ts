import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Service } from 'src/app/interfaces/service.interface';
import { Observable } from 'rxjs';

import jwtDecode from 'jwt-decode';
import Swal from 'sweetalert2';
import { token } from 'src/app/interfaces/token.inteface';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css']
})
export class ServiceListComponent implements OnInit {

  articles:Service[] = [];
  error:boolean = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  obs!: Observable<any>;
  dataSource!: MatTableDataSource<Service>;

  constructor(private serviceService: ServiceService, private changeDetectorRef: ChangeDetectorRef) { }

  token !:token;
  user : string = "";
  admin : string = "";
  // product : productos = {
  //   id: 0,
  //   quantity : 0
  // };

  ngOnInit(): void {
    this.articleList();

    this.token = jwtDecode(localStorage.getItem('token')!)
    if(this.token){
      this.user = this.token.sub;
      this.admin = this.token.role;
    }
    
  }

  ngOnDestroy() {
    if (this.dataSource) { 
      this.dataSource.disconnect(); 
    }
  }
  

  addToCart(id:number ){
    // this.product.id = id;
    // console.log(this.product)

    // this.cartservice.addToCart(this.product);

    Swal.fire(
      'Good job!',
      'Your item has been added!',
      'success'
    )

  }

  articleList(){
    this.serviceService.serviceList()
      .subscribe({
        next: (resp) => {
          this.dataSource = new MatTableDataSource<Service>(resp)
          this.changeDetectorRef.detectChanges();

          this.dataSource.paginator = this.paginator;
          this.obs = this.dataSource.connect();
          this.error = false;
         
          
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
        this.serviceService.deleteService(id)
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

  contratar(id:number){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You will buy a subscription and you will not be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, subscribe!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.serviceService.contratarService(id,this.user)
          .subscribe({
            next:(res) => {
            }
          })
          swalWithBootstrapButtons.fire(
            'Subscribed!',
            'You have subscribed correctly.',
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

