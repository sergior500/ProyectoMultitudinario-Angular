import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from 'src/app/interfaces/article.interface';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http:HttpClient) { 

  }
  
  private url:string = 'http://localhost:8086/products'

  article(query:string):Observable<Article>{
    return this.http.get<Article>(`${this.url}${query}`)
  }

  articleList():Observable<Article[]>{
    return this.http.get<Article[]>(`${this.url}`)
  }

}
