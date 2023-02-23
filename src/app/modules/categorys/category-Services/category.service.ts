import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from 'src/app/interfaces/article.interface';
import { Content } from '../../../interfaces/article.interface';
import { Category } from '../../../interfaces/category.interface';
import { CategoryPaginate } from '../../../interfaces/categoryPaginate.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { 

  }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  private url:string = 'http://localhost:8086/category'

  category(query:number):Observable<Category>{
    return this.http.get<Category>(`${this.url}/${query}`)
  }

  categoryList():Observable<CategoryPaginate>{
    return this.http.get<CategoryPaginate>(`${this.url}?pageNumber=1&pageSize=9999`)
  }

  saveCategory(category:any):Observable<any>{
    return this.http.post<any>(`${this.url}`,category,this.httpOptions)
  }

  updateCategory(category:any, id:number):Observable<any>{
    return this.http.put<any>(`${this.url}/${id}`,category,this.httpOptions)
  }

  deleteCategory(id:number):Observable<any>{
    return this.http.delete<any>(`${this.url}/${id}`)
  }

}
