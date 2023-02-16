import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article-Services/article.service';
import { Article } from '../../../interfaces/article.interface';


@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.css']
})
export class ArticlesListComponent implements OnInit {


  constructor(private articleService: ArticleService) { }

  articles:Article[] = [];
  error:boolean = true;

  ngOnInit(): void {
    this.articleList();
  }

  articleList(){
    this.articleService.articleList()
      .subscribe({
        next: (resp) => {
          this.articles = resp
          this.error = false;
        }
      })
  }

}
