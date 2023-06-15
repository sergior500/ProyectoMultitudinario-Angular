import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Orders } from 'src/app/interfaces/orders.inteface';
import { ArticleService } from '../article-Services/article.service';
import { token } from 'src/app/interfaces/token.inteface';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  constructor(private articleService : ArticleService) { }

  displayedColumns = ['id', 'name','quantity', 'date'];
  dataSource!: MatTableDataSource<Orders[]>;

  @Input()
  filterValue : string = "";
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  token !:token;

  ngOnInit(): void {

    this.token = jwtDecode(localStorage.getItem('token')!)
    this.orderList()

  }

  applyFilter() {
    this.filterValue = this.filterValue.trimStart();
    this.filterValue = this.filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = this.filterValue;
  }

  orderList(){

    this.articleService.getUserOrders(this.token.sub)
      .subscribe({
        next:(resp)=>{
          
          this.dataSource = new MatTableDataSource(resp);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          console.log(resp)
          
        }
    })
  }

}
