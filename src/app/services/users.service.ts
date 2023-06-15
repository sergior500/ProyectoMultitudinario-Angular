import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { Users } from '../interfaces/users.inteface';
import { CartService } from './carrito.service';
import { Consejo } from '../interfaces/consejos.interface';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
  })
  export class UsersService {
    
    constructor(private http:HttpClient, private cart:CartService, private route:Router) { 

    }

    // https://proyectomultitudinarioapi-production.up.railway.app/products
    // http://localhost:8080
    private url:string = 'https://proyectomultitudinarioapi-production.up.railway.app'

    httpOptions={
        headers: new HttpHeaders({'Content-Type':'application/json'})
      }
     
      admin=false;
      loggedIn = false;
    
    
       isAuthenticated() {
         return localStorage.getItem('loggin')==='true'
       }
    
       /**
        * Peticiones del crud de usuario
        */
    user(query:string):Observable<User>{
      return this.http.get<User>(`${this.url}/users/${query}`)
    }

    deleteUser(id:string):Observable<any>{
      return this.http.delete<any>(`${this.url}/users/${id}`)
    }

    addUser(user:any):Observable<any>{
      return this.http.post<any>(`${this.url}/users`,user,this.httpOptions)
    }

    userList():Observable<Users>{
        return this.http.get<Users>(`${this.url}/users?pageNumber=1&pageSize=9999`)
  }

    getConsejo(imc:number):Observable<Consejo>{
      return this.http.get<Consejo>(`${this.url}/consejos?valor=${imc}`)
    }

  updateUser(username:string, user:any):Observable<any>{
    
      return this.http.put<any>(`${this.url}/users/${username}`,user,this.httpOptions)
  }

      login(user:string,password:string): Observable<boolean> {
        return this.http.post<any>(`${this.url}/signin`,{'username':user,'password':password}, this.httpOptions)
        .pipe(switchMap(resp=>{
          
            localStorage.setItem('token', resp.token);
            localStorage.setItem('loggin',"true");
            return of(true);
    
          }),catchError(error=>{
            
            localStorage.setItem('loggin',"false");
            localStorage.removeItem("token");
            return of(false);
          }))
    
       
        
      }
      

      register(user:string, password:string, email:string, firstName:string){

        return this.http.post<any>(`${this.url}/signup`,{'username':user, 'password':password,'first_name':firstName, 'email':email, 'altura':0.0, 'peso':0.0,'imc':0.0 },this.httpOptions)
      }

      onlogout(){
        this.cart.clearCart();
        localStorage.setItem('loggin','false');
        localStorage.removeItem("token");
        localStorage.setItem('cart',"")
        
        window.location.reload();
      }
    }