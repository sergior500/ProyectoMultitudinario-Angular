import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ArticleService } from '../article-Services/article.service';
import { Article, Content } from '../../../interfaces/article.interface';
import { Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table'
import { token } from '../../../interfaces/token.inteface';
import jwtDecode from 'jwt-decode';
import Swal from 'sweetalert2';
import { productos } from '../../../interfaces/product.interface';
import { CartService } from '../../../services/carrito.service';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.css']
})
export class ArticlesListComponent implements OnInit {

  articles:Content[] = [];
  error:boolean = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  obs!: Observable<any>;
  dataSource!: MatTableDataSource<Content>;

  constructor(private articleService: ArticleService, private changeDetectorRef: ChangeDetectorRef, private cartservice: CartService) { }

  token !:token;
  user : string = "";
  admin : string = "";

  product : productos = {
    id: 0,
    quantity : 0
  };

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
  

  addToCart(id:number, quantity:number ){
    this.product.id = id;
    
    this.cartservice.addToCart(this.product,quantity);

    Swal.fire(
      'Good job!',
      'Your item has been added!',
      'success'
    )

  }

  articleList(){
    this.articleService.articleList()
      .subscribe({
        next: (resp) => {
          this.dataSource = new MatTableDataSource<Content>(resp.content)
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
        this.articleService.deleteArticle(id)
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