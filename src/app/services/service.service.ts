import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from '../interfaces/service.interface';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient) { 

  }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  // https://proyectomultitudinarioapi-production.up.railway.app/products
  private url:string = 'http://localhost:8080/service';

 

  /**
   * Peticion para recoger un articulo en concreto
   */
  article(query:number):Observable<Service>{
    return this.http.get<Service>(`${this.url}/${query}`)
  }

  /**
   * Peticion que nos devuelve una lista de articulos
   */
  serviceList():Observable<Service[]>{
    console.log(this.url)
    return this.http.get<Service[]>(`${this.url}s`)
    
  }

  saveService(service:Service):Observable<any>{
    return this.http.post<Service>(`${this.url}`,service,this.httpOptions)
  }
  /**
   * Peticion que nos permite guardar un articulo y su imagen
   */
//   saveArticle(article:any, image:File):Observable<any>{
//     const datos:FormData = new FormData();
//     datos.append('producto',new Blob([JSON.stringify(article)],{type:'application/json'}))
//     datos.append('file', image, image.name);
//     return this.http.post<any>(`${this.url}`,datos)
//   }

  /** 
  * Peticion que nos permita actualizar un articulo
  */
  updateService(service:Service, id:number):Observable<any>{
    return this.http.put<any>(`${this.url}/${id}`,service,this.httpOptions)
  }

    /** 
  * Peticion que nos permite borrar un articulo
  */
  deleteService(id:number):Observable<any>{
    return this.http.delete<any>(`${this.url}/${id}`)
  }

  contratarService(id:number,username:string):Observable<any>{
    return this.http.post<any>(`${this.url}/buy/${username}/${id}`,this.httpOptions)
  }

  getServiceSubscription(id:number):Observable<any>{
    return this.http.get<any>(`${this.url}s/${id}`)
  }
}
