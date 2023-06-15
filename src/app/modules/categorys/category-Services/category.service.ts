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
  // https://proyectomultitudinarioapi-production.up.railway.app/products
  // http://localhost:8080/category
  private url:string = 'https://proyectomultitudinarioapi-production.up.railway.app/category'


    /**
   * Peticion para recoger una categoria en concreto
   */
  category(query:number):Observable<Category>{
    return this.http.get<Category>(`${this.url}/${query}`)
  }

    /**
   * Peticion que nos devuelve una lista de categorias
   */
  categoryList():Observable<CategoryPaginate>{
    return this.http.get<CategoryPaginate>(`${this.url}?pageNumber=1&pageSize=9999`)
  }

    /**
   * Peticion que nos permite guardar una categoria
   */
  saveCategory(category:any):Observable<any>{
    return this.http.post<any>(`${this.url}`,category,this.httpOptions)
  }

    /**
   * Peticion que nos permite actualizar una categoria
   */
  updateCategory(category:any, id:number):Observable<any>{
    return this.http.put<any>(`${this.url}/${id}`,category,this.httpOptions)
  }

   /**
   * Peticion que nos permite eliminar una categoria
   */
  deleteCategory(id:number):Observable<any>{
    return this.http.delete<any>(`${this.url}/${id}`)
  }

}
