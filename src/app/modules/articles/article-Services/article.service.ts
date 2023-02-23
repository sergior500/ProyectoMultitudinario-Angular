import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from 'src/app/interfaces/article.interface';
import { Content } from '../../../interfaces/article.interface';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http:HttpClient) { 

  }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  private url:string = 'http://localhost:8086/products'

  article(query:number):Observable<Content>{
    return this.http.get<Content>(`${this.url}/${query}`)
  }

  articleList():Observable<Article>{
    return this.http.get<Article>(`${this.url}?pageNumber=1&pageSize=9999`)
  }

  saveArticle(article:any):Observable<any>{
    return this.http.post<any>(`${this.url}`,article,this.httpOptions)
  }

  updateArticle(article:any, id:number):Observable<any>{
    return this.http.put<any>(`${this.url}/${id}`,article,this.httpOptions)
  }

  deleteArticle(id:number):Observable<any>{
    return this.http.delete<any>(`${this.url}/${id}`)
  }

}
