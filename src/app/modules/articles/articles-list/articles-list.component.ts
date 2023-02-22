import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ArticleService } from '../article-Services/article.service';
import { Article, Content } from '../../../interfaces/article.interface';
import { Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table'
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.css']
})
export class ArticlesListComponent implements OnInit {

  articles: Content[] = [];
  p:number = 1;
  total:number = 0;
  error:boolean = true;

  cossas:boolean = false;


  displayedColumns = ['id', 'name', 'price', 'stock', 'description','category','button'];
  dataSource!: MatTableDataSource<Content>;

  @Input()
  filterValue : string = "";
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  // obs!: Observable<any>;
  // dataSource!: MatTableDataSource<Article>;

  constructor(private articleService: ArticleService/*, private changeDetectorRef: ChangeDetectorRef*/) {

   }



  ngOnInit(): void {
    this.articleList();
    
    if(!this.cossas){
      this.displayedColumns = ['id', 'name', 'price', 'stock', 'description','category']
    }
    // console.log(this.obs)
    // console.log(this.articles)
    
  }


  applyFilter() {
    this.filterValue = this.filterValue.trimStart();
    this.filterValue = this.filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = this.filterValue;
  }

  pageChangeEvent(event: number){

    this.p = event;
    
    console.log(event)

    this.articleList();

}
  // ngOnDestroy() {
  //   if (this.dataSource) { 
  //     this.dataSource.disconnect(); 
  //   }
  // }
  
  articleList(){
    // this.articleService.articleList()
    //   .subscribe({
    //     next: (resp) => {
    //       this.dataSource = new MatTableDataSource<Article>(resp)
    //       this.changeDetectorRef.detectChanges();

    //       this.dataSource.paginator = this.paginator;
    //       this.obs = this.dataSource.connect();
    //       this.error = false;
    //       console.log(resp)
          
    //     }
    //   })
    //   console.log(this.articles)

    this.articleService.articleList(this.p,100)
      .subscribe({
        next:(resp)=>{
          this.dataSource = new MatTableDataSource(resp.content);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          console.log(this.dataSource)
          // this.articles = resp.content;
          // this.total = resp.totalPages;
          // this.error = false;
          // console.log(resp.content)
          // console.log(this.articles)
        }
    })
  }

}
