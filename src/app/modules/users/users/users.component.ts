import { Component, Input, OnInit, ViewChild } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';
import { token } from '../../../interfaces/token.inteface';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ServicePurchased } from 'src/app/interfaces/service_purchased.interface';
import { ServiceService } from 'src/app/services/service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  debajo: boolean = false;
  saludable:boolean = false;
  sobrepeso:boolean = false;
  obesidad1:boolean = false;
  obesidad2:boolean = false;
  obesidad3:boolean = false;
  porcent:number = 0;
  consejo:string = "";
  
  displayedColumns = ['service','start_date','end_date','active','button'];
  dataSource!: MatTableDataSource<ServicePurchased>;

  @Input()
  filterValue : string = "";
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: UsersService, private service: ServiceService) { }
  token !:token;
  user !:User;

  
  ngOnInit(): void {
    this.token = jwtDecode(localStorage.getItem('token')!)
    
    this.userService.user(this.token.sub)
      .subscribe({
        next:(resp) => {
          this.user = resp;
          
          this.getPorcent(this.user.imc);
          this.checkImc();
          this.getConsejo(this.redondeo(this.user.imc));

          this.articleList()
          
        }
      })
      
  }

  getPorcent(imc:number){
    this.porcent = (imc/40) * 100;
    
  }

  redondeo(numero:number){
    const factor = Math.pow(10, 2);
    const numeroRedondeado = Math.round(numero * factor) / factor;
    return numeroRedondeado;
  }

  getConsejo(imc:number){
    this.userService.getConsejo(imc)
        .subscribe({
          next:(resp) => {
            this.consejo = resp.texto;
          }
        })
  }

  checkImc(){
    if(this.user.imc < 18){
      this.debajo = true;
    }else if(this.user.imc >= 18.5 && this.user.imc < 24.9){
      this.saludable = true;
    }else if(this.user.imc >= 24.9 && this.user.imc <29.9){
      this.sobrepeso = true;
    }else if(this.user.imc >= 29.9 && this.user.imc <34.9){
      this.obesidad1 = true;
    }else if(this.user.imc >= 34.9 && this.user.imc <=40){
      this.obesidad2 = true;
    }else if(this.user.imc > 40){
      this.obesidad3 = true;
  
  }
}

applyFilter() {
  this.filterValue = this.filterValue.trimStart();
  this.filterValue = this.filterValue.toLowerCase(); // Datasource defaults to lowercase matches
  this.dataSource.filter = this.filterValue;
}

articleList(){

  this.service.getServicePurchasedByUser(this.user.username)
    .subscribe({
      next:(resp)=>{
        
        this.dataSource = new MatTableDataSource(resp);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        
      }
  })
}

updateServicePurchased(id:number, value:boolean){


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
      this.service.putServicePurchasedByUser(this.user.username,id,value)
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
