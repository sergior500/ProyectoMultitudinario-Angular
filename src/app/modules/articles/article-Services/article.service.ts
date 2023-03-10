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
  
  private url:string = 'https://proyectomultitudinarioapi-production.up.railway.app/products'

  /**
   * Peticion para recoger un articulo en concreto
   */
  article(query:number):Observable<Content>{
    return this.http.get<Content>(`${this.url}/${query}`)
  }

  /**
   * Peticion que nos devuelve una lista de articulos
   */
  articleList():Observable<Article>{
    return this.http.get<Article>(`${this.url}?pageNumber=1&pageSize=9999`)
  }

  /**
   * Peticion que nos permite guardar un articulo y su imagen
   */
  saveArticle(article:any, image:File):Observable<any>{
    const datos:FormData = new FormData();
    datos.append('producto',new Blob([JSON.stringify(article)],{type:'application/json'}))
    datos.append('file', image, image.name);
    return this.http.post<any>(`${this.url}`,datos)
  }

  /** 
  * Peticion que nos permita actualizar un articulo
  */
  updateArticle(article:any, id:number):Observable<any>{
    return this.http.put<any>(`${this.url}/${id}`,article,this.httpOptions)
  }

    /** 
  * Peticion que nos permite borrar un articulo
  */
  deleteArticle(id:number):Observable<any>{
    return this.http.delete<any>(`${this.url}/${id}`)
  }

}
