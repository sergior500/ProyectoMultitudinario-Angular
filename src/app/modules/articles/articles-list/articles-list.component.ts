import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ArticleService } from '../article-Services/article.service';
import { Article, Content } from '../../../interfaces/article.interface';
import { Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table'

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

  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  // obs!: Observable<any>;
  // dataSource!: MatTableDataSource<Article>;

  constructor(private articleService: ArticleService/*, private changeDetectorRef: ChangeDetectorRef*/) { }



  ngOnInit(): void {
    this.articleList();
    

    // console.log(this.obs)
    console.log(this.articles)
    
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

    this.articleService.articleList(this.p,5)
      .subscribe({
        next:(resp)=>{
          this.articles = resp.content;
          this.total = resp.totalPages;
          this.error = false;
          console.log(resp.content)
          console.log(this.articles)
        }
    })
  }

}
